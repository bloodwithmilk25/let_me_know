# Generated by Django 2.1.7 on 2019-03-25 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0007_auto_20190325_1516'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='sent',
            field=models.BooleanField(default=False),
        ),
    ]
