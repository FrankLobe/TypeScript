# Generated by Django 4.2.4 on 2023-09-07 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_resume', '0019_contact_position_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_description', models.FileField(upload_to='job_descriptions')),
            ],
        ),
    ]
