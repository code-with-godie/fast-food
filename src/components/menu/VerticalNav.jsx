import React from 'react'
import styled from 'styled-components';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
  display: none;
  padding:.5rem;
  overflow: auto;
  height: 100vh;
  position: sticky;
  top:0;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap:.5rem;
}
`
const VerticalNav = ({nav}) => {
  const {filterProducts,slug} = useAppContext()
  return (
    <Container>
      <RadioGroup>
        <FormControlLabel onClick={e=> filterProducts(e.target.value)} value='all' control={<Radio checked = {slug === 'all'} sx={
          {color:'#27272F', '&.Mui-checked':{color:'#5B3901'}}} />} label ={'All'} />
      {
        nav.map((item,index)=>{
         return  <FormControlLabel key={index} onClick={e=> filterProducts(e.target.value)} value={item} control={<Radio checked = {slug === item} sx={
          {color:'#27272F', '&.Mui-checked':{color:'#5B3901'}}} />} label ={item} />
        })
      }
      </RadioGroup>
       
    </Container>
  )
}

export default VerticalNav