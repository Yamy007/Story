from rest_framework.views import APIView
from rest_framework import permissions
from .models import *
from .serializer import *
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib import auth
from string import punctuation
from django.http import JsonResponse
<<<<<<< HEAD
from django.middleware.csrf import get_token
=======
from rest_framework.decorators import api_view
from django.contrib.auth import logout as auth_logout
>>>>>>> main
# from profanity_filter import ProfanityFilter

#@method_decorator(csrf_protect, name='dispatch')
@api_view(['GET'])
def getUserAuthStatus(request):
    try:
        if request.user.is_authenticated:
            return JsonResponse({'true':'User is authenticated'})
        else:
            return JsonResponse({'false':'User is not authenticated'})
    except:
        return JsonResponse({'error':'something went wrong during authentication check'})
        
@api_view(['POST'])
def Register(request):
    # pf = ProfanityFilter()
    # pf.censor_whole_words = False
    data = request.data 
    try:
        email = data['email']
        username = data['username']
        password = data['password']
        re_password = data['re_password']
<<<<<<< HEAD
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
                
=======
    except:
        return JsonResponse({'error':'wrong input data'})
    try:
        superuser_secret_word = data['secret']
    except:
        pass
    
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
            try:
>>>>>>> main
                if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                    upd_user_status.is_superuser = True
                    upd_user_status.is_staff = True
                    upd_user_status.is_admin = True
                    upd_user_status.save()
            except:
                pass
        
        else:
            return JsonResponse({'error':'passwords do not match'}, safe=False)
    except:
        return JsonResponse({'error':'something went wrong during registration'}, safe=False)     
    
    try: 
        user_profile = UserProfile(user=upd_user_status, email=email)
        user_profile.save()
        try:
            if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                user_profile.is_premium = True
                user_profile.save()
        except:
            pass
        return JsonResponse({'success':'account created'}, safe=False)  
    except:
        delete_user = User.objects.get(pk=upd_user_status.id)
        delete_user.delete()
        return JsonResponse({'error':'something went wrong during creation of profile'}, safe=False)
           
        
 
#@method_decorator(csrf_protect, name='dispatch')
@api_view(['POST'])
def Login(request):
    data = request.data
    try:
        username = data['username']
        password = data['password']
        
<<<<<<< HEAD
class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return JsonResponse({'success':'logged out'}, safe=False)
        except:
            return JsonResponse({'error':'error when logging OUT'}, safe=False)   
=======
        user = auth.authenticate(username=username, password=password)
>>>>>>> main
        
        if user is not None:
            auth.login(request, user)
            return JsonResponse({'success': 'logged in'}, safe=False)
        else:
            return JsonResponse({'error':'error during loging in'}, safe=False)
    except:
        return JsonResponse({'error':'something went wrong during logination'}, safe=False)
    
@api_view(['POST'])      
def Logout(request):
    try:
        auth_logout(request)
        return JsonResponse({'success':'logged out'}, safe=False)
    except:
        return JsonResponse({'error':'error when logging OUT'}, safe=False)   
    
         
# #@method_decorator(ensure_csrf_cookie, name='dispatch')
# class GetCSRF(APIView):
#     permission_classes = (permissions.AllowAny,)
    
<<<<<<< HEAD
    def get(self, request, format=None):
        return JsonResponse({'csrfToken': "OK"}, safe=False)
=======
#     def get(self, request, format=None):
#         return JsonResponse({'success':'csrf_cookie set!'}, safe=False)
>>>>>>> main
    
@api_view(['GET'])
def getAllUsers(request):
    users = User.objects.all()
    users = UserSerializer(users, many=True)
    return JsonResponse(users.data, safe=False)
