import { combineReducers } from 'redux'
import tumeySlice from './tumeySlice'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  taskList: tumeySlice,
})

export default reducer
