from rest_framework.generics import ListAPIView

from .models import Movie
from .serializer import MovieSerializer

class MovieList(ListAPIView):
    # query available movies, ordered by DESC CreatedAt field
    queryset = Movie.objects.filter(is_available_for_reservation=True).order_by("-created_at").all()
    serializer_class = MovieSerializer
