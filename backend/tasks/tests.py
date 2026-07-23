from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import Task
import datetime

class TaskModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            status=Task.StatusChoices.PENDING,
            due_date=datetime.date.today(),
            user=self.user
        )

    def test_task_creation(self):
        self.assertEqual(self.task.title, 'Test Task')
        self.assertEqual(self.task.user, self.user)
        self.assertEqual(str(self.task), 'Test Task')

class TaskAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.task = Task.objects.create(
            title='Existing Task',
            due_date=datetime.date.today(),
            user=self.user
        )

    def test_get_tasks(self):
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_create_task(self):
        url = reverse('task-list')
        data = {
            'title': 'New Task',
            'description': 'Description',
            'status': 'PENDING',
            'due_date': datetime.date.today() + datetime.timedelta(days=1)
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)

    def test_create_task_past_due_date(self):
        url = reverse('task-list')
        data = {
            'title': 'New Task',
            'due_date': datetime.date.today() - datetime.timedelta(days=1)
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('due_date', response.data)
