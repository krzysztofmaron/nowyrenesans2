# example/urls.py
from django.urls import path

from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('members/', views.get_paid_members, name='get-paid-members'), #GET
    path('members/create', views.create_paid_member, name='create-paid-member'), #POST
    path('members/delete', views.delete_paid_member, name='delete-paid-member'), #DELETE
    path('members/update', views.patch_paid_member, name='patch-paid-member'), #PATCH
]