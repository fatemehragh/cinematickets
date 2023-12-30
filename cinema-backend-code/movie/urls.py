from django.urls import path

from .views import MovieList, GenreList, CinemaList

urlpatterns = [
    path("genres/", GenreList.as_view()),
    path("cinemas/", CinemaList.as_view()),
    path("movies/", MovieList.as_view()),
]
