import logging
from user_api.celery import app
from django.core.mail import send_mail
from django.template.loader import render_to_string


@app.task(bind=True)
def send_notification(self, instance):
    logging.warning(self.request.id)
    try:
        mail_subject = 'Your notification.'
        message = render_to_string('notify.html', {
            'title': instance.title,
            'content': instance.content
        })
        send_mail(mail_subject, message, recipient_list=[instance.user.email], from_email=None)
    except instance.DoesNotExist:
        logging.warning("Notification does not exist anymore")
