from django.contrib import admin
from .models import Notification


def set_sent_to_true(modeladmin, request, queryset):
    queryset.update(sent=True)
set_sent_to_true.short_description = 'Mark as sent'


def set_sent_to_false(modeladmin, request, queryset):
    queryset.update(sent=False)
set_sent_to_false.short_description = 'Mark as unsent'


class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'notify_on', 'sent')
    list_filter = ('sent', 'notify_on', 'user')
    search_fields = ('user', 'title')
    ordering = ('-date_created',)
    actions = [set_sent_to_true, set_sent_to_false]

    fieldsets = (
        (None, {'fields': ('title', 'content', 'user', 'celery_task_id', 'notify_on')}),
    )


admin.site.register(Notification, NotificationAdmin)
