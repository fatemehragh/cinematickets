from rest_framework.generics import ListAPIView

from .models import Movie , Genre , Cinema
from .serializer import MovieSerializer , GenreSerializer, CinemaSerializer

class MovieList(ListAPIView):
    # query available movies, ordered by DESC CreatedAt field
    queryset = Movie.objects.filter(is_available_for_reservation=True).order_by("-created_at").all()
    serializer_class = MovieSerializer

class GenreList(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class CinemaList(ListAPIView):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer