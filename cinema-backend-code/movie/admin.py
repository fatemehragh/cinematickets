from django.contrib import admin

from .models import Movie, Genre, Actor , Cinema


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass

@admin.register(Cinema)
class CinemaAdmin(admin.ModelAdmin):
    pass


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    pass


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    pass
