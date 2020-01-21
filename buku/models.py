from django.db import models
from utils.models import CreateUpdate

class Book(CreateUpdate):
    name = models.CharField(max_length=255, blank=True)
    penulis = models.CharField(max_length=255, blank=True)
 
    def __str__(self):
        return self.name