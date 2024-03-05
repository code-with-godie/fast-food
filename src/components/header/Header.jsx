import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Badge, Drawer, IconButton } from '@mui/material'
import { DensityMedium, ShoppingCart } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';
import { useSelector } from 'react-redux';
const Container = styled.div`
padding:1rem;
background-color: #000000e1;
display: flex;
align-items: center;
.bar{
  font-size: 2rem;
  color: white;
 
}
.btn{
   @media screen and (min-width: 768px) {
    display: none;
  }
}
`
const Title = styled.h1`
  color: white;
  font-size: 2rem;
  text-transform: capitalize;
  cursor: pointer;
`
const DescriptionContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`
const Description = styled.p`
  color: white;
  font-size:1.5rem;
  text-transform: capitalize;
`
const Custom  = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap:.5rem;
`
const Control = styled.button`
display:flex;
outline: none;
background: transparent;
border: none;
align-items: center;
cursor: pointer;
gap:.5rem;
.icon{
  font-size: 2.5rem;
  color: white;
}
:hover{
  text-decoration: underline;
}
`
const ControlLabel = styled.p`
color: white;
text-transform: capitalize;
font-size: 1.5rem;
`
const Count = styled.div`
color: #1E1E1E;
padding:.3rem .5rem;
background-color: white;
font-size: 1.2rem;
border-radius:50%;
`
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {toggleDrawer,showDrawer} = useAppContext();
    const amount = useSelector(state => state.cart.amount)
    const showCustomNav = location?.pathname === '/menu';
  return (
     <Container>
        <IconButton onClick={toggleDrawer} className='btn' >
        <DensityMedium className='bar' />
        </IconButton>
        <Title onClick={e =>navigate('/') } >fast food</Title>
        {
           showCustomNav ? <Custom>
             <Control onClick={e =>navigate('/cart')} >
              <Badge badgeContent = {<Count> {amount} </Count>} >
              <ShoppingCart className='icon' />

              </Badge>
              <ControlLabel>Cart</ControlLabel>
              </Control>
               <IconButton>
              <Avatar/>
            </IconButton>
           </Custom>:
        <DescriptionContainer>
          <Description>affordable delicacies</Description>
        </DescriptionContainer>
        }
         {
        showDrawer &&
      <Drawer/>
      }
      </Container>
  )
}

export default Header