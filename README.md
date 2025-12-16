# Odox - Expense Tracker & Analytics System

## Project Overview
Odox is a full-stack expense tracking application designed to help users manage their finances. It features a robust backend using Django and a dynamic frontend built with React. The application allows users to register, log in, add expenses, and visualize their spending habits through interactive charts.

## Features
- **User Authentication:** Secure Registration, Login, and Logout functionality.
- **Expense Management:** Add, view, and list personal expenses.
- **Dashboard Analytics:**
    - Visual breakdown of expenses by category (Pie Chart).
    - Month and Year filtering to analyze spending over time.
    - Real-time summaries of total expenses.
- **Responsive Design:** Built with React and Bootstrap for a seamless experience across devices.

## Tech Stack
### Backend
- **Framework:** Django & Django REST Framework (DRF)
- **Authentication:** JWT (JSON Web Tokens) with `django-rest-framework-simplejwt`
- **Database:** SQLite (Development)
- **Middleware:** `corsheaders` for handling Cross-Origin Resource Sharing.

### Frontend
- **Framework:** React (Vite)
- **Styling:** Bootstrap, React-Bootstrap, Custom CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Visualization:** Recharts (for Dashboard charts)

## Frontend Packages & Token Management
The frontend communicates with the backend APIs using **Axios**. Security is a priority, so we handle authentication tokens using **HttpOnly Cookies** rather than storing them in LocalStorage.

### Key Packages
- `axios`: Used for making HTTP requests to the backend. It is configured with `withCredentials: true` to ensure cookies are sent with requests.
- `react-router-dom`: Manages client-side navigation between the Dashboard, Login, and Register pages.
- `recharts`: Renders the expense summary charts on the dashboard.

### Token Authentication Flow
1. **Login:** When a user logs in, the backend issues an `access` token and a `refresh` token.
2. **Storage:** These tokens are set as **HttpOnly cookies** by the backend. This prevents client-side JavaScript from accessing specific token strings, reducing the risk of XSS attacks.
3. **Requests:** Every API request includes `withCredentials: true`, allowing the browser to automatically attach the cookies.
4. **Token Refresh:**
    - The `api.js` service includes an interceptor/helper logic (`call_refresh`).
    - If a request fails with a `401 Unauthorized` error, the app automatically attempts to refresh the access token using the validation endpoint.
    - If successful, the original request is retried seamlessly.

## Setup Instructions

### Backend
1. Navigate to the `Backend` directory.
2. Activate your virtual environment.
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers djangorestframework-simplejwt django-sslserver
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
