from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from myapp.models import Student, Hobby
from .serializers import HobbySerializer, StudentSerializer

# Create your views here.


class CreateStudent(CreateAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class StudentList(ListAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class RetrieveStudent(RetrieveAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    lookup_field = 'pk'


class UpdateStudent(UpdateAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    lookup_field = 'pk'


class DeleteStudent(DestroyAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    lookup_field = 'pk'


class HobbyList(ListAPIView):
    serializer_class = HobbySerializer
    queryset = Hobby.objects.all()
