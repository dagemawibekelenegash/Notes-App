from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


# Serializer for User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]  # Include essential fields
        extra_kwargs = {"password": {"write_only": True}}  # Hide password in responses

    def create(self, validated_data):
        # Create a user with a hashed password
        return User.objects.create_user(**validated_data)


# Serializer for Note model
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "id",
            "title",
            "content",
            "created_at",
            "author",
        ]  # Include all note fields
        extra_kwargs = {
            "author": {"read_only": True}
        }  # Prevent manual author assignment
