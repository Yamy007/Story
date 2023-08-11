from django.urls import path
from .views import *

urlpatterns = [
    path('get_all_user_profiles', GetUserProfilesView.as_view()),
    path('update_user_profile', UpdateUserProfile.as_view()),
    path('profile',GetUserProfilePage.as_view()),
    path('get_user_liked_posts', GetUserLikedPosts.as_view()),
    path('comments_made_by_user', GetUser_MadeComments.as_view()),
    path('stories_made_by_user', GetUser_MadeStories.as_view()),
    
    path('create_story', CreateUserStory.as_view()),
    path('create_comment_story_or_reply_to_comment', CommentStoryOrReplyToComment.as_view()),
    path('like_story', LikeUnlikeStory.as_view()),
    path('like_comment', LikeUnlikeComment.as_view()),
    

]