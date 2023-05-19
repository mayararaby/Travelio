import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { setMockedData, setSelectedTrip, setAvailableTrip, setUserInfo } from '../../../redux/actions/index'
import SnackbarCustom from '../../snackbarCustom/snackbarCustom';
import { useNavigate } from 'react-router-dom';
import { ThirdStepProps } from './interfaces';
import { Flight, ReducerState, UserInfo, UserInfoFormData } from '../../../common/interfaces';

export default function ThirdStep(props: ThirdStepProps) {

  const [showSnack, setShowSnack] = React.useState<boolean>(false)
  const [snackMessage, setSnackMessage] = React.useState<string>('')

  const { selectedFlight, userInfo }: { selectedFlight: Flight, userInfo: UserInfo } = props
  const { firstName, lastName, mobileNumber, email, tickets }: UserInfoFormData = userInfo.formData
  const { price, departureAirport, arrivalAirport, arrivalTime, flightNumber, id, departureTime }: Flight = selectedFlight

  const mockedData = useSelector((state: ReducerState) => state.mockedData)
  const Dispatch = useDispatch()
  const navigate = useNavigate()


  /**
   * if user confirm his reservation will delete the booked trip and navigate back to home and reset stored informations
   */
  const handelConfirmation = () => {
    const flightsAfterConfirmation = mockedData?.map(flight => {
      if (flight.id === id) {
        const availableTickets = Number(flight.bookedTickets) + Number(tickets)
        return {
          ...flight,
          bookedTickets: availableTickets
        }
      }
      return flight
    })

    Dispatch(setMockedData(flightsAfterConfirmation))
    setSnackMessage('Confirmed')
    setShowSnack(true)
    navigateToHome()
  }

  const resetStore = () => {
    Dispatch(setSelectedTrip({
      id: 0,
      airline: '',
      flightNumber: '',
      departureAirport: '',
      departureTime: '',
      arrivalAirport: '',
      arrivalTime: '',
      price: 0,
      flightTickets: 0,
      bookedTickets: 0
    }))
    Dispatch(setAvailableTrip([]))
    Dispatch(setUserInfo({
      formData: {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        tickets: 1
      }, nextStep: false
    }))
  }

  /**
   * navigate back to home 
   */
  const navigateToHome = () => {
    setTimeout(() => {
      navigate('/')
      resetStore()

    }, 1000);
  }
  return (
    <div className='previewInformation'>
      <Card >
        <Box >
          <CardContent >

            <Typography >
              <div className='airPlaneConfirmationContainer'>
                <span className='airPlaneConfirmation'>
                  {departureAirport}
                </span>
                <span>
                  <FlightTakeoffIcon />
                </span>
                <span className='airPlaneConfirmation'>
                  {arrivalAirport}
                </span>
              </div>
            </Typography>

            <hr />

            <Typography>
              <div className="airPlaneConfirmationContainer">
                <span>Name</span>
                <span> {firstName} {lastName} </span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <div className="airPlaneConfirmationContainer">
                <span>Flight Number</span>
                <span>{flightNumber} </span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" >
              <div className="airPlaneConfirmationContainer">
                <span>Email</span>
                <span>{email} </span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" >
              <div className="airPlaneConfirmationContainer">
                <span>Mobile Number</span>
                <span>{mobileNumber} </span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" >
              <div className="airPlaneConfirmationContainer">
                <span>Tickets</span>
                <span>{tickets} </span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" >
              <div className="airPlaneConfirmationContainer">
                <span>Price</span>
                <span className="badgePrice">{`${tickets * price} $`}</span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" >
              <div className="airPlaneConfirmationContainer">
                <span>Arrival Time</span>
                <span>{arrivalTime} </span>
              </div>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <div className="airPlaneConfirmationContainer">
                <span>Departure Time</span>
                <span>{departureTime} </span>
              </div>
            </Typography>
            <div className='confirmButtonContainer'>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handelConfirmation}>
                  Confirm
                </Button>
              </Stack>
            </div>
          </CardContent>
        </Box>
      </Card>

      {showSnack && <SnackbarCustom statue={"success"} open={showSnack} setOpen={setShowSnack} message={snackMessage} />}
    </div>
  );
}