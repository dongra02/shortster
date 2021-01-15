from django.urls import path
from .views import CodeListView, CodeStatsView, CodeAccessView


urlpatterns = [
    path('', CodeListView.as_view()),
    path('<short_url>/stats/', CodeStatsView.as_view()),
    path('<short_url>/', CodeAccessView.as_view()),
]