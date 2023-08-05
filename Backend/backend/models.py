from django.db import models

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
    
    class Meta:
        ordering = ['id'] 
        
class Story(models.Model):
    user_id = models.IntegerField(default=None)
    title = models.CharField(max_length=50)
    story_body = models.CharField(max_length=10000)
    likes = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True)
    genres = models.ManyToManyField(Genre, related_name='genres')
    
    def _init_(self):
        return self
    
    def __str__(self) -> str:
        return f"{self.title}"
    
    def serialize(self):
        return {
            "story_id":self.id,
            "user_id":self.user_id,
            "title": self.title,
            "story_body": self.story_body,
            "likes": self.likes,
            "date": self.date,
            "genres": [genre.genre for genre in self.genres.all()]
        }
        
    class Meta:
        ordering = ['-date']
        
class Comments(models.Model):
    user_id = models.IntegerField(default=None)
    comment_body = models.CharField(max_length=1000)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
        
    def _init_(self):
        return self
    
    def __str__(self) -> str:
        return f"{self.user_id}, {self.id}"

    def serialize(self):
        return {
            "comment_id":self.id,
            "user_id":self.user_id,
            "comment_body": self.comment_body,
            "story": self.story,
        }
    
    class Meta:
        ordering = ['user_id']