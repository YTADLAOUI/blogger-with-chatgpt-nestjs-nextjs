import axios from "axios";

export const handleTokenRefresh = async () => {
  try {
    const refreshResponse = await axios.post('http://localhost:3000/api/refresh',{},{withCredentials: true});
    const newAccessToken = refreshResponse.data.token;
    console.log(newAccessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};