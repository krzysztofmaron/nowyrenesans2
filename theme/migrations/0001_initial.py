# Generated by Django 5.0.8 on 2025-01-04 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PaidMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('renewal_date', models.DateField()),
                ('canceled', models.BooleanField(default=False)),
            ],
        ),
    ]
