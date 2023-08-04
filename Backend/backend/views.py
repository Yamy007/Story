from django.http import JsonResponse
from .models import *
import json
from django.core.paginator import Paginator
# Create your views here.


def posts(request):
    page_number = request.GET.get("page", 1)
    # for i in range(0, 100):
    #     genres = Genre.objects.filter(genre="Hentai")
    #     dbobject = Story.objects.create(user_id = request.user.id, title=f"Test Story {i+1}", story_body = "Lorem Impsum")
    #     for gan in genres:
    #         dbobject.genres.add(gan)
    all_posts = Story.objects.all()
    paginated = Paginator(all_posts, per_page=10)
    page_obj = paginated.get_page(page_number)
    response = {
        "page": {
            "current": page_obj.number,
            "has_next": page_obj.has_next(),
            "has_previous": page_obj.has_previous(),
        },
        "data": [story.serialize() for story in page_obj.object_list]
    }
    return JsonResponse(response, safe=False)
    