from rest_framework.views import APIView
from rest_framework import permissions
from logingAPI.models import *
from backend.models import *
from .serializer import *
from django.http import JsonResponse
from string import punctuation
import re
from django.core.paginator import Paginator
from django.utils.datastructures import MultiValueDictKeyError
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
#from profanity_filter import ProfanityFilter
from rest_framework.authentication import TokenAuthentication
import os

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
   
    
class UpdateUserProfile(APIView):
    authentication_classes = [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    
    #@method_decorator(csrf_protect) 
    def post(self, request, format=None):
        # pf = ProfanityFilter()
        # pf.censor_whole_words = False
        # pf.censor_char = '*'
        data = self.request.data
        user_id = self.request.user.id
        try:
            get_user = UserProfile.objects.get(user__id = user_id)
        except:
            return JsonResponse({'response':'error getting user Profile - bug'})
        
        if get_user is not None:
            try:
                thumbnail = request.FILES['image']
                
                if get_user.image:
                    try:
                        os.remove(get_user.image.path)
                    except:
                        pass
                    get_user.image = thumbnail
                    get_user.save()
                else:
                    get_user.image = thumbnail
                    get_user.save()
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
                get_user.first_name = first_name.capitalize()
                get_user.save()
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
                get_user.last_name = last_name.capitalize()
                get_user.save()
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'error': 'didnt update the profile last_name'})
                
                
            try:
                email = data['email']
                regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
                if re.fullmatch(regex, email):
                    if User.objects.filter(~Q(pk = get_user.id ),email = email).exists():
                        return JsonResponse({'error': 'email is already in use'}) 
                    else:
                        get_user.email = email
                        get_user.save()
                else:
                    return JsonResponse({'error': 'invalid email'})
                    
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'error': 'didnt update the profile email'})
                
                
            try:
                phone = data['phone']
                clean_phone = re.sub("[-/()!?]","", phone)
                if clean_phone[1:].isnumeric():
                    get_user.phone = clean_phone
                    get_user.save()
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
                get_user.address = address.capitalize()
                get_user.save()
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'error': 'didnt update the profile city'})
                
                
            try:
                bio = data['bio']
                # get_user.bio = pf.censor(bio)
                get_user.bio = bio
                get_user.save()
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'error': 'didnt update the profile bio'})
        else:
            return JsonResponse({'response': False})
        
        return JsonResponse({'response':True})
        
            
            
 
class GetUserProfilePage(APIView):
    authentication_classes = [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    #@method_decorator(csrf_protect, name='dispatch')  
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
    authentication_classes = [ TokenAuthentication ]
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
                "number_of_liked_stories": paginated.count
            },
            "liked_stories_data":[post.serialize_profile() for post in page_obj.object_list]
                
        }
        return JsonResponse(response)
      
