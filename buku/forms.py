from django import forms
from buku.models import Book


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['name','penulis']
        widgets = {
            'name': forms.TextInput(
                attrs={'id': 'book_name', 'required': True, 'placeholder': 'book name'}
            ),
            'penulis': forms.TextInput(
                attrs={'id': 'penulis', 'required': True, 'placeholder': 'author'}
            ),
        }