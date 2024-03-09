import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './pages/authForm'
import Dashbord from './pages/dashbord'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route path='signin' element={<AuthForm page="sign-in"/>}/>
        <Route path='signup' element={<AuthForm page="sign-up"/>}/>
        <Route path='/dashbord' element={<Dashbord/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
