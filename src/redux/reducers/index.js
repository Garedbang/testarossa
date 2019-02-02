import { combineReducers } from 'redux'
import favoritesReducer from './favoritesReducer'
import popularReducer from './popularReducer'
import movieReducer from './movieReducer'
import searchReducer from './searchReducer'

export default combineReducers({
  favoritesReducer,
  popularReducer,
  movieReducer,
  searchReducer
})
