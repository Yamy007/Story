from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from logingAPI.models import *
from backend.models import *
from .serializer import *
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from string import punctuation
import re
from django.core.paginator import Paginator
from django.utils.datastructures import MultiValueDictKeyError
from django.db.models import Q
#from profanity_filter import ProfanityFilter


class GetUserProfilesView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        isPremium = request.GET.get('premium', None)
        
        if not isPremium:
            users = UserProfile.objects.all()
        if isPremium == "True":
            users = UserProfile.objects.filter(is_premium = True)
        if isPremium == "False":
            users = UserProfile.objects.filter(is_premium = False)
        
            
        if users: 
            users = UserProfileSerializer(users, many=True)
            return JsonResponse(users.data, safe=False)
        else:
            return JsonResponse({'error':'none found'})
   
    
@method_decorator(csrf_protect, name='dispatch')   
class UpdateUserProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    
    def post(self, request, format=None):
        # pf = ProfanityFilter()
        # pf.censor_whole_words = False
        # pf.censor_char = '*'
        data = self.request.data
        user_id = self.request.user.id
        try:
            thumbnail = request.FILES['image']
            update_user_picture = UserProfile.objects.get(user__id = user_id)
            update_user_picture.image = thumbnail
            update_user_picture.save()
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile photo'})
        
        try:
            first_name = data['first_name']
            if any(symbol in first_name for symbol in set(punctuation)) or " " in first_name:
                return JsonResponse({'error':'special symbols are not allowed in first_name'})
            # if pf.is_profane(first_name):
            #     return JsonResponse({'error':'bad words are not allowed'})
            modify = UserProfile.objects.get(user__id = user_id)
            modify.first_name = first_name.capitalize()
            modify.save()
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile first_name'})
            
            
        try:
            last_name = data['last_name']
            if any(symbol in last_name for symbol in set(punctuation)) or " " in last_name:
                return JsonResponse({'error':'special symbols are not allowed in last_name'})
            # if pf.is_profane(last_name):
            #     return JsonResponse({'error':'bad words are not allowed'})
            modify = UserProfile.objects.get(user__id = user_id)
            modify.last_name = last_name.capitalize()
            modify.save()
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile last_name'})
            
            
        try:
            email = data['email']
            regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
            if re.fullmatch(regex, email):
                modify = UserProfile.objects.get(user__id = user_id)
                modify.email = email
                modify.save()
            else:
                return JsonResponse({'error': 'invalid email'})
            
            if User.objects.filter(email = email).exists():
                return JsonResponse({'error': 'email is already in use'})
            else:
                modify = UserProfile.objects.get(user__id = user_id)
                modify.email = email
                modify.save()
                
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile email'})
            
            
        try:
            phone = data['phone']
            clean_phone = re.sub("[-/()!?]","",phone)
            if clean_phone[1:].isnumeric():
                modify = UserProfile.objects.get(user__id = user_id)
                modify.phone = clean_phone
                modify.save()
            else:
                return JsonResponse({'error':'phone number is incorrect'})
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile phone'})
            
            
        try:
            address = data['city']
            # if pf.is_profane(address):
            #     return JsonResponse({'error':'bad words are not allowed'})
            modify = UserProfile.objects.get(user__id = user_id)
            modify.address = address.capitalize()
            modify.save()
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile city'})
            
            
        try:
            bio = data['bio']
            modify = UserProfile.objects.get(user__id = user_id)
            # modify.bio = pf.censor(bio)
            modify.bio = bio
            modify.save()
        except (MultiValueDictKeyError, KeyError):
            pass
        except:
            return JsonResponse({'error': 'didnt update the profile bio'})
            
        return JsonResponse({'success': 'user profile successfully updated'})     
            
