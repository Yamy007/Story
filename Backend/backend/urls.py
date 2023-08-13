from django.urls import path
from .views import *

urlpatterns = [
    #get stories methods
    path("get_all_posts", GetFilteredStories.as_view()),#works fine after tests
    path("get_all_genres", get_genre_for_Yaroslav, name="genres"),#works fine after tests
    path("get_story", GetDistinctStoryPage.as_view()),#works fine after tests
    path("get_related", GetDistinctRelatedStoriesPage.as_view()),#needs improvement
    path("get_story_comments", GetStoryCommentsPage.as_view()),#works fine after tests
    path("get_story_comments_replies", GetStoryCommentsReplies.as_view()),#works fine after tests
    path("set_view", SetViewForStory.as_view()),
    path("mark_as_read", MarkAsRead.as_view()),
    
    path("plug_URL", test_plug_func),
    
]
