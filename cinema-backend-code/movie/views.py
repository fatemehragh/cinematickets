from django.shortcuts import render
from django.http import HttpResponse

def MovieList(request):
    return HttpResponse("Hi, this is the list of movies!")

    
