from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class BaseModelViewset(viewsets.ModelViewSet):
    @action(detail=False, methods=["post"])
    def mass_delete(self, request):
        ids = request.data.get("ids", [])
        if not ids or not isinstance(ids, list):
            return Response(
                {"error": "Please provide a list of IDs in 'ids' field."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        queryset = self.get_queryset().filter(id__in=ids)
        deleted_count = queryset.count()

        if deleted_count == 0:
            return Response(
                {"error": "No matching records found to delete."},
                status=status.HTTP_404_NOT_FOUND,
            )
        queryset.delete()

        return Response(
            {"status": f"Deleted {deleted_count} record(s)."},
            status=status.HTTP_204_NO_CONTENT,
        )
