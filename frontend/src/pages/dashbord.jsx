import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { storeSession } from '../common/session';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'


const dashbord = () => {
  const [data, setData] = useState('');
  const [pass, setPass] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        console.log(response.data);
          console.log(response.data);
          if(response.status === 200){
          storeSession('user', JSON.stringify({...response.data, islogin:true}));
          
          dispatch(login(response.data));
          }
      } catch (error) {
        // console.log(error.response.status)
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
      // if (pass) { 
      //   return children
      // } 
      // else {
      //   return <Navigate to="/signin" />;
      // }
    })();
  }, []);

  const handleTokenRefresh = async () => {
    try {
      const refreshResponse = await axios.post('http://localhost:3000/api/refresh',{},{withCredentials: true});
      const newAccessToken = refreshResponse.data.token;
      console.log(newAccessToken,'gg');
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };
  return (
    <div>dashboard
      hhhhhhhhhhhhhh
    </div>
  )
}

export default dashbord