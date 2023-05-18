import * as ActionTypes from '../actions/index'
import { type ReducerState } from '../../common/interfaces'

const initialState: ReducerState = {
  mockedData: [],
  selectedFlight: {},
  availableTrips: [],
  userInfo: {
    formData: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      tickets: 1
    },
    nextStep: false
  }
}

export const flights = (state = initialState, action:{type:string,payload:any}) => {
  switch (action.type) {
    case ActionTypes.GET_MOCKED_DATA:
      return {
        ...state,
        mockedData: action.payload
      }
    case ActionTypes.SELECTED_TRIP:
      return {
        ...state,
        selectedFlight: action.payload
      }
    case ActionTypes.USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }

    case ActionTypes.AVAILABLE_TRIPS:
      return {
        ...state,
        availableTrips: action.payload
      }

    default:
      return state
  }
}
