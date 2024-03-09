import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const AuthMidd = ({ children }) => {
  const [data, setData] = useState('');
  const [pass, setPass] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        console.log(response.status);
        if (response.status === 200) {
          console.log(response.data);
          setData(response.data);
          setPass(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await handleTokenRefresh();
          const res = await axios.get('http://localhost:3000/api/user');
          if (res.status === 200) {
            console.log(res.data);
            setData(res.data);
            setPass(true);
          }
        } else {
          console.error('Error fetching user information:', error);
        }
      }
      if (pass) { 
        return children
      } 
      else {
        return <Navigate to="/signin" />;
      }
    })();
  }, []);

  const handleTokenRefresh = async () => {
    try {
      const refreshResponse = await axios.post('http://localhost:3000/api/refresh');
      const newAccessToken = refreshResponse.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };
console.log(pass);
 
};

export default AuthMidd;