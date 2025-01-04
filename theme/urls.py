# example/urls.py
from django.urls import path

from theme.views import home


urlpatterns = [
    path('', home),
]