from django.urls import path
from .views import *

urlpatterns = [
    path("get_all_posts/", posts, name="posts"),
    path("get_all_genres/", get_genre_for_Yaroslav, name="genres"),
]