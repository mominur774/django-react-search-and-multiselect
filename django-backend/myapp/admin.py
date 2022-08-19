from django.contrib import admin
from myapp.models import Student, Hobby

# Register your models here.

admin.site.register(Hobby)
admin.site.register(Student)
