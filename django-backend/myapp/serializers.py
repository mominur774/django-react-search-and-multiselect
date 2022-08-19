from turtle import st
from rest_framework import serializers
from myapp.models import Student, Hobby


class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        hobbies = validated_data.pop('hobby', []),
        stu = Student.objects.create(
            ** validated_data
        )
        for hobby in hobbies:
            stu.hobby.set(hobby)
        return stu
