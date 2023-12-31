from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend


from .models import Movie , Genre , Cinema
from .serializer import MovieSerializer , GenreSerializer, CinemaSerializer

class MovieList(ListAPIView):
    # query available movies, ordered by DESC CreatedAt field
    queryset = Movie.objects.filter(is_available_for_reservation=True).order_by("-created_at").all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['genres', 'cinemas']

class GenreList(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class CinemaList(ListAPIView):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer