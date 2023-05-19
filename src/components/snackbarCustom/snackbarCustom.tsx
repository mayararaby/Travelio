import React  from 'react'
import Snackbar from '@mui/material/Snackbar';
import {SnackbarCustomProps} from './interface'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function SnackbarCustom(props:SnackbarCustomProps) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  type AlertStatue = 'error' | 'warning' | 'info' | 'success' | undefined;

  return (
    <Snackbar
    open={props.open}
    autoHideDuration={6000}
    onClose={handleClose} 
  >
    <Alert onClose={handleClose}  severity={props.statue as AlertStatue}>{props.message} </Alert>
  </Snackbar>
  )
}
