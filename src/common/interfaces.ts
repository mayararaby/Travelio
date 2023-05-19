export interface Flight {
  id: number
  airline: string
  flightNumber: string
  departureAirport: string
  departureTime: string
  arrivalAirport: string
  arrivalTime: string
  price: number
  flightTickets: number
  bookedTickets: number
}

export interface ReducerState {
  mockedData: Flight[]
  selectedFlight: Flight | Record<string, unknown>
  availableTrips: Record<string, {
    price: number
    flight: Flight[]
  }>
  userInfo: {
    formData: {
      firstName: string
      lastName: string
      mobileNumber: string
      email: string
      tickets: number
    }
    nextStep: boolean
  }
}

export interface UserInfo {
  formData:{
    firstName: string
    lastName: string
    mobileNumber: string
    email: string
    tickets: number
  }
  nextStep: boolean
}

export interface SearchData  {
  from: string
  to: string
  [key: string]: string
}