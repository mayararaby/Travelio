import { configureStore } from '@reduxjs/toolkit'
import {flights} from '../reducer/index'

export default configureStore({
  reducer: flights,
})