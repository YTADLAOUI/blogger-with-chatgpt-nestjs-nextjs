import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: true,

}

export const commentSlice = createSlice({  

  name: 'comment',
  initialState,
  reducers: {
    change: (state) => {
      state.value = !state.value
    },
  },

})

export const {change} = commentSlice.actions

export default commentSlice.reducer