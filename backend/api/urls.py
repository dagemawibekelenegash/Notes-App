from django.urls import path
from . import views

# Define URL patterns for the Notes API
urlpatterns = [
    # Endpoint for listing and creating notes
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    # Endpoint for deleting a specific note by ID
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]
