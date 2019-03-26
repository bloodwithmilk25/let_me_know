from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Object-level permission to only allow owners of an object to
    view, edit, update or delete it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user.id == request.user.id

