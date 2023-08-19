from django.http import JsonResponse
from .models import *
from django.core.paginator import Paginator
# Create your views here.
from rest_framework.views import APIView
from rest_framework import permissions
from logingAPI.models import *
from UserProfile.serializer import UserProfileSerializer
from django.http import JsonResponse
from django.db.models import Count
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import TokenAuthentication

def get_genre_for_Yaroslav(request):
    all_genres = Genre.objects.all()
    return JsonResponse([genre.serialize() for genre in all_genres], safe=False)

class GetFilteredStories(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        user = self.request.user
        page_number = request.GET.get("page", 1)
        genre = request.GET.get("genre", None)
        views = request.GET.get("views", None)
        likes = request.GET.get("likes", None)
        date = request.GET.get("date", None)
        comments = request.GET.get("comments", None)
        search = request.GET.get("search_request", None)
        
        if search:
            if not genre:
                if views == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).order_by('-views').distinct()
                elif views == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).order_by('views').distinct()
                elif likes == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).annotate(num_liked_by = Count('liked_by')).order_by('-num_liked_by').distinct()
                elif likes == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).annotate(num_liked_by = Count('liked_by')).order_by('num_liked_by').distinct()
                elif date == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).order_by('-datetime').distinct()
                elif date == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).order_by('datetime').distinct()
                elif comments == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).annotate(num_liked_by = Count('comments')).order_by('-num_liked_by').distinct()
                elif comments == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).annotate(num_liked_by = Count('comments')).order_by('num_liked_by').distinct()
                else:
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search)).distinct()

                
            
            if genre:
                filter_genre = genre.split(",")
                try:
                    filter_genre = [int(clean) for clean in filter_genre if clean != ""]
                except ValueError:
                    return JsonResponse({'response':False, 'message':'Input genres are incorrect'})
                except:
                    return JsonResponse({'response':False, 'message':'unknown error'})
                
                if views == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).order_by('-views').distinct()
                elif views == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).order_by('views').distinct()
                elif likes == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).annotate(num_liked_by = Count('liked_by')).order_by('-num_liked_by').distinct()
                elif likes == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).annotate(num_liked_by = Count('liked_by')).order_by('num_liked_by').distinct()
                elif date == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).order_by('-datetime').distinct()
                elif date == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).order_by('datetime').distinct()
                elif comments == "True":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).annotate(num_liked_by = Count('comments')).order_by('-num_liked_by').distinct()
                elif comments == "False":
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).annotate(num_liked_by = Count('comments')).order_by('num_liked_by').distinct()
                else:
                    all_posts = Story.objects.filter(Q(title__icontains = search ) | Q(story_body__icontains = search), genres__in = filter_genre).distinct()
       
        else:
            if not genre:
                if views == "True":
                    all_posts = Story.objects.all().order_by('-views').distinct()
                elif views == "False":
                    all_posts = Story.objects.all().order_by('views').distinct()
                elif likes == "True":
                    all_posts = Story.objects.annotate(num_liked_by = Count('liked_by')).order_by('-num_liked_by').distinct()
                elif likes == "False":
                    all_posts = Story.objects.annotate(num_liked_by = Count('liked_by')).order_by('num_liked_by').distinct()
                elif date == "True":
                    all_posts = Story.objects.all().order_by('-datetime').distinct()
                elif date == "False":
                    all_posts = Story.objects.all().order_by('datetime').distinct()
                elif comments == "True":
                    all_posts = Story.objects.annotate(num_liked_by = Count('comments')).order_by('-num_liked_by').distinct()
                elif comments == "False":
                    all_posts = Story.objects.annotate(num_liked_by = Count('comments')).order_by('num_liked_by').distinct()
                else:
                    all_posts = Story.objects.all().order_by("-datetime").distinct()
            
            if genre:
                filter_genre = genre.split(",")
                try:
                    filter_genre = [int(clean) for clean in filter_genre if clean != ""]
                except ValueError:
                    return JsonResponse({'response':False, 'message':'Incorrect genre input'})
                except:
                    return JsonResponse({'response':False, 'message':'unknown error'})
                if views == "True":
                    all_posts = Story.objects.filter(genres__in = filter_genre).order_by('-views').distinct()
                elif views == "False":
                    all_posts = Story.objects.filter(genres__in = filter_genre).order_by('views').distinct()
                elif likes == "True":
                    all_posts = Story.objects.filter(genres__in = filter_genre).annotate(num_liked_by = Count('liked_by')).order_by('-num_liked_by').distinct()
                elif likes == "False":
                    all_posts = Story.objects.filter(genres__in = filter_genre).annotate(num_liked_by = Count('liked_by')).order_by('num_liked_by').distinct()
                elif date == "True":
                    all_posts = Story.objects.filter(genres__in = filter_genre).order_by('-datetime').distinct()
                elif date == "False":
                    all_posts = Story.objects.filter(genres__in = filter_genre).order_by('datetime').distinct()
                elif comments == "True":
                    all_posts = Story.objects.filter(genres__in = filter_genre).annotate(num_liked_by = Count('comments')).order_by('-num_liked_by').distinct()
                elif comments == "False":
                    all_posts = Story.objects.filter(genres__in = filter_genre).annotate(num_liked_by = Count('comments')).order_by('num_liked_by').distinct()
                else:
                    all_posts = Story.objects.filter(genres__in = filter_genre).distinct()
                
        
        if all_posts:
            paginated = Paginator(all_posts, per_page=10)
            page_obj = paginated.get_page(page_number) 
            search_response = [story.serialize_general() for story in page_obj.object_list]
            response = {
                    "response": True,
                    "message":f"received page {page_number} of stories",
                    "page": {
                        "current": page_obj.number,
                        "has_next": page_obj.has_next(),
                        "has_previous": page_obj.has_previous(),
                        "number_of_pages": paginated.num_pages,
                        "number_of_items": paginated.count
                    },
                    "data": search_response,
                    
                }
            return JsonResponse(response)
        else:
            all_posts = Story.objects.all().order_by('-datetime').distinct()
            paginated = Paginator(all_posts, per_page=5)
            page_obj = paginated.get_page(1)
            response = {
                "response":False,
                "message":'nothing was found for this search request, here are 5 recommendations',
                "page": {
                        "current": 1,
                        "has_next": False,
                        "has_previous": False,
                        "number_of_pages": 1,
                        "number_of_items": 0
                    },
                "data": [story.serialize_general() for story in page_obj.object_list]
            }
            return JsonResponse(response)
        

