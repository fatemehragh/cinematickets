from django.contrib import admin

from .models import Movie, Genre, Actor


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    pass


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    pass
