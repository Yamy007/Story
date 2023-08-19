from django.urls import path
from .views import *

urlpatterns = [
    path('register', SignUpView.as_view()),
    path('csrf_cookie', CsrfTokenView.as_view()),
    path('auth_check', CheckAuthenticationStatus.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('get_all_users', GetUsersView.as_view()),
    path('all_users_info', GetUsersViewALL.as_view()),
    
    path('change_password', ChangePassword.as_view()),
    path('reset_password', ResetPassword.as_view()),
]