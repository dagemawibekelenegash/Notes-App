from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer
from .models import Note


# List and create notes for the authenticated user
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Only logged-in users can access

    def get_queryset(self):
        # Return notes belonging to the current user
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the author of the note to the current user
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


# Delete a note owned by the authenticated user
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Only logged-in users can delete

    def get_queryset(self):
        # Restrict deletion to the current user's notes
        return Note.objects.filter(author=self.request.user)


# Create a new user (registration endpoint)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Open to all users
