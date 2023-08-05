from django.http import JsonResponse
from .models import *
import json
from django.core.paginator import Paginator
# Create your views here.


def posts(request):
    # for i in range(1, 5):
    #     for j in range(1, 25):
    #         dbObject = Story(user_id = 1, title=f"Test Story{i+1}{j+1}", story_body=f"Testing story body{j+1}{i+1}", likes=i*j)
    #         dbObject.save()
    #         dbObject.genres.add(Genre.objects.all()[i])
            
    page_number = request.GET.get("page", 1)
    genre = request.GET.get("genre", "aojsdhaijsd12")
    all_genres = Genre.objects.all()
    story_id = request.GET.get('story', 0)
    
    if request.method == "GET" and genre == "aojsdhaijsd12":
        all_posts = Story.objects.all()
        paginated = Paginator(all_posts, per_page=10)
        page_obj = paginated.get_page(page_number)
        
    
    if request.method == "GET" and genre != "aojsdhaijsd12":
        filter_genre = genre.split(",")
        ids = [Genre.objects.get(genre = genre).id for genre in filter_genre]
        all_posts = Story.objects.filter(genres__in = ids)
        paginated = Paginator(all_posts, per_page=10)
        page_obj = paginated.get_page(page_number)
    
    if request.method == "GET" and story_id != 0:
        story = Story.objects.get(pk = story_id)
        print(story.genres)
        clean_data = story.serialize()
        genres = clean_data["genres"]
        ids = [Genre.objects.get(genre = genre).id for genre in genres]
        all_posts = Story.objects.filter(genres__in = ids).order_by('-views')
        paginated = Paginator(all_posts, per_page=5)
        page_obj = paginated.get_page(page_number)
        response = {
            "page": {
                "current": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "number_of_pages": paginated.num_pages,
                "number_of_stories": paginated.count
            },
            "genre": [genre.serialize() for genre in all_genres],
            "data": clean_data,
            "related": [story.serialize() for story in page_obj.object_list]
        }
        return JsonResponse(response, safe=False)
    
    response = {
            "page": {
                "current": page_obj.number,
                "has_next": page_obj.has_next(),
                "has_previous": page_obj.has_previous(),
                "number_of_pages": paginated.num_pages,
                "number_of_stories": paginated.count
            },
            "genre": [genre.serialize() for genre in all_genres],
            "data": [story.serialize() for story in page_obj.object_list],
            
        }
    return JsonResponse(response, safe=False)