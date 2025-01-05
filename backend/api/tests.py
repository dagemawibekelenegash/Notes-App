from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Note


class NoteTests(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        # Generate JWT for authentication
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # URL for the Note List and Create view
        self.note_url = reverse("note-list")

    def test_create_note_authenticated(self):
        # Test that an authenticated user can create a note
        data = {"title": "Test Note", "content": "This is a test note."}
        response = self.client.post(
            self.note_url,
            data,
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}",  # Include JWT token
        )

        # Check that the response status is 201 Created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify the note has been created
        note = Note.objects.first()
        self.assertEqual(note.title, "Test Note")
        self.assertEqual(note.content, "This is a test note.")
        self.assertEqual(note.author, self.user)

    def test_create_note_unauthenticated(self):
        # Test that an unauthenticated user cannot create a note
        data = {"title": "Test Note", "content": "This is a test note."}
        response = self.client.post(self.note_url, data)

        # Check that the response status is 401 Unauthorized
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_read_notes_authenticated(self):
        # Test that an authenticated user can see their own notes
        Note.objects.create(
            title="Test Note 1", content="Content of note 1", author=self.user
        )
        Note.objects.create(
            title="Test Note 2", content="Content of note 2", author=self.user
        )

        response = self.client.get(
            self.note_url,
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}",  # Include JWT token
        )

        # Check that the response status is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response contains the user's notes
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["title"], "Test Note 1")
        self.assertEqual(response.data[1]["title"], "Test Note 2")

    def test_delete_note_authenticated(self):
        # Test that an authenticated user can delete their own note
        note = Note.objects.create(
            title="Test Note", content="This is a test note.", author=self.user
        )

        response = self.client.delete(
            reverse("delete-note", kwargs={"pk": note.pk}),
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}",  # Include JWT token
        )

        # Check that the response status is 204 No Content
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Verify that the note is deleted
        self.assertEqual(Note.objects.count(), 0)

    def test_delete_note_unauthenticated(self):
        # Test that an unauthenticated user cannot delete a note
        note = Note.objects.create(
            title="Test Note", content="This is a test note.", author=self.user
        )

        response = self.client.delete(reverse("delete-note", kwargs={"pk": note.pk}))

        # Check that the response status is 401 Unauthorized
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_other_user_note(self):
        # Test that a user cannot delete another user's note
        other_user = User.objects.create_user(
            username="otheruser", password="password123"
        )
        note = Note.objects.create(
            title="Other User Note",
            content="This note belongs to another user.",
            author=other_user,
        )

        response = self.client.delete(
            reverse("delete-note", kwargs={"pk": note.pk}),
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}",  # Include JWT token
        )

        # Check that the response status is 403 Forbidden
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
