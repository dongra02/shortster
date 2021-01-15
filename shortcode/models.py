from django.db import models

class Shortcode(models.Model):
    full_url = models.CharField(max_length=2000)
    short_url = models.CharField(max_length=6, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    last_access = models.DateTimeField(null=True, blank=True)
    access_count = models.IntegerField(default=0)

    def add_access(self):
        self.access_count += 1
