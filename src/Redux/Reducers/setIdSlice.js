import { createSlice } from '@reduxjs/toolkit'

export const setIdSlice = createSlice({
  name: 'storyId',
  initialState: { id: 0 },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
      return state
    }
  }
})

export const { setId } = setIdSlice.actions

// Action creators are generated for each case reducer function
export default setIdSlice.reducer
