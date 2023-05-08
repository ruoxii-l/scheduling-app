import { createStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const store = createStore(reducer)

export { store }

// import { configureStore } from '@reduxjs/toolkit'
