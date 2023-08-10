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
#from profanity_filter import ProfanityFilter


class GetUserProfilesView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        isPremium = request.GET.get('premium', 2)
        try:
            users = None
            isPremium = int(isPremium)
        except:
            return JsonResponse({'error':'wrong premium input value'})
        
        if isPremium == 2:
            users = UserProfile.objects.all()
        if isPremium == 1:
            users = UserProfile.objects.filter(is_premium = True)
        if isPremium == 0:
            users = UserProfile.objects.filter(is_premium = False)
        
            
        if users: 
            users = UserProfileSerializer(users, many=True)
            return JsonResponse(users.data, safe=False)
        else:
            return JsonResponse({'error':'premium takes only 1,2,0 as parameters'})
   
    
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
        user_profile = UserProfile.objects.get(user__id = user)
        response = UserProfileSerializer(user_profile)
        
        jsonresponse = {
            "user_data": response.data,
            "liked_stories": liked_stories,
            "number_of_comments_made_by_user": comments_made,
        }
        return JsonResponse(jsonresponse, safe=False)
    

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
        return JsonResponse(response, safe=False)
    
class CreateUserComment(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user= self.request.user.id
        data = self.request.data
        try:
            comment_body = data['body']
        except:
            return JsonResponse({'response':'wrong input (missing "body" key)'})
        
        try:
            story = data['story']
        except:
            return JsonResponse({'response':'wrong input (missing "story" key)'})
        
        create_comment = Comments(creator = user, comment_body=comment_body)
        create_comment.save()
        
        story = Story.objects.get(pk=story)
        story.comments.add(create_comment)
        create_comment.save()
        
        return JsonResponse({'response':'comment successfully added'})
                                
        
        
class GetUser_MadeComments(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        
        comments = Comments.objects.filter(creator = user)

        response = {
            'comments':[comment.serialize_profile() for comment in comments]
        }
        return JsonResponse(response, safe=False)
    
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
        except:
            return JsonResponse({'response':'story has to have atleast one genre'})
        
        # story_title = pf.censor(story_title)
        # story_body = pf.censor(story_body)
        # story_genres_ids = story_genres_ids.split(',')
        
        #creating story
        user_story = Story(creator_id = user, title = story_title, story_body = story_body)
        user_story.save()
        get_genres = Genre.objects.filter(pk__in = map(int, clean_genres))
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