from rest_framework import generics
from myapp.models import Product, Category, Brand
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer
from myapp.paginations import SetPagination
from django.db.models import Q
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.

class CustomFilter(django_filters.FilterSet):
    category = django_filters.ModelMultipleChoiceFilter(
        queryset=Category.objects.all(),
        field_name="categories"
    )
    brand = django_filters.ModelMultipleChoiceFilter(
        queryset = Brand.objects.all()
    )

    class Meta:
        model = Product
        fields = []

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = SetPagination
    filter_backends = [
        DjangoFilterBackend, 
        filters.OrderingFilter, 
        filters.SearchFilter
    ]
    filterset_class = CustomFilter
    search_fields = ['name']
    ordering_fields = ['name', 'price']



class ProductUpdateDeleteDetailsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = 'pk'

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('name')

class BrandList(generics.ListAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all().order_by('name')
