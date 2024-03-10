import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: {
    title: '',
    banner: '',
    content: [],
    tags: [],
   des: '',
   author:{
     username: '',
     id: ''
   }
  },
  textEditor:{isReady:false},
  editorState:'editor'
}

export const blogSlice = createSlice({  

  name: 'blog',
  initialState,
  reducers: {
    editBlog: (state, action) => {
      state.value = action.payload
    },
    setTextEditor:(state,action)=> {
      state.textEditor=action.payload
    },
    setEditorState:(state,action)=>{
      state.editorState=action.payload
    } 
  },

})

export const { editBlog,setTextEditor,setEditorState } = blogSlice.actions

export default blogSlice.reducer