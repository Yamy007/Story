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
from rest_framework.authentication import SessionAuthentication
import os
from better_profanity import profanity

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
            return JsonResponse({"response":True, "message":"profiles found", "data":users.data}, safe=False)
        else:
            return JsonResponse({"response":False, "message":"profiles not found"})
   
    
class UpdateUserProfile(APIView):
    authentication_classes = [ SessionAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    #@method_decorator(csrf_protect) 
    def post(self, request, format=None):
        errors = {}
        
        data = self.request.data
        user_id = self.request.user.id
        try:
            get_user = UserProfile.objects.get(user__id = user_id)
        except ValueError:
            return JsonResponse({'response':f"wrong id (id={user_id})"})
        
        if get_user is not None:
            try:
                thumbnail = request.FILES['image']
                if thumbnail.name.endswith(('.jpg', '.png', '.jpeg', '.gif')):
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
                else:
                    errors["image"] = "Wrong image data (only '.jpg', '.png', '.jpeg' '.gif' are allowed)"
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({"response":False,  "message": 'error when changing picture'})
            
            try:
                first_name = data['first_name']
                if profanity.contains_profanity(first_name):
                    errors["first_name"] = "First name cannon contain obscene expressions"
                else:
                    if "-" in first_name:
                        if any(symbol in word for word in first_name.split('-') for symbol in set(punctuation)):
                            errors["first_name"] = 'First name cannot contain special symbols'
                        else:
                            clean_data = "-".join(w.capitalize() for w in first_name.split('-'))
                            get_user.first_name = clean_data
                            get_user.save()
                    else:
                        if any(symbol in first_name for symbol in set(punctuation)):
                            errors["first_name"] = 'First name cannot contain special symbols'
                        else:
                            clean_data = " ".join(w.capitalize() for w in first_name.split())
                            get_user.first_name = clean_data
                            get_user.save()  
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({"response":False,  "message": 'error when changing first name'})
                
                
            try:
                last_name = data['last_name']
                if profanity.contains_profanity(last_name):
                    errors["last_name"] = "Last name cannon contain obscene expressions"
                else:
                    if "-" in last_name:
                        if any(symbol in word for word in last_name.split('-') for symbol in set(punctuation)):
                            errors["last_name"] = 'Last name cannot contain special symbols'
                        else:
                            clean_data = "-".join(w.capitalize() for w in last_name.split('-'))
                            get_user.last_name = clean_data
                            get_user.save()
                    else:
                        if any(symbol in last_name for symbol in set(punctuation)):
                            errors["last_name"] = 'Last name cannot contain special symbols'
                        else:
                            clean_data = " ".join(w.capitalize() for w in last_name.split())
                            get_user.last_name = clean_data
                            get_user.save()
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({"response":False,  "message": 'error when changing last name'})
                
                
            try:
                email = data['email']
                regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
                if re.fullmatch(regex, email):
                    if User.objects.filter(~Q(pk = get_user.id ), email = email).exists():
                        errors["email"] = "Email is already in use"
                    else:
                        get_user.email = email
                        get_user.save()
                else:
                    errors["email"] = "Invalid email syntax"
                    
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'response': False, "message":'error when changing email'})
                
                
            try:
                phone = data['phone']
                clean_phone = re.sub("[+-/()!?]","", phone)  
                if len(clean_phone) == 10:
                    if clean_phone.isnumeric():
                        get_user.phone = clean_phone
                        get_user.save()
                    else:
                        errors['phone'] = 'Only numbers are allowed in phone number'    
                         
                elif len(clean_phone) == 12:
                    if clean_phone.isnumeric():
                        get_user.phone = "+" + clean_phone
                        get_user.save()
                    else:
                        errors['phone'] = 'Only numbers are allowed in phone number'
                elif len(clean_phone) == 0:
                    get_user.phone = ""
                    get_user.save()
                else:
                    errors['phone'] = 'Invalid phone number'
                    
                
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'response': False, "message":'error when changing phone'})
                
                
            try:
                address = data['address']
                clean_data = " ".join(w.capitalize() for w in address.split())
                if profanity.contains_profanity(clean_data):
                    errors["address"] = "Address cannot contain obscene expressions"
                else:
                    get_user.address = clean_data
                    get_user.save()
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'response': False, "message":'error when changing address'})
                
                
            try:
                bio = data['bio']
                get_user.bio = profanity.censor(bio)
                get_user.save()
            except (MultiValueDictKeyError, KeyError):
                pass
            except:
                return JsonResponse({'response': False, "message":'error when changing bio'})
        else:
            return JsonResponse({'response': False, "message":"користувача не існує"})
        
        if errors:
            resp = "User profile updated successfully but with errors"
        else:
            resp = "User profile updated successfully"
        return JsonResponse({'response':True, "message":resp, "invalidated":errors, "data": UserProfileSerializer(get_user).data})
        
            
            
 
