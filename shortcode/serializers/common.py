from rest_framework import serializers
from ..models import Shortcode

class ShortcodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shortcode
        fields = '__all__'