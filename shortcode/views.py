from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Shortcode
from .serializers.common import ShortcodeSerializer
from .serializers.update import CodeUpdateSerializer

import string
import random

# Utility functions to verify custom short_urls or create for user in POST request to /shortcodes/

def check_url(url):
    return len(url) >= 4 and url.isalnum()

bad_url_message = 'Shortcode must be at least 4 characters long & contain alpha-numeric characters only.'
    
def create_short_url():
    current_urls = [code.short_url for code in Shortcode.objects.all()]
    short_url = ''
    while (short_url == '' or short_url in current_urls):
        chars = list(string.ascii_letters) + [str(num) for num in range(10)]
        short_url = ''.join(random.choice(chars) for i in range(6))
    return short_url

# CodeListView manages GET and POST requests to collection at /shortcodes/

class CodeListView(APIView):
    ''' Requests to shortcodes/ '''

    permission_classes=(IsAuthenticatedOrReadOnly,)

    def get(self, request):
        codes = Shortcode.objects.filter(owner=request.user)
        serialized_codes = ShortcodeSerializer(codes, many=True)
        return Response(serialized_codes.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        short_url = request.data['short_url']
        if short_url and not check_url(short_url):
            return Response({ 'short_url': bad_url_message}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not short_url:
            short_url = create_short_url()
        request.data['short_url'] = short_url
        new_code = ShortcodeSerializer(data=request.data)
        if new_code.is_valid():
            new_code.save()
            return Response(new_code.data, status=status.HTTP_201_CREATED)
        return Response(new_code.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# CodeStatsView manages READ, UPDATE & DELETE requests to specific shortcodes 

class CodeStatsView(APIView):
    ''' Requests to <short_url>/stats/ '''

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_shortcode(self, short_url):
        try:
            return Shortcode.objects.get(short_url=short_url)
        except Shortcode.DoesNotExist:
            raise NotFound()
    
    def is_owner(self, shortcode, user):
        if shortcode.owner.id != user.id:
            raise PermissionDenied()

    def get(self, request, short_url):
        code = self.get_shortcode(short_url)
        self.is_owner(code, request.user)
        serialized_code = ShortcodeSerializer(code)
        return Response(serialized_code.data, status=status.HTTP_200_OK)

    def put(self, request, short_url):
        code_to_update = self.get_shortcode(short_url)
        self.is_owner(code_to_update, request.user)
        newShortUrl = request.data['short_url']
        if newShortUrl and not check_url(newShortUrl):
            return Response({ 'short_url': bad_url_message }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not newShortUrl:
            newShortUrl = create_short_url()
        request.data['short_url'] = newShortUrl
        updated_code = CodeUpdateSerializer(code_to_update, data=request.data)
        if updated_code.is_valid():
            updated_code.save()
            return Response(updated_code.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_code.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, short_url):
        code_to_delete = self.get_shortcode(short_url)
        self.is_owner(code_to_delete, request.user)
        code_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# CodeAccessView manages access requests by updating stats and providing full_url to front end for redirect

class CodeAccessView(CodeStatsView):
    ''' Requests to <short_url>/, redirect and inform stats '''

    def get(self, request, short_url):
        code = self.get_shortcode(short_url)
        code.add_access()
        code.set_access_date()
        code.save()
        serialized_code = CodeUpdateSerializer(code)
        return Response(serialized_code.data, status=status.HTTP_200_OK)