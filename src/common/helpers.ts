import { type Flight } from './interfaces'

/**
 * mapping all flights in the same air plane
 * @param {Flight[]} flights available flights
 * @returns {Record<string, {price: number,flight: Flight[]}>} flightsByAirline  
 */
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

/**
 * check if the email is a valid email 
 * @param {string} email 
 * @returns  { message: string, error: boolean } if not a valid email will display a message  based on error  
 */
export const mailFormulaValidation = (email: string): { message: string, error: boolean } => {
  if (email === '') return { message: 'Empty field!', error: true }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !emailRegex.test(email) ? { message: 'Not Valid email', error: true } : { message: '', error: false }
}

/**
 * change date string to formatted date easy to user to got it 
 * @param dateString 
 * @returns {date} formatted date
 */
export const covertToTimeString = (dateString: string) => {
  const date: Date = new Date(dateString);
  return date.toISOString().replace("T", " ").replace(/\.\d{3}Z/, "");
}