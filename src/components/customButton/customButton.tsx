import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'

export const CustomButton = styled(Button)({
  backgroundColor:'#f39c12',
  color:'#fff',
  '&:hover':{
    backgroundColor:'#b4750e',
  }
}) as typeof Button;


