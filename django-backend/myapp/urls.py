from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.ProductListCreateView.as_view(), name="procuts"),
    path('products/<int:pk>/',
         views.ProductUpdateDeleteDetailsView.as_view(), name="product-details"),
    path('category-list/', views.CategoryList.as_view(), name="category-list"),
    path('brand-list/', views.BrandList.as_view(), name="brand-list"),
]
