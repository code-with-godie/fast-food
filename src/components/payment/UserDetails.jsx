import React  from 'react'
import styled from 'styled-components';
import { MenuItem, TextField } from '@mui/material'
import ContinueControls from './ContinueControls';
const Container = styled.div`
    padding:.5rem;
    input{
        /* border:1px solid #cacaca; */
        border-color: #cacaca;
        color: #000000de;         
    }
`
const Title = styled.p`
    padding: 1rem;
    border-bottom: 1px solid #b8b7b7;
    text-transform: uppercase;
    font-size:1.2rem;
`
const Form = styled.form`
padding: 0.5rem;
    border-bottom: 1px solid #b8b7b7;


`

const InputWrapper = styled.div`
padding:.5rem;
display: flex;
gap:.5rem;
justify-content: space-around;
&:first-child{
    *{
        flex: 1;
    }
}
&:nth-child(3),
&:nth-child(4){
    *{
        flex: 1;
    }
}
`
const PhoneWrapper = styled.div`
flex: 1;
display: flex;
align-items: center;
gap:.5rem;
input{
    flex: 1;
}
`
const PhonePrefixContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
`
const PhoneLabel = styled.p``
const UserDetails = ({handleChange,user,payment,setPayment}) => {
  

    const regions = [
  {
    value: 'central',
    label: 'Central',
  },
  {
    value: 'nyanza',
    label: 'nyanza',
  },
  {
    value: 'western',
    label: 'western',
  },
  {
    value: 'coast',
    label: 'coast',
  },
];
    const ceties = [
  {
    value: 'Nairobi',
    label: 'Nairobi',
  },
  {
    value: 'mombasa',
    label: 'mombasa',
  },
  {
    value: 'kisumu',
    label: 'kisumu',
  },
  {
    value: 'nakuru',
    label: 'nakuru',
  },
];

  return (
    <Container>
        <Title>User Address</Title>
        <Form>
            <InputWrapper>
            <TextField
            label = 'first name'
            value={user.firstName}
            onChange={handleChange}
            helperText="Enter your first name"
            id='firstName'
            name='firstName'
            />
            <TextField
            helperText="Enter your last name"
            value={user.lastName}
            onChange={handleChange}
            id='lastName'
            name='lastName'
            label = 'last name'
             />
            </InputWrapper>
            <InputWrapper>
            <PhoneWrapper>
                 <PhonePrefixContainer>
                <PhoneLabel>Prefix</PhoneLabel>
                <PhoneLabel>+254</PhoneLabel>
            </PhonePrefixContainer>
            <TextField
            label = 'phone number'
            type='number'
            name='phone'
            value={user.phone}
             disabled = {user.phone?.length >=9}
            onChange={handleChange}
             />
            </PhoneWrapper>
             <PhoneWrapper>
             <PhonePrefixContainer>
                <PhoneLabel>Prefix</PhoneLabel>
                <PhoneLabel>+254</PhoneLabel>
            </PhonePrefixContainer>
            <TextField
            label = 'additonal phone number'
              type='number'
            name='addPhone'
            disabled = {user.addPhone?.length >=9}
            value={user.addPhone}
            onChange={handleChange}
             />

             </PhoneWrapper>
            </InputWrapper>
             <InputWrapper>
               <TextField
          id="region"
          select
          label="Region"
          defaultValue="central"
          helperText="Please select your region"
        >
             {regions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
                 <TextField
          id="city"
          select
          label="City"
          defaultValue="Nairobi"
          helperText="Please select your city"
        >
             {ceties.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
             </InputWrapper>
        </Form>
        <ContinueControls payment={payment} setPayment = {setPayment}  />
    </Container>
  )
}

export default UserDetails