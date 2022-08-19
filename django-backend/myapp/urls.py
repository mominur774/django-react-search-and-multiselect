from django.urls import path
from . import views


urlpatterns = [
    path('create-student/', views.CreateStudent.as_view(), name="create-student"),
    path('student-list/', views.StudentList.as_view(), name="student-list"),
    path('hobby-list/', views.HobbyList.as_view(), name="hobby-list"),
    path('retrieve-student/<int:pk>/',
         views.RetrieveStudent.as_view(), name="retrieve-student"),
    path('update-student/<int:pk>/',
         views.UpdateStudent.as_view(), name="update-student"),
    path('delete-student/<int:pk>/',
         views.DeleteStudent.as_view(), name="delete-student"),
]
