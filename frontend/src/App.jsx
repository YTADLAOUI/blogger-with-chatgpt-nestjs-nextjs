import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './pages/authForm'
import Dashboard from './pages/dashbord'
import AuthMidd from './middlewares/authMidd'
import { useDispatch } from 'react-redux'
import { login } from './features/authSlice'
import { getSession } from './common/session'

function App() {

    const [user, setUser] = useState(null)
  const dispatch = useDispatch()


  useEffect(() => {
    const user = getSession('user');
    console.log(user, 'appccccc');

    if (user) {
      dispatch(login(JSON.parse(user)));
      setUser(JSON.parse(user));
    } else {
      dispatch(login(null));
    }
  });

  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar user={user}/>}>
        <Route path='signin' element={<AuthForm page="sign-in"/>}/>
        <Route path='signup' element={<AuthForm page="sign-up"/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
