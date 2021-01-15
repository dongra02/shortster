from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Shortcode
from .serializers.common import ShortcodeSerializer

import string
import random

class CodeListView(APIView):
    ''' Requests to /shortcodes '''

    permission_classes=(IsAuthenticated,)

    # Generate Unique Shortcode if not provided in request body
    def create_short_url(self):
        current_urls = [code.short_url for code in Shortcode.objects.all()]
        short_url = ''
        while (short_url == '' or short_url in current_urls):
            chars = list(string.ascii_letters) + [str(num) for num in range(10)]
            short_url = ''.join(random.choice(chars) for i in range(6))
        return short_url

    def get(self, request):
        codes = Shortcode.objects.filter(owner=request.user)
        serialized_codes = ShortcodeSerializer(codes, many=True)
        return Response(serialized_codes.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        short_url = request.data['short_url']
        if short_url and (len(short_url) < 4 or not short_url.isalnum()):
            return Response({ 'message': 'Shortcode must be at least 4 characters long & contain alpha-numeric characters only.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not short_url:
            short_url = self.create_short_url()
        request.data['short_url'] = short_url
        new_code = ShortcodeSerializer(data=request.data)
        if new_code.is_valid():
            new_code.save()
            return Response(new_code.data, status=status.HTTP_201_CREATED)
        return Response(new_code.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CodeStatsView(APIView):
    ''' Requests to <short_url>/stats '''

    def get_shortcode(self, short_url):
        try:
            return Shortcode.objects.get(short_url=short_url)
        except Shortcode.DoesNotExist:
            raise NotFound()
    
    def is_owner(self, shortcode, user):
        if shortcode.owner.id != user.id:
            print('owner id', shortcode.owner.id)
            print('user id', user.id)
            raise PermissionDenied()

    def get(self, request, short_url):
        code = self.get_shortcode(short_url)
        self.is_owner(code, request.user)
        serialized_code = ShortcodeSerializer(code)
        return Response(serialized_code.data, status=status.HTTP_200_OK)

