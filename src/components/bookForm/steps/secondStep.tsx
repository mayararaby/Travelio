import React, { useEffect, useState ,ChangeEvent  } from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch} from "react-redux";
import SnackbarCustom from '../../snackbarCustom/snackbarCustom';
import { mailFormulaValidation } from '../../../common/helpers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {setUserInfo} from '../../../redux/actions/index'
import { SecondStepProps ,FormData } from './interfaces';
import { Flight , UserInfo } from '../../../common/interfaces';
export default function SecondStep(props:SecondStepProps) {
  const {selectedFlight, userInfo}: {selectedFlight:Flight ,  userInfo :UserInfo} = props

  const { flightTickets, bookedTickets } :{ flightTickets:number, bookedTickets:number }  = selectedFlight
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    tickets: 1,
    departureTime: selectedFlight.departureTime,
  });

  
  const [showSnack, setShowSnack] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState <string>('')

  const dispatch = useDispatch();
  /**
   * save form and check on available tickets
   * @param event onChange event
   * @returns {void}
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "tickets" && parseInt(value) > flightTickets - bookedTickets) {
      setSnackMessage(`There is available only ${flightTickets - bookedTickets} tickets`)
      setShowSnack(true)
      return;
    }
    setFormData({ ...formData, [name]: value.trim() });
  };

  /**
   * get the next step
   * @returns {void}
   */
  const handelSubmit = () => {
    if(!validateFields(formData)){
      setSnackMessage('Please complete all required fields')
      setShowSnack(true)
      return
    }
    dispatch(setUserInfo({formData,nextStep:true}))
  }

  /**
   * check if user enter all fields values
   * @param {FormData} formData user main information 
   * @returns {boolean}
   */
  const validateFields =(formData:FormData)=>{
    const {firstName, lastName ,email,mobileNumber} = formData
    if (firstName==='' || lastName==='' || mobileNumber==='' ||mailFormulaValidation(email).error) return false
    return true
  }

  return (
    <>
      <div className='bookInfo'>
        <TextField className='bookInfoInlineInput'
          error={formData.firstName === ""}
          helperText={formData.firstName === "" ? 'Empty field!' : ' '}
          onChange={handleChange} name='firstName'
          value={formData.firstName}
          id="outlined-basic" label="First Name *" variant="outlined" />
      </div>
      <div className='bookInfo'>

        <TextField className='bookInfoInlineInput'
          error={formData.lastName === ""}
          helperText={formData.lastName === "" ? 'Empty field!' : ' '}
          onChange={handleChange} name='lastName' value={formData.lastName}
          id="outlined-basic" label="Second Name *"
          variant="outlined" />
      </div>
      <div className='bookInfo'>
        <TextField
          error={formData.mobileNumber === ""}
          helperText={formData.mobileNumber === "" ? 'Empty field!' : ' '}
          onChange={handleChange} name='mobileNumber'
          type="number" value={formData.mobileNumber}
          className="bookInfoInlineInput" id="outlined-basic"
          label="Mobile Number *" variant="outlined" />
      </div>
      <div className='bookInfo'>
        <TextField
          error={mailFormulaValidation(formData.email).error}
          helperText={mailFormulaValidation(formData.email).message}
          onChange={handleChange} name='email' type="email" value={formData.email}
          className="bookInfoInlineInput" id="outlined-basic" label="Email *"
          variant="outlined" />
      </div>

      <div className='bookInfo'>
        <TextField onChange={handleChange}
          error={formData.tickets > flightTickets - bookedTickets}
          helperText={formData.tickets> flightTickets - bookedTickets ? 'Empty field!' : ' '}
          name='tickets' type="number" value={formData.tickets}
          className="bookInfoInlineInput" id="outlined-basic"
          label="Number of tickets *" variant="outlined" />
      </div>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" endIcon={<HowToRegIcon />} onClick={handelSubmit}>
          Next
        </Button>
      </Stack>
      {showSnack && <SnackbarCustom statue='error' open={showSnack} setOpen={setShowSnack} message={snackMessage} />}
    </>
  )
}
