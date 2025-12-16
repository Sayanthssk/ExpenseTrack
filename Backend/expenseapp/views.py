from django.shortcuts import render
from django.db.models import Sum
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from expenseapp.models import *
from expenseapp.serializers import *

from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()
            res.data = {'success': True}

            res.set_cookie(
                key="access_token",
                value = access_token,
                httponly = True,
                secure = False,
                samesite = 'Lax',
                path = '/'
            )
            res.set_cookie(
                key="refresh_token",
                value = refresh_token,
                httponly = True,
                secure = False,
                samesite = 'Lax',
                path = '/'
            )
            return res
        except :
            return Response({'success': False})


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {'refreshed': False, 'detail': 'Refresh token missing'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        data = request.data.copy()
        data['refresh'] = refresh_token
        request._full_data = data 

        try:
            response = super().post(request, *args, **kwargs)

            access_token = response.data.get('access')

            res = Response({'refreshed': True}, status=status.HTTP_200_OK)

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,     # localhost
                samesite='Lax',
                path='/'
            )

            return res

        except Exception as e:
            return Response(
                {'refreshed': False, 'error': str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )



class ExpenseView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        user = request.user
        expenses = ExpenseModel.objects.filter(USER=user)

        month = request.query_params.get('month')
        year = request.query_params.get('year')

        if month:
            expenses = expenses.filter(date__month=month)
        if year:
            expenses = expenses.filter(date__year=year)
            
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

class ExpenseSummary(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        # Category-wise summary
        category_summary = ExpenseModel.objects.filter(USER=user).values('category').annotate(total=Sum('amount'))
        
        # Total Summary
        total_expense = ExpenseModel.objects.filter(USER=user).aggregate(Sum('amount'))['amount__sum'] or 0
        
        return Response({
            'category_summary': category_summary,
            'total_expense': total_expense
        })



class Logout(APIView):
    def post(self, request):
        try:
            res= Response()
            res.data = {'success': True}
            res.delete_cookie('access_token', path='/', samesite='Lax')
            res.delete_cookie('refresh_token', path='/', samesite='Lax')
            return res
        except:
            return Response({'success': False})


class AuthenticatedView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({'authenticated': True})


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        ser = UserRegistrationSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=201)
        return Response(ser.errors, status=400)

class AddExpense(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        ser = ExpenseSerializer(data=request.data)
        if ser.is_valid():
            ser.save(USER=request.user)
            return Response(ser.data, status=201)
        return Response(ser.errors, status=400)