import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Calendar from './Calendar';
import Clock from './Clock';
import Box from './Box';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width:900px) {
    align-items: flex-start;
    flex-direction: row;
  }
`
const DaysContainer = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius:.5rem;
`
const MyDays = styled.p`
  color: white;
  text-transform: capitalize;
  font-size: 1.3rem;
  padding:1rem;
  background-color: #11181D;
  cursor: pointer;
  background-color: #262e39d2;
  &.active{
    background-color:  #2f2d2f;
    color: #18d318;
  }
  &:first-child{
    border-top-left-radius:.5rem;
    border-bottom-left-radius:.5rem;

  }
  &:last-child{
    border-top-right-radius:.5rem;
    border-bottom-right-radius:.5rem;

  }
  :not(:last-child){
    border-right: 1px solid white;
  }
`

const Left = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

gap:.5rem;
flex: 1;
`
const Center = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
`
const Right = styled.div`
display: flex;
flex-direction: column;
gap:.5rem;
flex: 1;
align-items: flex-end;
 @media screen and (max-width:768x) {
    align-items: flex-start;
  }

`
const Dates = () => {
  const [index,setIndex] = useState(0);
  // const [value,setValue] = useState('');

  useEffect(()=>{
    const controls = document.querySelectorAll('.days');
    controls.forEach((item,itemIndex) =>{
      if(item.classList.contains('active')){
        item.classList.remove('active');
      }
      if(index === itemIndex){
        item.classList.add('active');
      }
      item.addEventListener('click',()=>{
        setIndex(itemIndex);
      })
    })
  },[index])
  return (
    <Container>
      <Left>
      <DaysContainer>
        <MyDays className = 'days' >today</MyDays>
        <MyDays className = 'days' >week</MyDays>
        <MyDays className = 'days' >month</MyDays>
        <MyDays className = 'days' >year</MyDays>
      </DaysContainer>
      <Box border='#198754' iconBg='#198754' bg='#D1E7DD' title='revenue' />

      </Left>
      <Center>
      <Clock/>
      </Center>
      <Right>
      <Calendar/>
      <Box border='#DC3545' iconBg='#DC3545' bg='#F8D7DA' title='revenue' />
      </Right>
    </Container>
  )
}

export default Dates