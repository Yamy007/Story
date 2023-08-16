from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to='images/', default=None)
    username = models.CharField(max_length=100)
    is_premium = models.BooleanField(default=False)
    first_name = models.CharField(default='', max_length=100)
    last_name = models.CharField(default='', max_length=100)
    email = models.EmailField(default='', max_length=100)
    phone = models.CharField(default='', max_length=100)
    address = models.CharField(default='', max_length=100)
    bio = models.TextField(default='', max_length=10000)

    def __str__(self):
        return self.first_name
    
# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)