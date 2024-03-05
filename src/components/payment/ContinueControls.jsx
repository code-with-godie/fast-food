import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap:.5rem;
    padding: 1rem;
`
const Button = styled.button`
   border: none;
   outline: none;
   background: transparent;
   font-size: 1rem;
   background-color: #2E3333;
   color: white;
   font-weight: bold;
   text-transform: capitalize;
   padding:.5rem 1rem;
   border-radius:.5rem;
   cursor: pointer;
   display: flex;
   align-items: center;
   &:disabled{
    cursor: not-allowed;
    background-color: #dedede;
   }

`
const ContinueControls = ({setPayment,payment}) => {
    const navigate = useNavigate();
  return (
         <ButtonWrapper>
             <Button onClick={()=> payment ? setPayment(false): navigate('/cart')}> <KeyboardArrowLeft/> prev</Button>
             <Button  onClick={ ()=> setPayment(true)} >next <KeyboardArrowRight/> </Button>
             </ButtonWrapper>
    
  )
}

export default ContinueControls