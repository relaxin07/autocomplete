import { combineReducers } from 'redux'
import autoCompleteSlice from './modules/autocomplete'

const rootReducer = combineReducers({
  autoComplete: autoCompleteSlice.reducer,
})

export default rootReducer
