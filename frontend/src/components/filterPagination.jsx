import axios from 'axios'
import React from 'react'
 
export const filterPagination = async({creation_new_arr=false,state,data,page,counteRoute,data_to_send={}}) => {

  let obj

  if(state!=null && !creation_new_arr){
   
    obj = {...state, results:[...state.results, ...data], page:page}
  }else {
      console.log(counteRoute, "counteRoute")
    await axios.post('http://localhost:3000/api'+counteRoute, data_to_send, {
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,
      }   
    }).then(({data:{totalDocs}})=>{
      obj = {results:data, page:page, totalDocs}
    }).catch((error)=>{
      console.error(error)
    })
  }
  // console.log(obj,'objttt')
  return  obj
}

