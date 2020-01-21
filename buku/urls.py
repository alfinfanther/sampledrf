from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # api
    path('api/v1/posts/',views.book_collection, name='book_collection'),
    path('api/v1/posts/<int:pk>',views.book_element, name='book_element')

]