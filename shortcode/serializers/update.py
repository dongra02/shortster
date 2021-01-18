from rest_framework import serializers
from ..models import Shortcode

class CodeUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shortcode
        fields = ('full_url', 'short_url')