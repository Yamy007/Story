from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    array = [1,2,3,4,5,6,7,8,9,10]
    return JsonResponse(array, safe=False)