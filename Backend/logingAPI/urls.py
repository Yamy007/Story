from django.urls import path
from .views import *

urlpatterns = [
    path('register', Register),
    #path('csrf_cookie', GetCSRF.as_view()),
    path('auth_check', getUserAuthStatus),
    path('login', Login),
    path('logout', Logout),
    path('get_all_users', getAllUsers)
]