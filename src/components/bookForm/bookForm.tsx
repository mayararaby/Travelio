import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './bookForm.css'
import FirstStep from './steps/firstStep';
import { useSelector } from "react-redux";
import { BookFormProps } from './steps/interfaces';
import { ReducerState } from '../../common/interfaces';
import SecondStep from './steps/secondStep'
import ThirdStep from './steps/thirdStep'
import SnackbarCustom from '../snackbarCustom/snackbarCustom';

export default function BookForm(props: BookFormProps) {


  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false);

  const steps: string[] = ['Select Departure Time ', 'Personal Information', 'Preview'];

  const selectedFlight = useSelector((state: ReducerState) => state.selectedFlight)
  const userInfo = useSelector((state: ReducerState) => state.userInfo)

  useEffect(() => {
    selectedFlight.id !== 0 && setActiveStepIndex(1)
    userInfo.nextStep && setActiveStepIndex(2)

  }, [userInfo, selectedFlight])

  return (
    <>
      <Box className='stepsContainer' sx={{ width: '100%' }}>
        <Stepper activeStep={activeStepIndex} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {
        activeStepIndex === 0 && <FirstStep selectedFlight={selectedFlight} {...props} />
      }
      {
        activeStepIndex === 1 && selectedFlight.id !== 0 && <SecondStep userInfo={userInfo} selectedFlight={selectedFlight} {...props} />
      }
      {
        activeStepIndex === 2 && <ThirdStep selectedFlight={selectedFlight} {...props} userInfo={userInfo} />
      }
      <SnackbarCustom statue='error' message={"Please complete the current step"} open={open} setOpen={setOpen} />

    </>
  )
}
