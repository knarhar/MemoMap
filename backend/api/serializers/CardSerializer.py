from rest_framework import serializers
from ..models import Card, Category

class   CardSerializer(serializers.ModelSerializer):
    categories = serializers.ListField(
        child=serializers.CharField(), write_only=True
    )
    categories_names = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Card
        fields = ["id", "title", "description", "categories", "categories_names", 'created']

    def get_categories_names(self, obj):
        return [c.name for c in obj.category.all()]

    def create(self, validated_data):
        category_names = validated_data.pop("categories", [])
        card = Card.objects.create(**validated_data)

        # Create or update
        categories = []
        for name in category_names:
            category, _ = Category.objects.get_or_create(name=name.title())
            categories.append(category)

        card.category.set(categories)
        return card
