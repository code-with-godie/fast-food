import React from 'react'
import styled from 'styled-components'
import Model from '../model/Model';
import { useAppContext } from '../../context/AppContext';
import {  Handshake, HelpCenter, Home, LocalPizza, Logout,Payment, ShoppingCart} from '@mui/icons-material'
import { Link } from 'react-router-dom';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
    overflow: auto;
    .link{
        display: flex;
  align-items: center;
  padding:1rem .5rem;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
  color: inherit;
  color: #363232;
  gap:.5rem;
  :not(:last-child){
    border-bottom: 1px solid #c1bfbf;
  }
  .icon{
    font-size: 2rem;
  }
    }
`
const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
    max-width: 300px;
    background-color: white;
    height: 100vh;
    transform: translate(-100%);
    &.show{
        transform: translate(0);
    }

`
const Label = styled.p`
text-transform: capitalize;
`
const Footer = styled.footer`
padding:1.5rem .5rem;
background:#434848;
color: white;
font-size: 1.2rem;
`
const Title = styled.h2`
padding:1rem .5rem;
background-color: #000000e1;
color: white;
text-align: center;
`
const Drawer = () => {
    const {showDrawer,user} = useAppContext();
  return (
    <Model bg='#00000057'>
      <Wrapper className= {showDrawer && 'show'}>
            <Title>Flesh Grub</Title>

        <Container>
          <Link to='/' className='link'>
            <Home className='icon' />
            <Label>Home</Label>
          </Link>
          <Link to='/menu' className='link' >
            <LocalPizza className='icon'/>
            <Label>Our Menus</Label>
          </Link>
          <Link className='link'>
            <Handshake className='icon'/>
            <Label>Become a partner</Label>
          </Link>
          {
            user ? <>
             <Link to='/cart'  className='link'>
            <ShoppingCart className='icon'/>
            <Label>Cart</Label>
          </Link>
               <Link to='/orders' className='link'>
            <Payment className='icon'/>
            <Label>My Orders</Label>
          </Link>
          <div className='link'>
            <Logout className='icon'/>
            <Label>Logout</Label>
          </div>
            </>:<>
             <Link to='/auth/register' className='link'>
            <Logout className='icon'/>
            <Label>register</Label>
          </Link>
             <Link to='/auth/login' className='link'>
            <Logout className='icon'/>
            <Label>Login</Label>
          </Link>
            </>
          }
            <Link className='link'>
            <HelpCenter className='icon'/>
            <Label>Help Center</Label>
          </Link>
            <Link className='link'>
            <Home className='icon'/>
            <Label>About us</Label>
          </Link>
       
        </Container>
        <Footer> &copy; flesh grub.All right reserved. </Footer>
      </Wrapper>
    </Model>
  )
}

export default Drawer