import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem ,SelectChangeEvent } from '@mui/material';
import { setSelectedTrip } from '../../../redux/actions/index'
import { useDispatch } from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SnackbarCustom from '../../snackbarCustom/snackbarCustom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {FirstStepProps} from './interfaces'
import { Flight } from '../../../common/interfaces';

export default function FirstStep(props:FirstStepProps) {
  const [departureTime, setDepartureTime] = useState<number>(0);
  const [showSnack, setShowSnack] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>('')

  const { flight } = props.flightInfo.airPlaneDetails
  // const { selectedFlight } = props

  const dispatch = useDispatch();

  /**
   * save selected departure time
   * @param event on change event
   */
  const handleChange = (event:SelectChangeEvent<number>) => {
    setDepartureTime(event.target.value as number)
  }


  /**
   * create select options with available departure times
   * @returns {JSX}
   */
  const returnOptions = () => {
    return flight.map((oneFlight) => {
      return (
        <MenuItem key={oneFlight.id} value={oneFlight.id as number}>
          {oneFlight.departureTime}
        </MenuItem>
      );
    });
  };


  /**
   * get the next step and display snackbar if user try to get the next step before select time
   * @returns {Void}
   */
  const handelNext = () => {
    if (!departureTime) {
      setSnackMessage('Please choose departure time')
      setShowSnack(true)
      return ;
    }

    const getSelectedTrip:Flight|undefined  = flight.find(trip=>trip.id === departureTime)
    getSelectedTrip&&dispatch(setSelectedTrip(getSelectedTrip));
  }
  return (
    <>
      <div className='selectedDepartureTime'>
        <FormControl fullWidth className=''>
          <InputLabel id="demo-simple-select-label">Departure Time</InputLabel>
          <Select
            placeholder="Departure Time"
            className=''
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={departureTime}
            label="Departure Time"
            name="departureTime"
            onChange={handleChange}
          >
            {returnOptions()}
          </Select>
        </FormControl>

      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" endIcon={<CheckCircleIcon />} onClick={handelNext}>
            Next
          </Button>
        </Stack>
        {showSnack && <SnackbarCustom statue='error' open={showSnack} setOpen={setShowSnack} message={snackMessage} />}
      </div>
    </>
  )
}
