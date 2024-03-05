import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import visa from '../../assets/visa.png'
import mpesa from '../../assets/mpesa.png'
import paypal from '../../assets/paypal.png'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PayWithCardButton from './PayWithCardButton';
const Container = styled.div`
    padding: 1rem;
    width: 100%;
    max-width: 600px;
    margin:0 auto;
    display: flex;
    flex-direction: column;
    gap:.5rem;
`

const TitleWrapper = styled.div`
display: flex;
align-items: center;
gap:.5rem;
`
const Title = styled.h1` 
flex:1;
text-transform: capitalize;
color: #000000d3;
font-size: 1.8rem;
`
const TitleDescription = styled.p`
color: #a7a7a7d2;
font-size:1rem;
`
const PaymentMethodWrapper = styled.div`
display: flex;
gap:.5rem;
`
const PaymentMethod = styled.div`
flex: 1;
.wrapper{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex:1;
    .container {
        border: 1px solid green;

    }
}
`
const PaymentMethodDescription = styled.div``
const InputWrapper = styled.div`
display: flex;
align-items: center;
flex:1;
gap:1rem;
padding:.5rem;
border-radius:.5rem;
justify-content: space-between;
outline: 1px dotted black;
border: none;
&.active{
    outline: 1px ridge green;
}
:not(.active):hover{
    outline: 1px ridge skyblue;
}
`
const Image = styled.img`
max-height: 50px;
width: auto;
object-fit: contain;
`
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
const PaymentTypes = ({paymentType,setPaymentType,setPayment,pay}) => {
    const [index,setIndex] = useState(0);
    const handleClick = (index,type)=>{
        setIndex(index);
        setPaymentType(type)
    }
    useEffect(()=>{
         document.querySelectorAll('.type').forEach((item,itemIndex) =>{
            if(item.classList.contains('active')){
                item.classList.remove('active')
            }
            if(index === itemIndex){
                
                item.classList.add('active')
            }
         })

    },[index])
  return (
    <Container>
        <TitleWrapper>
            <Title>Payment method</Title>
            <TitleDescription>Choose the best payment method</TitleDescription>
        </TitleWrapper>
        <PaymentMethodWrapper>
            <PaymentMethod>
                <RadioGroup className='wrapper' >
                    <InputWrapper className='type' onClick={e=> handleClick(0,'card')}>
                    <FormControlLabel control={<Radio sx={
          {color:'#27272F', '&.Mui-checked':{color:'#5B3901'}}} />} checked = {paymentType === 'card'} label ='Credit card' />
          <Image src={visa} alt='pay with credit card'  />
                    </InputWrapper>
                    <InputWrapper className='type' onClick={e=> handleClick(1,'paypal')}>
                    <FormControlLabel control={<Radio sx={
          {color:'#27272F', '&.Mui-checked':{color:'#5B3901'}}} />} checked = {paymentType === 'paypal'} label = 'Paypal' />
          <Image src={paypal} alt='pay with paypal'  />
                    </InputWrapper>
                    <InputWrapper className='type' onClick={e=> handleClick(2,'mpesa')} >
                    <FormControlLabel control={<Radio sx={
          {color:'#27272F', '&.Mui-checked':{color:'#5B3901'}}} />} checked = {paymentType === 'mpesa'} label = 'M-Pesa' />
          <Image src={mpesa} alt='pay with mpesa'  />
                    </InputWrapper>
                </RadioGroup>
            </PaymentMethod>
            <PaymentMethodDescription>

            </PaymentMethodDescription>
        </PaymentMethodWrapper>
        <ButtonWrapper>
             <Button onClick={()=> setPayment(false)} > <KeyboardArrowLeft/> prev</Button>
             { paymentType === 'card' && <PayWithCardButton><Button> Pay with card <KeyboardArrowRight/> </Button></PayWithCardButton> }
             { paymentType === 'mpesa' &&  <Button onClick={pay}  >mpesa <KeyboardArrowRight/> </Button> }
             { paymentType === 'paypal' &&  <Button onClick={pay}  >paypal <KeyboardArrowRight/> </Button> }
             </ButtonWrapper>
    </Container>
  )
}

export default PaymentTypes