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
import Editor from './pages/editor'
import Home from './pages/home'
import SearchPage from './pages/searchPage'
import NotFound from './pages/404'
import Profile from './pages/profile'
import Blog from './pages/blog'

function App() {

    const [user, setUser] = useState(null)
  const dispatch = useDispatch()


  useEffect(() => {
    const user = getSession('user');
    if (user) {
      dispatch(login(JSON.parse(user)));
      setUser(JSON.parse(user));
    } else {
      dispatch(login(null));
    }
  }, []);

  return (
    <>
    <Routes>
      <Route path='/editor' element={<Editor/>}/>
      <Route path='/' element={<Navbar user={user}/>} >
        <Route path='signin' element={<AuthForm page="sign-in"/>}/>
        <Route path='signup' element={<AuthForm page="sign-up"/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='Home' element={<Home/>}/>
        <Route path='profil' element={<Profile/>}/>
        <Route path='search/:query' element={<SearchPage/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='blog/:id' element={<Blog/>}/>
      </Route>
  
    </Routes>
    </>
  )
}

export default App
