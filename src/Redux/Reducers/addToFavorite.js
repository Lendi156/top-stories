import { createSlice } from '@reduxjs/toolkit'

export const addToFavorite = createSlice({
  name: 'favorite',
  initialState: { favorite: '', favoriteId: 0 },
  reducers: {
    addTitle: (state, action) => {
      state.favorite = action.payload.title
      state.favoriteId = action.payload.id
      return state
    }
  }
})

export const { addTitle } = addToFavorite.actions

// Action creators are generated for each case reducer function
export default addToFavorite.reducer
