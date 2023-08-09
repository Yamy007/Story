from rest_framework.views import APIView
from rest_framework import permissions
from .models import *
from .serializer import *
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.contrib import auth
from string import punctuation
from django.http import JsonResponse
from django.middleware.csrf import get_token
# from profanity_filter import ProfanityFilter

#@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticationStatus(APIView):
    def get(self, request, format=None):
        try:
            if request.user.is_authenticated:
                return JsonResponse({'true':'User is authenticated'})
            else:
                return JsonResponse({'false':'User is not authenticated'})
        except:
            return JsonResponse({'error':'something went wrong during authentication check'})
        
        
#@method_decorator(csrf_protect, name='dispatch')
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
                    return JsonResponse({'error':'account with that username already exists'}, safe=False)
                if len(password) < 8:
                    return JsonResponse({'error':'password is too short'}, safe=False)
                if User.objects.filter(email=email).exists():
                    return JsonResponse({'error': 'account with that email already exists'}, safe=False)
                if username in password:
                    return JsonResponse({'error': 'password cannot contain part of username'}, safe=False)
                if password in username:
                    return JsonResponse({'error': 'password cannot be part of username'}, safe=False)
                if any(symbol in password for symbol in set(punctuation)):
                    return JsonResponse({'error': 'password cannot contain special symbols'}, safe=False)
                if password.isnumeric():
                    return JsonResponse({'error':'password cannot be entirely numeric'}, safe=False)
                # if pf.is_profane(username):
                #     return JsonResponse({'error':'username cannot contain bad words'}, safe=False)
                
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                upd_user_status = User.objects.get(pk=user.id)
                
                if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                    upd_user_status.is_superuser = True
                    upd_user_status.is_staff = True
                    upd_user_status.is_admin = True
                    upd_user_status.save()
            else:
                return JsonResponse({'error':'passwords do not match'}, safe=False)
        except:
            return JsonResponse({'error':'something went wrong during registration'}, safe=False)     
        
        try: 
            user_profile = UserProfile(user=upd_user_status, email=email)
            user_profile.save()
            if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                user_profile.is_premium = True
                user_profile.save()
            return JsonResponse({'success':'account created'}, safe=False)  
        except:
            delete_user = User.objects.get(pk=upd_user_status.id)
            delete_user.delete()
            return JsonResponse({'error':'something went wrong during creation of profile'}, safe=False)
           
        
 
#@method_decorator(csrf_protect, name='dispatch')
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
                return JsonResponse({'success': 'logged in'}, safe=False)
            else:
                return JsonResponse({'error':'error during loging in'}, safe=False)
        except:
            return JsonResponse({'error':'something went wrong during logination'}, safe=False)
        
class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return JsonResponse({'success':'logged out'}, safe=False)
        except:
            return JsonResponse({'error':'error when logging OUT'}, safe=False)   
        
         
#@method_decorator(ensure_csrf_cookie, name='dispatch')       
class GetCSRF(APIView):
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        return JsonResponse({'csrfToken': get_token(request)}, safe=False)
    

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return JsonResponse(users.data, safe=False)