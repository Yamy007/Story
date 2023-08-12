from django.db import models
from logingAPI.models import User, UserProfile
from rest_framework import serializers
# Create your models here.

class UserProfileCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('pk', 'username', 'image')
        
class Genre(models.Model):
    genre = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.genre}"

    def serialize(self):
        return {
            "id":self.id,
            "genre": self.genre,
        }
    
        
class Story(models.Model):
    creator_id = models.IntegerField()
    title = models.CharField(max_length=50)
    story_body = models.CharField(max_length=1000000)
    liked_by = models.ManyToManyField(User, default=None)
    comments = models.ManyToManyField('Comments', default=None)
    date = models.DateField(auto_now_add=True)
    genres = models.ManyToManyField(Genre, related_name='genres')
    views = models.IntegerField(default=0)
    archived = models.BooleanField(default=False)
    
    def __str__(self) -> str:
        return f"{self.title}"
    
    def serialize(self):
        return {
            "story_id":self.id,
            "creator_user_id":self.creator_id,
            "title": self.title,
            "story_body": self.story_body,
            "liked_by": [user.id for user in self.liked_by.all()],
            "date": self.date,
            "comments": [comment.id for comment in self.comments.all()],
            "genres": [genre.id for genre in self.genres.all()],
            "views": self.views,
            "archivation_state": self.archived,
        }
    def serialize_general(self):
        return {
            "story_id":self.id,
            "creator_user_id":self.creator_id,
            "title": self.title,
            "story_body": self.story_body[:50],
            "date": self.date,
            "likes": self.liked_by.all().count(),
            "comments": self.comments.all().count(),
            "genres": [genre.id for genre in self.genres.all()],
            "views": self.views,
            "archivation_state": self.archived,
        }  
        
    def serialize_profile(self):
        return {
            "story_id":self.id,
            "title": self.title,
            "date": self.date,
            "likes": self.liked_by.all().count(),
            "comments": self.comments.all().count(),
            "views": self.views,
            "archivation_state": self.archived,
        }
        
class Comments(models.Model):
    creator = models.IntegerField()
    comment_body = models.TextField(max_length=1000)
    replied_to = models.IntegerField(default=0) 
    liked_by = models.ManyToManyField(User, default=None)
    
    def __str__(self) -> str:
        return f"{self.creator}, {self.id}"


    def serialize(self):
        user = UserProfile.objects.get(pk = self.creator)
        user = UserProfileCreatorSerializer(user)
        return {
        "comment_info":{
            "comment_id":self.id,
            #"creator_user_id":self.creator,
            "comment_body": self.comment_body,
            "replied_to_id": self.replied_to,
            "liked_by": self.liked_by.all().count(),
            "number_of_replies": Comments.objects.filter(replied_to = self.id).count()
            },
        "creator_info": user.data
        }
    def serialize_profile(self):
        related_story = Story.objects.get(comments__id = self.id)
        story_creator = User.objects.get(pk = related_story.creator_id)
        return {
        'comment_data':{
            "comment_id":self.id,
            "creator_user_id":self.creator,
            "comment_body": self.comment_body,
            "replied_to_id": self.replied_to,
            "liked_by": self.liked_by.all().count(),
            },
        'related_comment_story_data':{
            "story_id": related_story.id,
            "story_title": related_story.title,
            "creator_id": story_creator.id,
            "creator_username": story_creator.username,   
        }
        }
        