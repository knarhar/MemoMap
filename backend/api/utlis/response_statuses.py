from rest_framework import status
from rest_framework.response import Response

def success_response(data=None, message="Operation successful", status_code=status.HTTP_200_OK):
    """
    Utility function for success responses
    """
    return Response({
        "status_code": status_code,
        "status": "ok",
        "message": message,
        "payload": data
    }, status=status_code)

def error_response(message="An error occurred", error_data=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Utility function for error responses
    """
    return Response({
        "status_code": status_code,
        "status": "error",
        "message": message,
        "payload": error_data
    }, status=status_code)
