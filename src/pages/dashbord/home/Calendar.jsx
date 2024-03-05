import React from 'react'
import { useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MyCalendar from 'react-calendar'
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs'
const Container = styled.div`
position: relative;
`

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap:.5rem;
  .icon{
    color: white;
    font-size: 2rem;
  }
`
const Today = styled.p`
  color: white;
`
const DateContainer = styled.div`
  position: absolute;
  top:40px;
  right: 10px;
`
const Calendar = () => {
     const [value, onChange] = useState(new Date());
     const [show, setShow] = useState(false);
  return (
    <Container>
      <ControlContainer>
        <Today> {value.toISOString()} </Today>
        <IconButton onClick={()=> setShow(prev => !prev)} >
          <DateRangeIcon className='icon' />
        </IconButton>
      </ControlContainer>
      {
        show && <DateContainer>
          <MyCalendar onChange={onChange} value={value} />

        </DateContainer>
        }
    </Container>
  )
}

export default Calendar