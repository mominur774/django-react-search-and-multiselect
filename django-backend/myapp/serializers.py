from rest_framework import serializers
from myapp.models import Category, Product, Brand


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_list = serializers.SerializerMethodField()
    brand_name = serializers.SerializerMethodField()

    def get_category_list(self, obj):
        return [category.name for category in obj.categories.all()]

    def get_brand_name(self, obj):
        return obj.brand.name
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        product = Product.objects.create(
            ** validated_data
        )
        product.categories.set(categories)
        return product
