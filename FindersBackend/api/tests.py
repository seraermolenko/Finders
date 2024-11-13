from django.test import TestCase
from .models import CustomUser, Posting
from django.urls import reverse
from rest_framework.test import APIClient
from .views import uploadPost, getAllPostings, deletePost

class TestModels(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.custom_user = CustomUser.objects.create_user(
            username='testuser',
            password='testpass123',
            bio="Testing Custom User",
            school="Simon Fraser Test",
            minor="Test Minor",
            major="Test Major",
            skills="Test skill",
            interests="Test Interests",
        )

        self.posting = Posting.objects.create(
            title="Test Posting",
            content="This is a test content",
            tags="test, django",
            skills="Python, Django"
        )

    def test_model_CustomUser(self):
        self.assertEqual(self.custom_user.username, 'testuser')
        self.assertEqual(self.custom_user.bio, "Testing Custom User")
        self.assertEqual(self.custom_user.school, "Simon Fraser Test")
        self.assertEqual(self.custom_user.minor, "Test Minor")
        self.assertEqual(self.custom_user.major, "Test Major")
        self.assertEqual(self.custom_user.skills, "Test skill")
        self.assertEqual(self.custom_user.interests, "Test Interests")

    def test_model_Posting(self):
        self.assertEqual(self.posting.title, "Test Posting")
        self.assertEqual(self.posting.content, "This is a test content")
        self.assertEqual(self.posting.tags, "test, django")
        self.assertEqual(self.posting.skills, "Python, Django")

    def test_post_upload(self):
        url = reverse(uploadPost, kwargs={'id': self.custom_user.id})
        data = {
            'title': 'New Posting',
            'content': 'This is a new test post',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, 'Posting uploaded')

    def test_get_all_postings(self):
        url = reverse(getAllPostings)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Posting')

    def test_delete_post(self):
        url = reverse(deletePost, kwargs={'id': self.custom_user.id, 'postID': self.posting.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Posting deleted')

    def test_register_user(self):
        url = reverse('register') 
        data = {
            'username': 'newuser',
            'password': 'newpass123',
            'bio': 'New user bio',
            'school': 'New School',
            'minor': 'New Minor',
            'major': 'New Major',
            'skills': 'New Skills',
            'interests': 'New Interests'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.data)


    def test_register_duplicate_user(self):
        url = reverse('register')  
        data = {
            'username': 'testuser',  
            'password': 'anotherpass123',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'User already exists')

    def test_login_user(self):
        url = reverse('login') 
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.data)

   
    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'wrongpass'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'Invalid username or password')
    

