from django.http import JsonResponse
from .models import *
import json
# Create your views here.


def posts(request):
    all_posts = Story.objects.all()
    return JsonResponse([post.serialize() for post in all_posts], safe=False)
    