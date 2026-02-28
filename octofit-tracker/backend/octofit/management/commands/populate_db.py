from django.core.management.base import BaseCommand
from octofit.models import User, Team, Workout, Activity, Leaderboard
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            Activity.objects.all().delete()
            User.objects.all().delete()
            Team.objects.all().delete()
            Workout.objects.all().delete()
            Leaderboard.objects.all().delete()

            marvel = Team.objects.create(name='Marvel')
            dc = Team.objects.create(name='DC')

            users = [
                User(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
                User(name='Iron Man', email='ironman@marvel.com', team=marvel),
                User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
                User(name='Batman', email='batman@dc.com', team=dc),
            ]
            for user in users:
                user.save()

            workouts = [
                Workout(name='Web Swing', description='Swing through the city',),
                Workout(name='Armor Training', description='Train in Iron Man suit'),
                Workout(name='Amazonian Strength', description='Strength training for Amazons'),
                Workout(name='Gotham Run', description='Run through Gotham'),
            ]
            for workout in workouts:
                workout.save()
                workout.suggested_for.set([marvel, dc])

            Activity.objects.create(user=users[0], workout=workouts[0], duration_minutes=30)
            Activity.objects.create(user=users[1], workout=workouts[1], duration_minutes=45)
            Activity.objects.create(user=users[2], workout=workouts[2], duration_minutes=60)
            Activity.objects.create(user=users[3], workout=workouts[3], duration_minutes=50)

            Leaderboard.objects.create(team=marvel, points=75)
            Leaderboard.objects.create(team=dc, points=110)

        self.stdout.write(self.style.SUCCESS('Database populated with superhero test data.'))
