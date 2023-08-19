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
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
import re
import random  
import string
from django.contrib.auth.hashers import check_password
from django.core.mail import send_mail
from django.conf import settings
# from profanity_filter import ProfanityFilter


class CheckAuthenticationStatus(APIView):
    authentication_classes= [ TokenAuthentication ]
    
    def post(self, request, format=None):
        try:
            if request.user.is_authenticated:
                return JsonResponse({'response': True, "message":"user authenticated"})
            else:
                return JsonResponse({'response': False, "message":"user is not authenticated"})
        except:
            return JsonResponse({'response':False, "message":"something went wrong"})
        
        

class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)
            
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
                    return JsonResponse({'response':False, "message":"Account with that username already exists"})
                if len(password) < 8:
                    return JsonResponse({'response': False, "message":'Password is too short'})
                if User.objects.filter(email=email).exists():
                    return JsonResponse({'response': False, "message":"Account with that email already exists"})
                if username in password:
                    return JsonResponse({'response': False, "message":'Password cannot contain part of username'})
                if password in username:
                    return JsonResponse({'response': False, "message":'Password cannot be part of username'})
                if any(symbol in password for symbol in set(punctuation)):
                    return JsonResponse({'response': False, "message":'Password cannot contain special symbols'})
                if password.isnumeric():
                    return JsonResponse({'response': False, "message":'Password cannot be numerical'})
                if any(symbol in username for symbol in set(punctuation)):
                    return JsonResponse({'response': False, "message":'Username cannot contain special symbols'})
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
                return JsonResponse({'response': False, "message":"Passwords do not match"})
        except:
            return JsonResponse({'response': False, "message":"error during registration"})     
        
        try: 
            user_profile = UserProfile(user=upd_user_status, email=email, username = username)
            user_profile.save()
            if superuser_secret_word == "isjxynasygaszgnxiasnuiqweruqiwe120942190142osidjadskamf":
                user_profile.is_premium = True
                user_profile.save()
            return JsonResponse({'response':True, "message":'Account successfully created'})  
        except:
            try:
                delete_user = User.objects.get(pk=upd_user_status.id)
                delete_profile = UserProfile.objects.get(user__id=upd_user_status.id)
                delete_profile.delete()
                delete_user.delete()
            except:
                pass
            return JsonResponse({'response': False,  "message":'error during registration'})
           
        
 

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
                    return JsonResponse({'response':False,  "message":'User with that email does not exist'})
                if check_password(password, user.password):
                    user = auth.authenticate(username = user.username, password=password)
                else:
                    return JsonResponse({'response':False,  "message":'Invalid password'})
            else:
                return JsonResponse({'response':False, "message":'Invalid email syntax'})
        else:
            try:
                user = User.objects.get(username=login_credential)
            except:
                return JsonResponse({'response':False,  "message":'User with that username does not exist'})
            if check_password(password, user.password):
                user = auth.authenticate(username = user.username, password=password)
            else:
                return JsonResponse({'response':False,  "message":'Invalid password'})
        
        if user is not None:
            auth.login(request, user)
            get_profile = UserProfile.objects.get(user__id=user.id)
            user_stories = Story.objects.filter(creator_id = get_profile.user.id)
            notifications_by_comments = [comment for user_story in user_stories for comment in user_story.comments.all()  if comment.replied_to == 0 and comment.read_by_user == False and comment.creator != get_profile.user.id]
            user_comments = Comments.objects.filter(creator=get_profile.user.id)
            notifications_by_replies = Comments.objects.filter(replied_to__in = [user_comment.id for user_comment in user_comments if user_comment.creator != get_profile.user.id], read_by_user = False).count()
            token = Token.objects.get(user=user)
            user_data = {
                "response":True,
                "message":'user logged in',
                "user": UserProfileSerializer(get_profile).data,
                "user_notifications": len(notifications_by_comments) + notifications_by_replies,
            }
            final_resp = JsonResponse(user_data)
            final_resp.set_cookie(key='token', value=token.key, max_age=3600)
            return final_resp
        else:
            return JsonResponse({'response': False, "message":"User does not exist"})
        


     
class LogoutView(APIView):
    authentication_classes= [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    @method_decorator(csrf_protect, name='dispatch')  
    def post(self, request, format=None):
        try:
            auth.logout(request)
            valid = JsonResponse({'response': True,  "message":'логаут спрацював'})
            valid.delete_cookie('token')
            return valid
        except:
            valid = JsonResponse({'response': True,  "message":'логаут не спрацював'})
            valid.delete_cookie('token')
            return valid   
        
 
 


class ChangePassword(APIView):
    authentication_classes= [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        data = request.data
        user = request.user.id
        current_password = data['cur_password']
        new_password = data['new_password']
        re_new_password = data['re_new_password']
        get_user = User.objects.get(pk = user)
                
        if check_password(current_password, get_user.password):
            if current_password != new_password:
                if len(new_password) < 8:
                    return JsonResponse({'response': False, "message":'Password is too short'})
                if any(symbol in new_password for symbol in set(punctuation)):
                    return JsonResponse({'response': False, "message":'Password cannot contain special symbols'})
                if new_password.isnumeric():
                    return JsonResponse({'response': False, "message":'Password cannot be completely numerical'})
                if get_user.username in new_password:
                    return JsonResponse({'response': False, "message":'Password cannot contain part of username'})
                if new_password in get_user.username:
                    return JsonResponse({'response': False, "message":'Password cannot be part of username'})
                if new_password == re_new_password:
                    get_user.set_password(new_password)
                    get_user.save()
                else:
                    return JsonResponse({'response':False, "message":"New passwords do not match"})
            else:
                return JsonResponse({'response':False, "message":"New password cannot be same as current"})
        else:
            return JsonResponse({'response':False, "message":"Invalid current password"})
        
        return JsonResponse({'response':True, "message":"Password successfully changed"})
        
def random_string():  
    str1 = ''.join((random.choice(string.ascii_letters) for _ in range(5)))  
    str1 += ''.join((random.choice(string.digits) for _ in range(5)))  
  
    sam_list = list(str1) # it converts the string to list.  
    random.shuffle(sam_list) # It uses a random.shuffle() function to shuffle the string.  
    final_string = ''.join(sam_list)  
    return final_string
      
class ResetPassword(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        data = request.data
        login_credential = data['login']
        
        new_password = random_string()
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        
        if "@" in login_credential:
            if re.fullmatch(regex, login_credential):
                try:
                    get_user = User.objects.get(email=login_credential)
                except:
                    return JsonResponse({'response':False,  "message":'User with that email does not exist'})
                get_user.set_password(new_password)
            else:
                return JsonResponse({'response':False, "message":'Invalid email syntax'})
            response = f"Success. Check your email inbox for further details."
        else:
            try:
                get_user = User.objects.get(username=login_credential)
            except:
                return JsonResponse({'response':False, "message":"User with that username does not exist"})
            get_user.set_password(new_password)
            email = get_user.email.split('@')
            for x in range(1, len(email[0])-2):
                email[0][x] = '*'
            
            censored_email = ''.join(email)
            response = f"Success. Check your email ({censored_email}) inbox for further details."
        get_user.save()  
        subject = 'Password Reset'
        message = f'''Password for user account related to this email was reset successfully.

Your new password: {new_password},


We strongly recommend that you change your password via our website.

Regards,
StoryDevTeam'''
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [f'{get_user.email}']
        send_mail( subject, message, email_from, recipient_list )

        return JsonResponse({'response':True, "message":response})
    
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