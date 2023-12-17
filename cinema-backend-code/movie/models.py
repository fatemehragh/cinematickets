from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.name}"


class Actor(models.Model):
    SEX_CHOICES = (
        ('m', 'male'),
        ('f', 'female'),
    )
    name = models.CharField(max_length=256)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    biography = models.TextField(null=True, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Movie(models.Model):
    name = models.CharField(max_length=255, unique=True)
    director_name = models.CharField(max_length=255)
    genres = models.ManyToManyField(Genre)
    actors = models.ManyToManyField(Actor)
    rate = models.PositiveSmallIntegerField(default=0)
    description = models.TextField()
    is_available_for_reservation = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.director_name}"
