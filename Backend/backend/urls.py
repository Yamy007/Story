from django.urls import path
from .views import *

urlpatterns = [
    #get stories methods
    path("get_all_posts/", GetFilteredStories.as_view()),
    path("get_all_genres/", get_genre_for_Yaroslav, name="genres"),
    path("get_story", GetDistinctStoryPage.as_view()),
    path("get_related", GetDistinctRelatedStoriesPage.as_view()),
    path("get_story_comments", GetStoryCommentsPage.as_view()),
    
    #create stories methods
    
    
    
    path("plug_URL", test_plug_func),
    
]