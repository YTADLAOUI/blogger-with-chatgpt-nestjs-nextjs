import axios from 'axios';
import React, { useEffect, useState } from 'react'

const dashbord = () => {
  const [data,setData]=useState('')


  return (
    <div>dashbord {data}</div>
  )
}

export default dashbord