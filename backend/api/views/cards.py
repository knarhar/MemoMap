from rest_framework.views import APIView

from api.models import Card
from api.serializers import CardSerializer
from api.utlis import success_response, error_response

"""
    Card operation API routes
"""

class CardsView(APIView):
    def get(self, request):
        """
        Get cards by id, category, or all cards.
        """
        card_id = request.query_params.get("id")
        category = request.query_params.get("category")

        if card_id:
            try:
                card = Card.objects.get(id=card_id)
                serializer = CardSerializer(card)
                return success_response(serializer.data)
            except Card.DoesNotExist:
                return error_response(message="Card not found")

        queryset = Card.objects.all()
        if category:
            queryset = queryset.filter(category=category)

        serializer = CardSerializer(queryset, many=True)
        return success_response(serializer.data)

    def post(self, request):
        """
        Create a new card.
        :param request:
        :return:
        """
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data)
        return error_response(serializer.errors)

    def put(self, request):
        """
        Update a card.
        :param request:
        :return:
        """
        id = request.data.get("id")
        if not id:
            return error_response(message="id is required")

        try:
            card = Card.objects.get(id=id)
        except Card.DoesNotExist:
            return error_response(message="Card not found")

        serializer = CardSerializer(instance=card, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)

        return error_response(message=serializer.errors)