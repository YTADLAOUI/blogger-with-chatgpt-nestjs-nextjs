import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getSession } from '../common/session';
import { useDispatch } from 'react-redux';

const AuthMidd = ({ children }) => {

  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    const user = getSession('user');
    if (user) {
      dispatch(login(JSON.parse(user)));
      setUser(JSON.parse(user).isLogin);
    } else {
      dispatch(login(null));
    }
  }, []);
      if (user) { 
        return children
      } 
      else {
      return window.location.href = '/signin'
      }
};

export default AuthMidd;