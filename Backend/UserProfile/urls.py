from django.urls import path
from .views import *

urlpatterns = [
    path('get_all_user_profiles', GetUserProfilesView.as_view()),
    path('update_user_profile', UpdateUserProfile.as_view()),
]