class GetUser_MadeComments(APIView):
    authentication_classes = [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        com_page = request.GET.get('page', 1)
        comments = Comments.objects.filter(creator = user)
        paginated = Paginator(comments, per_page=10)
        page_obj = paginated.get_page(com_page)
        response = {
            "comments_page": {
                "comments_count": paginated.num_pages,
                "comments_current": page_obj.number,
                "comments_has_next_page": page_obj.has_next(),
                "comments_has_previous_page": page_obj.has_previous(),
                "number_of_comments": paginated.count
            },
            'comments':[comment.serialize_profile() for comment in page_obj.object_list]
        }
        return JsonResponse(response)
    
class CreateOrUpdateUserStory(APIView):
    authentication_classes = [ TokenAuthentication ]
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
        
        try:
            to_update = data['update']
            story = Story.objects.get(pk = to_update)
            if story.creator_id == user:
                story.story_body = story_body
                get_genres = Genre.objects.filter(pk__in = clean_genres_data)
                for genre in get_genres:
                    story.genres.add(genre.id)
                    story.save()
                story.title = story_title + " (Edit)"
                story.save()
                return JsonResponse({'response':'sucessfully updated'})
            else:
                return JsonResponse({'response':'wrong request user'})
        except:
            pass
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
    authentication_classes = [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        story_page = request.GET.get('page', 1)
        user_stories = Story.objects.filter(creator_id = user)
        paginated = Paginator(user_stories, per_page=10)
        page_obj = paginated.get_page(story_page)
        response = {
            "stories_page": {
                "story_page_count": paginated.num_pages,
                "story_current": page_obj.number,
                "story_has_next_page": page_obj.has_next(),
                "story_has_previous_page": page_obj.has_previous(),
                "number_of_stories":paginated.count
            },
            "stories_data":[post.serialize_profile() for post in page_obj.object_list]
        }
        return JsonResponse(response)

class LikeUnlikeStory(APIView):
    authentication_classes = [ TokenAuthentication ]
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
                
            story.save()
            return JsonResponse({'response':'like func success'})
        else:
            return JsonResponse({'response':'wrong input (missing "story" key in URL)'})
        
class CommentStoryOrReplyToCommentOrEditComment(APIView):
    authentication_classes = [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user = self.request.user.id
        data = request.data
        try:
            edit = data['update']
        except:
            edit = None
            
        try:
            comment_body = data['comment']
        except:
            return JsonResponse({'response':'wrong input (missing "comment" key in body)'})   
        
        if edit:
            try:
                to_edit = Comments.objects.get(pk = edit)
            except ObjectDoesNotExist:
                response = f"comment with id={edit} doesnt exist"
                return JsonResponse({'response': response})
            except ValueError:
                response = f'value error (request URL: edit= {edit})'
                return JsonResponse({'response':response})
            except:
                return JsonResponse({'response':'unknown error'})
            
            if to_edit.creator != user:
                return JsonResponse({'response':'wrong request user'})
            to_edit.comment_body += "\n\n(Edit): " + comment_body
            to_edit.save()
            return JsonResponse({"response":"comment was successfully edited"})
        
        try:
            story_id = data['story']
        except:
            return JsonResponse({'response':'wrong input (missing "story" key in body)'})
        
        
        
        try:
            reply = data['reply']
        except:
            reply = None
        
        
            
        
        
        if story_id:
            try:
                story = Story.objects.get(pk = story_id)    
            except ObjectDoesNotExist:
                response = f"story with id={story_id} doesnt exist"
                return JsonResponse({'response': response})
            except ValueError:
                response = f'value error (request URL: story= {story_id})'
                return JsonResponse({'response':response})
            except:
                return JsonResponse({'response':'unknown error'})
            
            if reply:
                if len([comm for comm in story.comments.all() if comm.replied_to != 0 and comm.creator == user]) == 5:
                    return JsonResponse({'response':'comment wasnt added, only 5 replies per post available'})
                else:
                    create_comment = Comments(creator = user, comment_body=comment_body, replied_to = reply)
            else:
                if len([comm for comm in story.comments.all() if comm.replied_to == 0 and comm.creator == user]) == 5:
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
    authentication_classes = [ TokenAuthentication ]
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
            
            liked_comment.save()
            return JsonResponse({'response':'like comment func success'})
        else:
            return JsonResponse({'response':'wrong input (missing "comment" key in URL)'})
        
        
class GetDistinctUserNotificationMessages(APIView):
    authentication_classes = [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        user = self.request.user.id
        notification_page = request.GET.get('page', 1)
        get_profile = UserProfile.objects.get(user=user)
        user_stories = Story.objects.filter(creator_id = get_profile.user.id)
        user_comments = Comments.objects.filter(creator = get_profile.user.id)
        response = []

        for story in user_stories:
            st = {}
            st['story_id'] = story.id
            st['title'] = story.title
            st['new_comments'] = len([coo for coo in story.comments.all() if coo.read_by_user == False and coo.creator != user and coo.replied_to == 0])
            if st['new_comments'] > 0:
                response.append(st)
            
        for comment in user_comments:
            sto = Story.objects.get(comments__id = comment.id)
            cm = {}
            cm['comment_id'] = comment.id
            cm['origin_story'] = sto.title
            cm['new_replies'] = len([comm for comm in sto.comments.all() if comm.replied_to == comment.id and comm.creator != get_profile.user.id and comm.read_by_user == False])      
            if cm['new_replies'] > 0:
                response.append(cm)
        
        paginated = Paginator(response, per_page=5)
        page_obj = paginated.get_page(notification_page)
        
        final = {
            "notification_page":{
                "notification_page_count": paginated.num_pages,
                "notification_current": page_obj.number,
                "notification_has_next_page": page_obj.has_next(),
                "notification_has_previous_page": page_obj.has_previous(),
                "number_of_notifications":paginated.count
            },
            "notifications": page_obj.object_list
        }
        return JsonResponse(final, safe=False)
