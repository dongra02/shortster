from django.db import models
import datetime

class Shortcode(models.Model):
    full_url = models.CharField(max_length=2000)
    short_url = models.CharField(max_length=100, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    last_access = models.DateTimeField(null=True, blank=True)
    access_count = models.IntegerField(default=0)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='short_urls',
        on_delete=models.CASCADE
    )

    def add_access(self):
        self.access_count += 1

    def set_access_date(self):
        self.last_access = datetime.datetime.now()

