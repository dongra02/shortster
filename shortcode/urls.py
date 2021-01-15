from django.urls import path
from .views import CodeListView, CodeStatsView


urlpatterns = [
    path('', CodeListView.as_view()),
    path('<short_url>/stats/', CodeStatsView.as_view()),
]