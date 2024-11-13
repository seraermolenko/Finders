from django.urls import path
from . import views
    
    
urlpatterns = [
    # path('v1/users', views.searchCreateUser), # POST: Create user
    # path('v1/users/<int:id>', views), # User with id n 
    path('v1/users/<int:id>/postings', views.uploadPost), # POST
    path('v1/users/<int:id>/postings/<int:postID>', views.deletePost), # DELETE
    path('v1/postings', views.getAllPostings), # GET: all posts
    path('v1/auth/login', views.login), # POST: log in user
    path('v1/auth/register', views.register), # POST; Create user account
    
]   