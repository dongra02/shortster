# Generated by Django 3.1.5 on 2021-01-18 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shortcode', '0004_auto_20210118_1452'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='shortcode',
            name='shortcode_shortcode_short_url_lentgh',
        ),
    ]
