from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer


User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        new_user = UserSerializer(data=request.data)
        if new_user.is_valid():
            new_user.save()
            return Response({ 'message': f'Registration Successful, Welcome {new_user.username}' })
        return Response(new_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
