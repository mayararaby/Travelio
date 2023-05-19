import { Flight ,UserInfo } from "../../common/interfaces"
export const GET_MOCKED_DATA: string = "GET_MOCKED_DATA"
export const SELECTED_TRIP: string = "SELECTED_TRIP"
export const AVAILABLE_TRIPS: string = "AVAILABLE_TRIPS" 
export const USER_INFO: string ="USER_INFO"

export const setMockedData = (payload:Flight[]) => ({
  type: GET_MOCKED_DATA,
  payload
})
export const setUserInfo =  (payload: UserInfo) => ({
  type: USER_INFO,
  payload
})
export const setSelectedTrip = (payload:Flight) => ({
  type: SELECTED_TRIP,
  payload
})

export const setAvailableTrip = (payload: Record<string, {
  price: number
  flight: Flight[]
}>|[]) => ({
  type: AVAILABLE_TRIPS,
  payload
})