from rest_framework import serializers
from expenseapp.models import *
from django.contrib.auth.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save() 
        return user

class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseModel
        fields = '__all__'
        read_only_fields = ['USER', 'created_at', 'updated_at']