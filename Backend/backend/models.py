from django.db import models
from logingAPI.models import User, UserProfile
# Create your models here.

class Genre(models.Model):
    genre = models.CharField(max_length=100)
    
    def _init_(self):
        return self
    
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
    
    def _init_(self):
        return self
    
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
        
        
class Comments(models.Model):
    creator = models.IntegerField()
    comment_body = models.TextField(max_length=1000)
    replied_to = models.IntegerField(default=0) 
    liked_by = models.ManyToManyField(User, default=None)
    
    def _init_(self):
        return self
    
    def __str__(self) -> str:
        return f"{self.creator}, {self.id}"

    def serialize(self):
        return {
            "comment_id":self.id,
            "creator_user_id":self.creator,
            "comment_body": self.comment_body,
            "replied_to_id": self.replied_to,
            "liked_by": [user.id for user in self.liked_by.all()],
        }
