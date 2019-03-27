from __future__ import absolute_import
import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_api.settings')

from django.conf import settings

app = Celery('user_api', broker=settings.CELERY_BROKER_URL, backend=settings.CELERY_BROKER_URL)
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(settings.INSTALLED_APPS)

if __name__ == '__main__':
    app.start()

# celery -A user_api worker -l info
