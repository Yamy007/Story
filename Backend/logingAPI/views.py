from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from .models import *
from .serializer import *
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.contrib import auth
from string import punctuation
from django.http import JsonResponse
from UserProfile.serializer import UserProfileSerializer
from backend.models import Story, Comments
from rest_framework.authentication import SessionAuthentication
from rest_framework.authtoken.models import Token
import re

# from profanity_filter import ProfanityFilter


class CheckAuthenticationStatus(APIView):
<<<<<<< HEAD
    authentication_classes= [ SessionAuthentication ]
    
    def post(self, request, format=None):
=======
    @method_decorator(csrf_protect, name='dispatch')
    def get(self, request, format=None):
>>>>>>> main
        try:
            if request.user.is_authenticated:
                return JsonResponse({'response': True})
            else:
                return JsonResponse({'response': False})
        except:
            return JsonResponse({'response':'something went wrong during authentication check'})
        
        

class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)
<<<<<<< HEAD
            
=======
    
>>>>>>> main
    @method_decorator(csrf_protect, name='dispatch')
    def post(self, request, format=None):
        # pf = ProfanityFilter()
        # pf.censor_whole_words = False
        # pf.censor_char = '*'
        data = self.request.data 
        email = data['email']
        username = data['username']
        password = data['password']
        re_password = data['re_password']
        try:
            superuser_secret_word = data['secret']
        except:
            superuser_secret_word = None
        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return JsonResponse({'response': 'account with that username already exists'})
                if len(password) < 8:
                    return JsonResponse({'response': 'password is too short'})
                if User.objects.filter(email=email).exists():
                    return JsonResponse({'response': 'account with that email already exists'})
                if username in password:
                    return JsonResponse({'response': 'password cannot contain part of username'})
                if password in username:
                    return JsonResponse({'response': 'password cannot be part of username'})
                if any(symbol in password for symbol in set(punctuation)):
                    return JsonResponse({'response': 'password cannot contain special symbols'})
                if password.isnumeric():
                    return JsonResponse({'response': 'password cannot be entirely numeric'})
                if any(symbol in username for symbol in set(punctuation)):
                    return JsonResponse({'response': 'username cannot contain special symbols'})
                # if pf.is_profane(username):
                #     return JsonResponse({'response':'username cannot contain bad words'})
                
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                token = Token.objects.create(user=user)
                upd_user_status = User.objects.get(pk=user.id)
                
                if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                    upd_user_status.is_superuser = True
                    upd_user_status.is_staff = True
                    upd_user_status.is_admin = True
                    upd_user_status.save()
            else:
                return JsonResponse({'response': 'passwords do not match'})
        except:
            return JsonResponse({'response': 'error during validation'})     
        
        try: 
            user_profile = UserProfile(user=upd_user_status, email=email, username = username)
            user_profile.save()
            if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                user_profile.is_premium = True
                user_profile.save()
            return JsonResponse({'response':'sucess'})  
        except:
            delete_user = User.objects.get(pk=upd_user_status.id)
            delete_user.delete()
            return JsonResponse({'response': 'error during profile creation'})
           
        
 

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    @method_decorator(csrf_protect, name='dispatch')
    def post(self, request, format=None):
        data = self.request.data
        login_credential = data['login']
        password = data['password']
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        if "@" in login_credential:
            if re.fullmatch(regex, login_credential):
                try:
                    user = User.objects.get(email=login_credential)
                except:
                    return JsonResponse({'response':'user does not exist'})
                user = auth.authenticate(username = user.username, password=password)
            else:
<<<<<<< HEAD
                return JsonResponse({'response':'invalid email provided'})
        else:
            user = auth.authenticate(username=login_credential, password=password)
        
        if user is not None:
            auth.login(request, user)
            get_profile = UserProfile.objects.get(user__id=user.id)
            user_stories = Story.objects.filter(creator_id = get_profile.user.id)
            notifications_by_comments = [comment for user_story in user_stories for comment in user_story.comments.all()  if comment.replied_to == 0 and comment.read_by_user == False and comment.creator != get_profile.user.id]
            user_comments = Comments.objects.filter(creator=get_profile.user.id)
            notifications_by_replies = Comments.objects.filter(replied_to__in = [user_comment.id for user_comment in user_comments if user_comment.id != get_profile.user.id]).count()
            token = Token.objects.get(user=user)
            user_data = {
                "SUCCESS":"LOGGED IN",
                "user": UserProfileSerializer(get_profile).data,
                "user_notifications": len(notifications_by_comments) + notifications_by_replies,
                "token": token.key,
            }
            return JsonResponse(user_data)
        else:
            return JsonResponse({'response': 'user not found'})
        
=======
                return JsonResponse({'response': 'user probably doesnt exist or wrong credentials'})
        except:
            return JsonResponse({'response': 'error during logination'})
>>>>>>> main


     
class LogoutView(APIView):
    authentication_classes= [ SessionAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    @method_decorator(csrf_protect, name='dispatch')  
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return JsonResponse({'response': True})
        except:
            return JsonResponse({'response': False})   
        
         
class CsrfTokenView(APIView):

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        users = User.objects.all()
        return JsonResponse([user.username for user in users], safe=False)
    

class GetUsersViewALL(APIView):
    #permission_classes = (permissions.IsAuthenticated,)
    
    @method_decorator(csrf_protect, name='dispatch')
    def get(self, request, format=None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return JsonResponse(users.data, safe=False)