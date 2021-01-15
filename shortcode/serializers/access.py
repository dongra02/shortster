from rest_framework import serializers
from ..models import Shortcode

class CodeAccessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shortcode
        fields = ('short_url', 'full_url')