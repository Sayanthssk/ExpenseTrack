# Expense Tracker & Analytics System

## Project Overview
A full-stack expense tracking application using Django (Backend) and React (Frontend).
Currently, the **Backend** infrastructure is being set up.

## Tech Stack
- **Backend:** Django, Django REST Framework (DRF)
- **Authentication:** JWT (via `djangorestframework-simplejwt`)
- **Database:** SQLite (Development)

## Current Progress
### ✅ Backend Setup
- [x] Django Project initialized (`backend`)
- [x] App created (`expenseapp`)
- [x] Dependencies configured:
    - `djangorestframework`
    - `corsheaders` (Middleware configured for React frontend)
    - `simplejwt` (JWT Authentication)
- [x] Database settings verified
- [x] Routing setup:
    - Main `urls.py` includes `expenseapp` URLs.
    - JWT Token endpoints configured at `/api/token/`.

### 🚧  Under Construction
- **Models:** `ExpenseModel` is currently being drafted in `expenseapp/models.py`.
- **API Endpoints:** Detailed views for Login, Registration, and Expenses are pending.

## Setup Instructions (Backend)
1. **Activate Environment:** link `env` (if using virtualenv).
2. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```
3. **Run Server:**
   ```bash
   python manage.py runserver
   ```
