# Generated by Django 4.2.4 on 2023-08-06 15:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('logingAPI', '0003_userprofile_is_superuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='is_superuser',
        ),
    ]