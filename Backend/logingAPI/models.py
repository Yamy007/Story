from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to='images/', default=None)
    is_premium = models.BooleanField(default=False)
    first_name = models.CharField(default='', max_length=100)
    last_name = models.CharField(default='', max_length=100)
    email = models.EmailField(default='', max_length=100)
    phone = models.CharField(default='', max_length=100)
    address = models.CharField(default='', max_length=100)
    bio = models.TextField(default='', max_length=10000)
    
    def __str__(self):
        return self.first_name