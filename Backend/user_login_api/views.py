from django.shortcuts import render
from .models import *
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import permissions, status
from string import punctuation
# Create your views here.

def validation(data):
    clean_data = {
        'username': data.GET.get('username'),
        'password': data.GET.get('password'),
        'email': data.GET.get('email'),
    }
    if set(punctuation) in len(clean_data['username']):
        raise ValueError('Special symbols in username are not allowed!')
    if len(clean_data['password']) > 16 or len(clean_data['password']) < 8:
        raise ValueError('Password is too long/short!')
    if set(punctuation) in clean_data['password']:
        raise ValueError('Special symbols in password are not allowed!')
    if "@" not in clean_data['email'] or "." not in clean_data['email']:
        raise ValueError('Invalid email address!')
    
    return clean_data

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny)
    def post(self, request):
        clean_data = validation(request.data)
        serializer = UserRegisterSerializer(data = clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    pass

class UserLogou(APIView):
    pass

class UserView(APIView):
    pass

