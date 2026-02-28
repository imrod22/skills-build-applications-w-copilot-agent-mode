from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('octofit', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            """
            CREATE UNIQUE INDEX IF NOT EXISTS user_email_unique_idx ON octofit_user(email);
            """,
            """
            DROP INDEX IF EXISTS user_email_unique_idx;
            """
        ),
    ]