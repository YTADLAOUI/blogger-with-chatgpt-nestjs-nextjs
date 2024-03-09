const storeSession = (key,value) => {
   return localStorage.setItem(key, value)
 }

   const getSession = (key) => {
    return localStorage.getItem(key)
  }

  const removeSession = (key) => {
    return localStorage.removeItem(key)
  }
  const logout = () => {
   sessionStorage.clear()
  }

  const islogin = () => {
    return JSON.parse(getSession('user')).islogin
  }

export {storeSession, getSession, removeSession, logout, islogin}