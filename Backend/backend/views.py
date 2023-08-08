from django.http import JsonResponse
from .models import *
import json
from django.core.paginator import Paginator
# Create your views here.


def get_genre_for_Yaroslav(request):
    all_genres = Genre.objects.all()
    return JsonResponse([genre.serialize() for genre in all_genres], safe=False)

def posts(request):
    # comment = Comments(creator=request.user.id, comment_body="nice story bro")
    # comment.save()
    # genres = ["Life", "Horror", "Adventure", "Sad"]
    # for m in range(len(genres)):
    #     genre = Genre(genre=genres[m])
    #     genre.save()
        
    # for i in range(4):
    #     for j in range(25):
    #         dbObject = Story(creator_id = request.user.id, title=f"Test Story{i+1}{j+1}", story_body=f"Testing story body{j+1}{i+1}")
    #         dbObject.save()
    #         dbObject.genres.add(Genre.objects.all()[i])
    #         dbObject.comments.add(comment)
            
    page_number = request.GET.get("page", 1)
    genre = request.GET.get("genre", 0)
    story_id = request.GET.get('story', 0)
    related_page_number = request.GET.get("related_page", 1)
    story_page_number = request.GET.get("story_page", 1)
    
    if request.method == "GET" and genre == 0:
        all_posts = Story.objects.all().order_by('-views').distinct()
        paginated = Paginator(all_posts, per_page=10)
        page_obj = paginated.get_page(page_number)
        
    
    if request.method == "GET" and genre != 0:
        filter_genre = genre.split(",")
        # ids = [Genre.objects.get(genre = genre).id for genre in filter_genre]
        all_posts = Story.objects.filter(genres__in = map(int, filter_genre)).order_by('-views').distinct()
        paginated = Paginator(all_posts, per_page=10)
        page_obj = paginated.get_page(page_number)
    
    if request.method == "GET" and story_id != 0:
        story = Story.objects.get(pk = story_id)
        clean_data = story.serialize()
        genres = clean_data["genres"]
        splitted_story = [(clean_data['story_body'][i:i+2000]) for i in range(0, len(clean_data['story_body']), 2000)]
        paginated_story = Paginator(splitted_story, per_page=1)
        page_story_obj = paginated_story.get_page(story_page_number)
        ids = [Genre.objects.get(genre = genre).id for genre in genres]
        all_posts = Story.objects.filter(genres__in = ids).order_by('-views').distinct()
        paginated = Paginator(all_posts, per_page=5)
        page_obj = paginated.get_page(related_page_number)
        response = {
            "story_page": {
                "story_page_count": paginated_story.num_pages,
                "story_current": page_story_obj.number,
                "story_has_next_page": page_story_obj.has_next(),
                "story_has_previous_page": page_story_obj.has_previous(),
            },
            "story_data": {
                "body":page_story_obj.object_list,
                "story_id":story.id,
                "user_id":story.user_id,
                "title": story.title,
                "date": story.date,
                "likes": story.likes,
                "genres": [genre.genre for genre in story.genres.all()],
                "views": story.views
            },
            
            "related_page": {
                "current": page_obj.number,
                "has_next_page": page_obj.has_next(),
                "has_previous_page": page_obj.has_previous(),
                "number_of_pages": paginated.num_pages,
                "number_of_stories": paginated.count       
            },
            "related": [related_stories.serialize() for related_stories in page_obj.object_list if related_stories != story],
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
            "data": [story.serialize() for story in page_obj.object_list],
            
        }
    return JsonResponse(response, safe=False)