from django.db import models

# Create your models here.


class Hobby(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class Student(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    department = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    hobby = models.ManyToManyField(Hobby)

    def __str__(self):
        return str(self.name)
