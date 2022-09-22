from django.db import models

# Create your models here.


class Hobby(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Hobby'
        verbose_name_plural = 'Hobbies'


class Student(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    department = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255)
    hobby = models.ManyToManyField(Hobby)

    def __str__(self):
        return str(self.name)

    @property
    def hobby_list(self):
        h = []
        for hb in self.hobby.all():
            h.append(hb.name)
        return h
