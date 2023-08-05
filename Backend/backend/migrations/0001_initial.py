# Generated by Django 4.2.4 on 2023-08-05 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField(default=None)),
                ('title', models.CharField(max_length=50)),
                ('story_body', models.CharField(max_length=10000)),
                ('likes', models.IntegerField(default=0)),
                ('date', models.DateField(auto_now_add=True)),
                ('views', models.IntegerField(default=0)),
                ('genres', models.ManyToManyField(related_name='genres', to='backend.genre')),
            ],
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField(default=None)),
                ('comment_body', models.CharField(max_length=1000)),
                ('story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.story')),
            ],
        ),
    ]
