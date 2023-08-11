from rest_framework import serializers
from logingAPI.models import UserProfile
from backend.models import Story

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserProfileStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('pk', 'title', 'date', )

class UserProfileCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('pk', 'username', 'image')
    