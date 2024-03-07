import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={Navbar}/>
      <Route path='/signin' element={<h1>Sign in page</h1>}/>
      <Route path='/signup' element={<h1>Sing up page</h1>}/>

    </Routes>
    <Navbar />
    </>
  )
}

export default App
