# example/urls.py
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('members/', views.get_paid_members, name='get-paid-members'), #GET
    path('members/create', views.create_paid_member, name='create-paid-member'), #POST
    path('members/delete/<str:email>', views.delete_paid_member, name='delete-paid-member'), #DELETE
    path('members/update', views.patch_paid_member, name='patch-paid-member'), #PATCH
    path('adminconsole', views.adminpanel, name='admin-panel'), #ADMIN PANEL
    path('login/', views.login_view, name='login'), #LOGIN PAGE
    path('privacy', views.privacy, name='privacy'),
    path('terms', views.terms, name='terms'),
]