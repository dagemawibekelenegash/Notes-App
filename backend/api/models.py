from django.db import models
from django.contrib.auth.models import User


# Model for storing user notes
class Note(models.Model):
    title = models.CharField(max_length=100)  # Note title (max 100 chars)
    content = models.TextField()  # Main content of the note
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for note creation
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notes"
    )  # User who created the note

    def __str__(self):
        return self.title  # Use title as the string representation
