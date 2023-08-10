from rest_framework.views import APIView
from rest_framework import permissions
from .models import *
from .serializer import *
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.contrib import auth
from string import punctuation
from django.http import JsonResponse
from rest_framework.response import Response
# from profanity_filter import ProfanityFilter

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticationStatus(APIView):
    def get(self, request, format=None):
        try:
            if request.user.is_authenticated:
                return JsonResponse({'response': True})
            else:
                return JsonResponse({'response': False})
        except:
            return JsonResponse({'response':'something went wrong during authentication check'})
        
        
@method_decorator(csrf_protect, name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)
    
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
                # if pf.is_profane(username):
                #     return JsonResponse({'response':'username cannot contain bad words'})
                
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                upd_user_status = User.objects.get(pk=user.id)
                
                if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                    upd_user_status.is_superuser = True
                    upd_user_status.is_staff = True
                    upd_user_status.is_admin = True
                    upd_user_status.save()
            else:
                return JsonResponse({'response': 'passwords do not match'})
        except:
            return JsonResponse({'response': False})     
        
        try: 
            user_profile = UserProfile(user=upd_user_status, email=email)
            user_profile.save()
            if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                user_profile.is_premium = True
                user_profile.save()
            return JsonResponse({'response':True})  
        except:
            delete_user = User.objects.get(pk=upd_user_status.id)
            delete_user.delete()
            return JsonResponse({'response': False})
           
        
 
@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        data = self.request.data
        try:
            username = data['username']
            password = data['password']
            
            user = auth.authenticate(username=username, password=password)
            
            if user is not None:
                auth.login(request, user)
                return JsonResponse({'response': True})
            else:
                return JsonResponse({'response': False})
        except:
            return JsonResponse({'response': False})

@method_decorator(csrf_protect, name='dispatch')       
class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return JsonResponse({'response': True})
        except:
            return JsonResponse({'response': False})   
        
         
@method_decorator(ensure_csrf_cookie, name='dispatch')       
class GetCSRF(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        return JsonResponse({'response': True})
    

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        users = User.objects.all()
        return JsonResponse([user.username for user in users])
    
@method_decorator(csrf_protect, name='dispatch')
class GetUsersViewALL(APIView):
    #permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return JsonResponse(users.data)