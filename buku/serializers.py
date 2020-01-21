from rest_framework import serializers
from buku.models import Book


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ('id', 'name', 'penulis', 'created_date', 'update_date')