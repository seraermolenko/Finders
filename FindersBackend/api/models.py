from django.db import models
from django.contrib.auth.models import AbstractUser

    
class CustomUser(AbstractUser):
    biography = models.TextField(max_length=500, blank=True)
    school = models.CharField(max_length=30, blank=True)
    minor = models.CharField(max_length=30, blank=True)
    major = models.CharField(max_length=30, blank=True)
    skills = models.CharField(max_length=100, blank=True)
    interests = models.CharField(max_length=100, blank=True)
        
    class Meta:
        db_table = 'CustomUser'
    
    
    
class Posting(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    tags = models.CharField(max_length=100, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    skills = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    username = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'Posting'
    