@method_decorator(csrf_protect, name='dispatch')   
class GetUserProfilePage(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user = self.request.user.id
        
        liked_stories = Story.objects.filter(liked_by__id = user).count()
        comments_made = Comments.objects.filter(creator = user).count()
        stories_made = Story.objects.filter(creator_id = user).count()
        user_profile = UserProfile.objects.get(user__id = user)
        response = UserProfileSerializer(user_profile)
        
        jsonresponse = {
            "user_data": response.data,
            "liked_stories": liked_stories,
            "number_of_comments_made_by_user": comments_made,
            "number_of_stories_made_by_user": stories_made,
        }
        return JsonResponse(jsonresponse)
    

class GetUserLikedPosts(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user
        related_page_number = request.GET.get('page', 1)
        
        liked_posts = Story.objects.filter(liked_by__id = user.id).order_by('-views').distinct()
        paginated = Paginator(liked_posts, per_page=10)
        page_obj = paginated.get_page(related_page_number)
        response = {
            "liked_stories_page": {
                "story_page_count": paginated.num_pages,
                "story_current": page_obj.number,
                "story_has_next_page": page_obj.has_next(),
                "story_has_previous_page": page_obj.has_previous(),
            },
            "liked_stories_data":[post.serialize_profile() for post in liked_posts]
                
        }
        return JsonResponse(response)
      
class GetUser_MadeComments(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        
        comments = Comments.objects.filter(creator = user)
        response = {
            'comments':[comment.serialize_profile() for comment in comments]
        }
        return JsonResponse(response)
    
class CreateUserStory(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        # pf = ProfanityFilter()
        # pf.censor_whole_words = False
        # pf.censor_char = '*'
        user = self.request.user.id
        data = self.request.data

        try:
            story_title = data['title']
        except:
            return JsonResponse({'response':'story has to have title'})
        
        try:
            story_body = data['body']
        except:
            return JsonResponse({'response':'story has to have body'})
        
        try:
            story_genres_ids = data['genres']
            clean_genres = story_genres_ids.split(",")
            clean_genres_data = [int(item) for item in clean_genres if item != '']
        except:
            return JsonResponse({'response':'story has to have atleast one genre'})
        
        # story_title = pf.censor(story_title)
        # story_body = pf.censor(story_body)
        # story_genres_ids = story_genres_ids.split(',')
        
        #creating story
        user_story = Story(creator_id = user, title = story_title, story_body = story_body)
        user_story.save()
        get_genres = Genre.objects.filter(pk__in = clean_genres_data)
        for genre in get_genres:
            user_story.genres.add(genre.id)
            user_story.save()
        
        return JsonResponse({'response':'story successfully created'})
        
class GetUser_MadeStories(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        
        user_stories = Story.objects.filter(creator_id = user)
        response = [story.serialize_profile() for story in user_stories]
        return JsonResponse(response, safe=False)

class LikeUnlikeStory(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user = self.request.user.id
        
        story_id = request.GET.get('story', None)
        
        
        if story_id:
            story = Story.objects.get(pk = story_id)
            if story.creator_id == user:
                return JsonResponse({'response':'cant like your own story'})
            if Story.objects.filter(pk = story_id, liked_by = user).exists():
                story.liked_by.remove(user)
            else:
                story.liked_by.add(user)
            
            return JsonResponse({'response':'like func success'})
        else:
            return JsonResponse({'response':'wrong input (missing "story" key in URL)'})
        
class CommentStoryOrReplyToComment(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user = self.request.user.id
        data = request.data
        try:
            story_id = data['story']
        except:
            return JsonResponse({'response':'wrong input (missing "story" key in body)'})
        
        try:
            comment_body = data['comment']
        except:
            return JsonResponse({'response':'wrong input (missing "comment" key in body)'})
        
        try:
            reply = data['reply']
        except:
            reply = None
        
        

        if story_id:
            story = Story.objects.get(pk = story_id)
            if reply:
                if Comments.objects.filter(~Q(replied_to = 0), creator = user).count() == 5:
                    return JsonResponse({'response':'comment wasnt added, only 5 replies per post available'})
                else:
                    create_comment = Comments(creator = user, comment_body=comment_body, replied_to = reply)
            else:
                if Story.objects.filter(pk = story_id, comments__creator = user).count() == 5:
                    return JsonResponse({'response':'comment wasnt added, only 5 comments per post available'})
                else:
                    create_comment = Comments(creator = user, comment_body=comment_body)
                
            create_comment.save()
            story.comments.add(create_comment)
            story.save()
            return JsonResponse({'response':'commented succesfully'})
        else:
            return JsonResponse({'response':'wrong input (missing "story" key in URL)'})
                
        
       
        
       
    
class LikeUnlikeComment(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user = self.request.user.id
        comment = request.GET.get('comment', None)
        
        if comment:
            liked_comment = Comments.objects.get(pk = comment)
            if liked_comment.creator == user:
                return JsonResponse({'response':'cant like your own comment'})
            if Comments.objects.filter(pk = comment, liked_by=user).exists():
                liked_comment.liked_by.remove(user)
            else:
                liked_comment.liked_by.add(user)
            return JsonResponse({'response':'like comment func success'})
        else:
            return JsonResponse({'response':'wrong input (missing "comment" key in URL)'})