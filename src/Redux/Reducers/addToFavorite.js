import { createSlice } from '@reduxjs/toolkit'

export const addToFavorite = createSlice({
  name: 'favorite',
  initialState: { favorite: [] },
  reducers: {
    addTitle: (state, action) => {
      state.favorite = [...state.favorite, ...action.payload]
      return state
    }
  }
})

export const { addTitle } = addToFavorite.actions

// Action creators are generated for each case reducer function
export default addToFavorite.reducer
