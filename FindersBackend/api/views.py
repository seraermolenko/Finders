from django.shortcuts import render
from .models import Posting, CustomUser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSeralizer, UserSeralizer
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError

@api_view(['POST'])
def uploadPost(request, id):
    user = get_object_or_404(CustomUser, id=id)
    username = user.username
    localTitle = request.data['title']
    localContent = request.data['content']
    if localTitle == '' or localContent == '':
        return Response('Title or content cannot be empty', status=status.HTTP_400_BAD_REQUEST)
    post = Posting(title=localTitle, content=localContent, user=user, username=username)
    post.save()
    return Response('Posting uploaded', status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getAllPostings(request):
    posts = Posting.objects.all()
    serializer = PostSeralizer(posts, many=True)
    if len(serializer.data) == 0:
        return Response('No posting found', status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def deletePost(request, id, postID):
    userID = get_object_or_404(CustomUser, id=id)
    post = get_object_or_404(Posting, id=postID, user=userID)
    post.delete()
    return Response('Posting deleted', status=status.HTTP_200_OK)  

@api_view(['POST'])
def register(request):
    serializer = UserSeralizer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            # return userid
            return Response ({'id': serializer.data['id']}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response('User already exists', status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = CustomUser.objects.get(username=username)
        if not user.check_password(password):
            raise CustomUser.DoesNotExist # Treat password mismatch as user not found
        # return userid
        return Response({'id': user.id}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response('Invalid username or password', status=status.HTTP_400_BAD_REQUEST)
    