import { configureStore } from '@reduxjs/toolkit'
import {
  persistReducer, persistStore
} from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import setIdSlice from './Reducers/setIdSlice'
import addToFavorite from './Reducers/addToFavorite'

const persistConfig = {
  key: 'root',
  storage
}

const reducers = combineReducers({
  storyId: persistReducer(persistConfig, setIdSlice),
  favorite: persistReducer(persistConfig, addToFavorite)
})

const store = configureStore({
  reducer: reducers
})

const persistor = persistStore(store)

export { store, persistor }
