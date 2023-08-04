from django.http import JsonResponse
# Create your views here.

def home(request):
    array = [1,2,3,4,5,6,6]
    return JsonResponse(array, safe=False)