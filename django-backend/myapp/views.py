from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from myapp.models import Student, Hobby
from .serializers import HobbySerializer, StudentSerializer
from myapp.paginations import SetPagination
from django.db.models import Q

# Create your views here.


class CreateStudent(CreateAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class StudentList(ListAPIView):
    serializer_class = StudentSerializer
    pagination_class = SetPagination

    def get_queryset(self):
        params = self.request.query_params
        if params.getlist('search'):
            return Student.objects.filter(
                Q(name__icontains=params.getlist('search')[0]) |
                Q(department__icontains=params.getlist('search')[0])
            ).order_by('name')
        if params.getlist('hobby'):
            return Student.objects.filter(hobby__in=params.getlist('hobby')).order_by('name')
        elif params.getlist('hobby[]'):
            students = []
            stu = Student.objects.filter(
                hobby__in=params.getlist('hobby[]')).order_by('name')
            for st in stu:
                if st not in students:
                    students.append(st)
            return students
        else:
            return Student.objects.all().order_by('name')


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
    queryset = Hobby.objects.all().order_by('name')
