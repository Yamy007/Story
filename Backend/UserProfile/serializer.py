from rest_framework import serializers
from logingAPI.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'is_premium', 'first_name', 'last_name','email','phone','address','user')
    