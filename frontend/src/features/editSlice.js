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
}

export const blogSlice = createSlice({  

  name: 'blog',
  initialState,
  reducers: {
    editBlog: (state, action) => {
      state.value = action.payload
    },
  },

})

export const { editBlog } = blogSlice.actions

export default blogSlice.reducer