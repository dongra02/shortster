from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from datetime import datetime, timedelta

from .serializers.common import UserSerializer


User = get_user_model()

class RegisterView(APIView):
    ''' Requests to /auth/register/ '''

    def post(self, request):
        new_user = UserSerializer(data=request.data)
        if new_user.is_valid():
            new_user.save()
            username = request.data.get('username')
            return Response({ 'message': f'Registration Successful, Welcome {username}' })
        return Response(new_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LogInView(APIView):
    ''' Requests to /auth/login/ '''

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = self.get_user(username)

        if not user.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')

        dt = datetime.now() + timedelta(days=7)

        token = jwt.encode(
            { 'sub': user.id, 'exp': int(dt.strftime('%s')) },
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({ 'token': token, 'message': f'Welcome Back {user.username}' })
