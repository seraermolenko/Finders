from rest_framework import serializers
from .models import Posting, CustomUser

class PostSeralizer(serializers.ModelSerializer):
    
    class Meta:
        model = Posting
        fields = ['id', 'title', 'content', 'date_posted', 'user', 'username']
        
        
class UserSeralizer(serializers.ModelSerializer):

        class Meta:
            model = CustomUser
            fields = ['id', 'username', 'password']
            
        def validate(self, data):
            username = data.get('username', None)
            
            if CustomUser.objects.filter(username=username).exists():
                raise serializers.ValidationError({"username": "A user with this username already exists."})

            return data

        def create(self, validated_data):
            user = CustomUser.objects.create_user(  
                username=validated_data['username'],
                )
            # create_user handles password hashing
            user.set_password(validated_data['password'])
            user.save()
            return user
