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
    
    def get(self, request, format=None):
        user = self.request.user
        
        liked_stories = Story.objects.filter(liked_by__id = user.id).count()
        user_profile = UserProfile.objects.get(user__id = user.id)
        response = UserProfileSerializer(user_profile)
        
        jsonresponse = {
            "user_data": response.data,
            "liked_stories": liked_stories,
        }
        return JsonResponse(jsonresponse, safe=False)
    

class GetUserLikedPosts(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user = self.request.user
        related_page_number = request.GET.get('liked_page', 1)
        
        liked_posts = Story.objects.filter(liked_by__id = user.id).order_by('-views').distinct()
        paginated = Paginator(liked_posts, per_page=10)
        page_obj = paginated.get_page(related_page_number)
        response = {
            "story_page": {
                "story_page_count": paginated.num_pages,
                "story_current": page_obj.number,
                "story_has_next_page": page_obj.has_next(),
                "story_has_previous_page": page_obj.has_previous(),
            },
            "liked_stories_data":{
                "id": [id.id for id in liked_posts]
            }
        }
        return JsonResponse(response, safe=False)