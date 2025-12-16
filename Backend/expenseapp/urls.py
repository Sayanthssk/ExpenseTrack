from django.urls import path
from expenseapp.views import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('expenses/', ExpenseView.as_view()),
    path('logout/', Logout.as_view()),
    path('authenticated/', AuthenticatedView.as_view()),
    path('register/', RegisterView.as_view()),
    path('add-expense/', AddExpense.as_view()),
    path('expense-summary/', ExpenseSummary.as_view()),
]