class GetUserProfilePage(APIView):
    authentication_classes = [ SessionAuthentication ]
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
            "response": True,
            "message":"отримано сторінку профілю користувача",
            "data": {
                "user":response.data,
                "liked_stories": liked_stories,
                "number_of_comments_made_by_user": comments_made,
                "number_of_stories_made_by_user": stories_made,
            }
        }
        return JsonResponse(jsonresponse)
    

class GetUserLikedPosts(APIView):
    authentication_classes = [ SessionAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user
        related_page_number = request.GET.get('page', 1)
        
        liked_posts = Story.objects.filter(liked_by__id = user.id).order_by('-views').distinct()
        paginated = Paginator(liked_posts, per_page=10)
        page_obj = paginated.get_page(related_page_number)
        if paginated.count == 0:
            resp = False
            message = "користувач не лайкнув жодної історії"
        else:
            resp = True
            message = "отримано лайкнуті користувачем історії"
        response = {
            "response": resp,
            "message": message,
            "page": {
                "number_of_pages": paginated.num_pages,
                "current": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "number_of_items": paginated.count
            },
            "data":[post.serialize_profile() for post in page_obj.object_list]
                
        }
        return JsonResponse(response)
      
class GetUser_MadeComments(APIView):
    authentication_classes = [ SessionAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        com_page = request.GET.get('page', 1)
        comments = Comments.objects.filter(creator = user).order_by('-datetime')
        paginated = Paginator(comments, per_page=10)
        page_obj = paginated.get_page(com_page)
        if paginated.count == 0:
            resp = False
            message = "користувач не залишив жодного коментаря"
        else:
            resp = True
            message = "отримано коментарі зроблені користувачем"
        response = {
            "response":resp,
            "message":message,
            "page": {
                "number_of_pages": paginated.num_pages,
                "current": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "number_of_items": paginated.count
            },
            'data':[comment.serialize_profile() for comment in page_obj.object_list]
        }
        return JsonResponse(response)
    
        
class GetUser_MadeStories(APIView):
    authentication_classes = [ SessionAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user.id
        story_page = request.GET.get('page', 1)
        user_stories = Story.objects.filter(creator_id = user)
        paginated = Paginator(user_stories, per_page=10)
        page_obj = paginated.get_page(story_page)
        if paginated.count == 0:
            resp = False
            message = "користувач не створив жодної історії"
        else:
            resp = True
            message = "отримано історії зроблені користувачем"
        response = {
            "response":resp,
            "message":message,
            "page": {
                "number_of_pages": paginated.num_pages,
                "current": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "number_of_items":paginated.count
            },
            "data":[post.serialize_profile() for post in page_obj.object_list]
        }
        return JsonResponse(response)
     
class GetDistinctUserNotificationMessages(APIView):
    authentication_classes = [ SessionAuthentication ]
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
        if paginated.count == 0:
            resp = False
            message = "у користувача немає жодного нового сповіщення"
        else:
            resp = True
            message = "отримано сповіщення користувача"
        final = {
            "response":resp,
            "message":message,
            "page":{
                "number_of_pages": paginated.num_pages,
                "current": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "number_of_items":paginated.count
            },
            "data": page_obj.object_list
        }
        return JsonResponse(final, safe=False)
