from django.contrib import admin
from myapp.models import Product, Category, Brand

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Brand)
