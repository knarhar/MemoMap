from rest_framework.views import APIView

from api.models import Category
from api.serializers import CategorySerializer
from api.utlis import success_response, error_response

class CategoryView(APIView):
    serializer_class = CategorySerializer

    def get(self, request):
        category_id = request.query_params.get('id')

        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                serializer = CategorySerializer(category)
                return success_response(serializer.data)
            except Category.DoesNotExist:
                return error_response(message="Category not found")


        categories = Category.objects.all().values_list("name", flat=True)
        return success_response(data=list(categories))

    def post(self, request):
        """
        Create a new category.
        :param request:
        :return:
        """
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return error_response(message=serializer.errors)

    def put(self, request):
        """
        Update a category
        :param request:
        :return:
        """
        category_id = request.data.get('id')
        if not category_id:
            return error_response(message="ID is required for update")

        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return error_response(message="Category not found")

        serializer = CategorySerializer(instance=category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)

        return error_response(message=serializer.errors)

class CategorySuggestView(APIView):
    serializer_class = CategorySerializer
    def get(self, request):
        """
        Getting Category Suggestion
        :param request:
        :return:
        """
        query = request.query_params.get("q", "")
        categories = Category.objects.filter(name__icontains=query).values_list("name", flat=True)
        return success_response(data=categories)