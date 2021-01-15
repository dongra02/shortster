from django.urls import path
from .views import CodeListView


urlpatterns = [
    path('', CodeListView.as_view()),
]