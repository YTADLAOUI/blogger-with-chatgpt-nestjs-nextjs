import React from 'react'

const Quote=({quote,caption})=>{
  return(
    <div className='bg-purple/10 p-3 pl-5 border-l-4 border-purple'>
      <p className='text-xl leading-10 md:text-2xl'>{quote}</p>
      { caption ? <p className='w-full text-base text-purple'>{caption}</p> : ""}
    </div>)
}
const List=({style, items})=>{
  return(
   <ol className={`pl-5 ${style=="ordered"? "list-decimal": "list-disc"}`}>
    {
      items.map((item, index)=>{
        return <li key={index} className='my-4'
        dangerouslySetInnerHTML={{__html:item}} ></li>
      })
    }
   </ol>
  )
}
const BlogContent = ({block}) => {
  let {type,data}=block
  
  if(type==='header'){
    if(data.level===3){
      return <h3 dangerouslySetInnerHTML={{__html:data.text}} className='text-3xl font-bold'></h3>
    }
    return <h2 dangerouslySetInnerHTML={{__html:data.text}} className='text-3xl font-bold'></h2>
  }
  else if(type==='paragraph'){
    return <p dangerouslySetInnerHTML={{__html:data.text}}></p>
  }
  else if(type==='quote'){
    return <Quote quote={data.text} caption={data.caption}/>
  }
  else if(type==='list'){
    return <List style={data.style} items={data.items}/>
  }
  
}

export default BlogContent