class GetDistinctStoryPage(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        story_id = request.GET.get('story', 0)
        story_page_number = request.GET.get('page', 1)
        if story_id == 0:
            return JsonResponse({"response":False, "message":'missing "story" key in URL'})
        else:
            try:
                story = Story.objects.get(pk = story_id)
            except ObjectDoesNotExist:
                response = f"story with id={story_id} does not exist"
                return JsonResponse({'response': False, "message":response})
            except ValueError:
                response = f'value error (URL request: story= {story_id})'
                return JsonResponse({'response':False, "message":response})
            except:
                return JsonResponse({'response':False, 'message':'unknown error'})
            
            clean_data = story.serialize()
            splitted_story = [(clean_data['story_body'][i:i+2000]) for i in range(0, len(clean_data['story_body']), 2000)]
            paginated_story = Paginator(splitted_story, per_page=1)
            page_story_obj = paginated_story.get_page(story_page_number)
            response = {
                "response":True,
                "message":f"received page {story_page_number} of distinct story",
                "page": {
                    "number_of_pages": paginated_story.num_pages,
                    "number_of_items":paginated_story.count,
                    "current": page_story_obj.number,
                    "has_next": page_story_obj.has_next(),
                    "has_previous": page_story_obj.has_previous(),
                },
                "data": {
                    "story_id":story.id,
                    "user_creator_id":story.creator_id,
                    "title": story.title,
                    "date": story.datetime,
                    "likes": story.liked_by.all().count(),
                    "comments": story.comments.all().count(),
                    "genres": [genre.genre for genre in story.genres.all()],
                    "views": story.views,
                    "body":page_story_obj.object_list,
                }
            }
            return JsonResponse(response)

class GetDistinctRelatedStoriesPage(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        id = request.GET.get('story', None)
        related_stories_page = request.GET.get('page', 1)
        if id is not None:
            try:
                story = Story.objects.get(pk = id)
            except ObjectDoesNotExist:
                response = f"story with id={story} does not exist"
                return JsonResponse({'response': False, "message":response})
            except ValueError:
                response = f'value error (URL request: story= {id})'
                return JsonResponse({'response':False, "message":response})
            except:
                return JsonResponse({'response':False, 'message':'unknown error'})
            
            genre = [genre.id for genre in story.genres.all()]
            related_storie = Story.objects.filter(genres__in = genre).order_by('-views').distinct()
            paginated = Paginator(related_storie, 5)
            page_obj = paginated.get_page(related_stories_page)
            if paginated.count == 0:
                resp = False
                msg = "there are no related stories to this one"
            else:
                resp = True
                msg = f"received page {related_stories_page} of related stories"
            response = {
                "response":resp,
                "message":msg,
                "page": {
                    "current": page_obj.number,
                    "has_next": page_obj.has_next(),
                    "has_previous": page_obj.has_previous(),
                    "number_of_pages": paginated.num_pages,
                    "number_of_items": paginated.count       
                },
                "data": [related_stories.serialize_general() for related_stories in page_obj.object_list if related_stories != story],
            }
            return JsonResponse(response)
        else:
            return JsonResponse({'response':False, "message":'missing "story" key in URL'})
        
class GetStoryCommentsPage(APIView):
    permission_classes = (permissions.AllowAny,)
    
    
    def get(self, request, format=None):
        story_id = request.GET.get('story', None)
        comments_page = request.GET.get('page', 1)
        if story_id:
            try:
                story = Story.objects.get(pk = story_id)
            except ObjectDoesNotExist:
                response = f"story with id={story_id} does not exist"
                return JsonResponse({'response': False, "message":response})
            except ValueError:
                response = f'value error (URL request: story= {story_id})'
                return JsonResponse({'response':False, "message":response})
            except:
                return JsonResponse({'response':False, 'message':'unknown error'})
            
            paginated = Paginator(story.comments.filter(replied_to = 0), per_page=20)
            page_obj = paginated.get_page(comments_page)
            serialized_comments = [comments.serialize() for comments in page_obj.object_list if comments.replied_to == 0]
            if paginated.count == 0:
                resp = False
                msg = "there are no comments to this story"
            else:
                resp = True
                msg = f"received page {comments_page} of comments for this story"
            response = {
                "response":resp,
                "message":msg,
                "page":{
                    "current": page_obj.number,
                    "has_next": page_obj.has_next(),
                    "has_previous": page_obj.has_previous(),
                    "number_of_pages": paginated.num_pages,
                    "number_of_items": paginated.count
                },
                "data": serialized_comments}
            return JsonResponse(response, safe = False)
        else:
            return JsonResponse({'response':False, "message":'missing "story" key in URL'})
        
    
class GetStoryCommentsReplies(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        comment = request.GET.get('reply_id', None)
        get_replies_page = request.GET.get('page', 1)
        if comment:
            try:
                replies = Comments.objects.filter(replied_to = comment)
                paginated = Paginator(replies, per_page=10)
                page_obj = paginated.get_page(get_replies_page)
                if paginated.count == 0:
                    resp = False
                    msg = "there are no replies to this commentary"
                else:
                    resp = True
                    msg = f"received page {get_replies_page} with replies to this comment"
                response = {
                    "response":resp,
                    "message":msg,
                    "page":{
                        "current": page_obj.number,
                        "has_next": page_obj.has_next(),
                        "has_previous": page_obj.has_previous(),
                        "number_of_pages": paginated.num_pages,
                        "number_of_items": paginated.count
                    },
                    "data":[reply.serialize() for reply in page_obj.object_list]
                }
            except:
                return JsonResponse({'response':False, "message":"unknown error"})
            return JsonResponse(response)
        else:
            return JsonResponse({'response':False, "message":"missing 'reply_id' key in URL"}) 
    
class SetViewForStory(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        story = request.GET.get('story', None)
        
        if story:
            try:
                get_story = Story.objects.get(pk=story)
            except ValueError:
                response = f"value error (URL request : story = {story})"
                return JsonResponse({'response':False, "message":response})
            except ObjectDoesNotExist:
                response = f"story with id={story} does not exist"
                return JsonResponse({'response':False, "message":response})
            except:
                return JsonResponse({'response':False, "message":"unknown error"})
            get_story.views += 1
            get_story.save()
            return JsonResponse({'response':True, "message":"view added"})
        else:
            return JsonResponse({'response':False, "message":"missing 'story' key in URL"})
        
#useless since i got getProfile page view ???????
class GetStoryOrCommentCreator(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        user = request.GET.get('user', None)
        if user:
            try:
                get_user = User.objects.get(pk = user)
            except ValueError:
                response = f"value error, (request URL: story = {user})"
                return JsonResponse({'response':response})
            except ObjectDoesNotExist:
                response = f"user with id={user}, doesnt exist"
                return JsonResponse({'response':response})
            except:
                return JsonResponse({'response':"unknown error"})
            
            try:  
                get_user_profile = UserProfile.objects.get(user__id = user)
            except ObjectDoesNotExist:
                response = f"Profile does not exist - bug, requires fix"
                return JsonResponse({'response':False, "message":response})
            except ValueError:
                response = f"value error user_id = {user})"
                return JsonResponse({'response':False, "message":response})
            set_user_profile_info = UserProfileCreatorSerializer(get_user_profile)
            response = {
                'response':True,
                'message':'received user info',
                'data': set_user_profile_info.data
            }
            return JsonResponse(response)
        else:
            return JsonResponse({'response':False, "message":"missing 'user' key in URL"})   
 
 
class MarkAsRead(APIView):
    authentication_classes= [ TokenAuthentication ]
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        comment = request.GET.get('comment', None)
        try:
            clean_data = [int(id) for id in comment.split(',') if id != '' or id != ' ']
        except:

            return JsonResponse({'response':False, "message":f'wrong comment_id in request : comment={comment}'})
        mark = Comments.objects.filter(pk__in = clean_data)
        mark.update(read_by_user = True)

        return JsonResponse({'response':True, "message":f'comment id={comment} was marked as read'}) 

  
class PlugFunc(APIView):     
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        genres = ["Life", "Horror", "Adventure", "Sad"]
        for m in range(len(genres)):
            genre = Genre(genre=genres[m])
            genre.save()
            
        for i in range(4):
            for j in range(25):
                dbObject = Story(creator_id = request.user.id, title=f"Test Story{i+1}{j+1}", story_body=f"Testing story body{j+1}{i+1}")
                dbObject.save()
                dbObject.genres.add(Genre.objects.all()[i])
