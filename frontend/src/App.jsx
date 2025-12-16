import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/Pages/LoginPage'
import Dash from './components/Pages/Dash'
import ViewExpence from './components/Pages/ViewExpence'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { AuthProvider } from './components/contexts/useAuth'
import Register from './components/Pages/Register'

function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<PrivateRoute><Dash /></PrivateRoute>} />
        <Route path='/view-expence' element={<PrivateRoute><ViewExpence /></PrivateRoute>} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
