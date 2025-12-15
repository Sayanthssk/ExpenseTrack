import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/Pages/LoginPage'
import Dash from './components/Pages/Dash'
import ViewExpence from './components/Pages/ViewExpence'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dash />} />
        <Route path='/view-expence' element={<ViewExpence />} />
      </Routes>
    </>
  )
}

export default App
