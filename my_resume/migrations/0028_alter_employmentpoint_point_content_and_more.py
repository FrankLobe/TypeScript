# Generated by Django 4.1.13 on 2023-12-04 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_resume', '0027_alter_certification_url_alter_education_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employmentpoint',
            name='point_content',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='experienceparagraph',
            name='paragraph_content',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='pageparagraph',
            name='paragraph_content',
            field=models.TextField(blank=True, default=''),
        ),
    ]