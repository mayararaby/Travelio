import { type Flight } from './interfaces'

export const mapAllAirplanes = (flights: Flight[]): Record<string, {
  price: number
  flight: Flight[]
}> => {
  const flightsByAirline: Record<string, {
    price: number
    flight: Flight[]
  }> = {}

  flights.forEach(flight => {
    if (flight.flightTickets === flight.bookedTickets) return

    if (!flightsByAirline[flight.airline]) {
      flightsByAirline[flight.airline] = {
        price: flight.price,
        flight: []
      }
    }

    flightsByAirline[flight.airline].flight.push(flight)
  })

  return flightsByAirline
}

export const mailFormulaValidation = (email: string): { message: string, error: boolean } => {
  if (email === '') return { message: 'Empty field!', error: true }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !emailRegex.test(email) ? { message: 'Not Valid email', error: true } : { message: '', error: false }
}
