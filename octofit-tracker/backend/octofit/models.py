from django.db import models

# Create your models here.
class Team(models.Model):
	name = models.CharField(max_length=100, unique=True)
	def __str__(self):
		return self.name

class User(models.Model):
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
	def __str__(self):
		return self.name

class Workout(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	suggested_for = models.ManyToManyField(Team, blank=True)
	def __str__(self):
		return self.name

class Activity(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
	date = models.DateTimeField(auto_now_add=True)
	duration_minutes = models.PositiveIntegerField()
	def __str__(self):
		return f"{self.user.name} - {self.workout.name}"

class Leaderboard(models.Model):
	team = models.ForeignKey(Team, on_delete=models.CASCADE)
	points = models.PositiveIntegerField(default=0)
	def __str__(self):
		return f"{self.team.name}: {self.points}"
