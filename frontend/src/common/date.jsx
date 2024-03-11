let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nove','Dec']
let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
export const getDay=(timestamp)=>{ 
  let date=new Date(timestamp)
  return `
  ${date.getDate()} ${months[date.getMonth()]}`
  
}