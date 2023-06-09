import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'
import Stack from '@mui/material/Stack'
import './dropDown.css'
import { setAvailableTrip } from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { mapAllAirplanes } from '../../common/helpers'
import { ReducerState, SearchData, Flight } from '../../common/interfaces'
import {CustomButton} from '../customButton/customButton'

export default function Dropdown() {
  const availableAirports: Array<string> = ['JFK', 'LAX', 'LGA', 'ORD', 'ATL']
  const dispatch = useDispatch()
  const availableFlights: Flight[] = useSelector((state: ReducerState) => state.mockedData)

  const [formData, setFormData] = useState<SearchData>({
    from: '',
    to: '',
  })

  /**
   * return available air planes in options and filter the other option to remove from it the selected
   * Example: if you select JFK in (to dropdown) this option will not displayed on (from dropdown) 
   * @param targetFilter  string of the other dropdown 
   * @returns {AvailableAirports Array<string>}
   */
  const returnOptions = (targetFilter: string) => {
    const availableAirportsWithoutTargetSelection: Array<string> = availableAirports.filter(airPort => airPort !== formData[targetFilter])
    return availableAirportsWithoutTargetSelection.map(airPort => (<MenuItem key={airPort} value={airPort}>{airPort}</MenuItem>))
  }

  /**
   * 
   * @param event onChange event
   */
  const handleChange = (event: { target: { name: string, value: string } }) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  /**
   * Filter the trips and get all trips with the (From - To) selected options
   */
  const handelSubmit = () => {
    const availableTrips: Flight[] = availableFlights.filter(flight => flight.departureAirport === formData.from && flight.arrivalAirport === formData.to)
    const performAvailableTrips: Record<string, {
      price: number
      flight: Flight[]
    }> = mapAllAirplanes(availableTrips)
    dispatch(setAvailableTrip(performAvailableTrips))
  }


  return (
    <div className='dorpDownMainContainer'>
      <div className='availableFlights'>
        Discover available flights
      </div>
      <div className='dorpDownContainer'>
        <FormControl fullWidth className='margin'>
          <InputLabel id="demo-simple-select-label">From</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.from}
            label="From"
            name="from"
            onChange={handleChange}
          >
            {returnOptions('to')}

          </Select>
        </FormControl>
        <FormControl fullWidth className='margin'>
          <InputLabel id="demo-simple-select-label">To</InputLabel>
          <Select
            name='to'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.to}
            label="To"
            onChange={handleChange}
          >
            {returnOptions('from')}
          </Select>
        </FormControl>
      </div>

      <div className='buttonMainPosition'>

        <Stack direction="row" spacing={2}>
          <CustomButton variant="contained"  endIcon={<SearchIcon />} onClick={handelSubmit}>
            Find
          </CustomButton>

        </Stack>
      </div>
    </div>

  )
}
