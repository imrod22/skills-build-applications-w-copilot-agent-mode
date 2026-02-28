
from rest_framework.test import APITestCase
from django.urls import reverse

class APIRootTest(APITestCase):
	def test_api_root(self):
		url = reverse('api-root')
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertIn('users', response.data)

class UsersEndpointTest(APITestCase):
	def test_users_list(self):
		url = '/api/users/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

class TeamsEndpointTest(APITestCase):
	def test_teams_list(self):
		url = '/api/teams/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

class WorkoutsEndpointTest(APITestCase):
	def test_workouts_list(self):
		url = '/api/workouts/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

class ActivitiesEndpointTest(APITestCase):
	def test_activities_list(self):
		url = '/api/activities/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

class LeaderboardEndpointTest(APITestCase):
	def test_leaderboard_list(self):
		url = '/api/leaderboard/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
