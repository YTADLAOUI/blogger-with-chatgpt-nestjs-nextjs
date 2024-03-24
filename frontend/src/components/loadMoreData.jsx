import React, { useEffect } from 'react'

const loadMoreData = ({state,fetchData}) => {
 
  console.log(state?.results.length,"resultat", state?.totalDocs, "docs")
  if(state!=null && state.totalDocs > state.results.length && state.results.length >= 5){
  return (
    <button className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2' onClick={()=>fetchData({page:state?.page +1,creation_new_arr:false} )}>Load More Data</button>
  )
}
}

export default loadMoreData