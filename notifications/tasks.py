import logging
from user_api.celery import app
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import Notification


@app.task
def send_notification(notf_id):
    try:
        notification = Notification.objects.get(id=notf_id)
        mail_subject = 'Your notification.'
        message = render_to_string('notify.html', {
            'title': notification.title,
            'content': notification.content
        })
        email = notification.user.email
        try:
            send_mail(mail_subject, message, recipient_list=[email], from_email=None)
            Notification.objects.filter(id=notf_id).update(sent=True)
            return 'Email sent'
        except Exception as e:
            logging.warning(f"{e}\nError occurred while sending notification to {email}")
    except Notification.DoesNotExist:
        logging.warning('Notification does not exist anymore')


