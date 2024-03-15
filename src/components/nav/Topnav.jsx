import {Dashboard, LocalPizzaRounded, Logout, Payment, Person, ShoppingCart } from '@mui/icons-material';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { Avatar, Badge, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import Drawer from './Drawer';
import { useSelector } from 'react-redux';
import Model from '../model/Model';
const Container = styled.section`
position:absolute;
top:0;
width:100vw;
z-index:1000;
padding:.5rem 1rem;
display: flex;
background: linear-gradient(to top , transparent ,#00000095, #00000095,transparent) ;
justify-content: space-between;
.profile{
  width: 50px;
  height: 50px;
}
.btn{
  @media screen  and (min-width: 768px) {
    display: none;
  }
}
&.scroll{
  background: #1E1E1E !important;
}
`
const Left = styled.div`
display: flex;
align-items: center;
gap:2rem;
.icon{
  color: #ffffff;
}
`
const Logo = styled.h1`
color: white;
text-transform: capitalize;
font-size: 2rem;
cursor: pointer;
`
const Right = styled.div`
display: none;
gap:1rem;
@media screen and (min-width: 768px) {
 display: flex;
align-items: center;

}
`
const Button = styled.button`
outline: none;
background: none;
cursor: pointer;
padding:1rem;
border-radius:2rem;
border: none;
font-size: 1rem;
text-transform: capitalize;
`
const SignIn = styled(Button)`
  background-color: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  gap:.5rem;
`
const Login = styled(Button)`
  background-color: rgba(0, 0, 0, 0.643);
  color: #ffffff;
  padding:1.2rem;
`
const UserControls = styled.div`
display:flex;
align-items: center;
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
const Topnav = () => {
const navigate = useNavigate();
const [open,setOpen] = useState(false);
  const goto = to =>{
    navigate(to)
  }
  const {user,scrollValue} = useAppContext();
  const {toggleDrawer,showDrawer,logout:mainLogout} = useAppContext();
  const amount = useSelector(state => state.cart.amount);
  const logout = (e)=>{
    e.stopPropagation()
    setOpen(false);
    mainLogout();
  }
  return (
    <Container className={scrollValue && 'scroll'} >
      <Left>
        <IconButton onClick={toggleDrawer} className='btn' >
        <DensityMediumIcon className='icon bar' />
        </IconButton>
        <Logo onClick={()=> goto('/')} >Fresh Grub</Logo>
      </Left>
      <Right>
          
        {user?.role === 'admin' && <SignIn onClick={()=> navigate('/dashboard')} > <Dashboard/> dashboard</SignIn> }
        {user && <SignIn onClick={()=> setOpen(true)} ><Logout/>  logout</SignIn> }
         <Control onClick={()=> navigate('/menu')} >
              <LocalPizzaRounded className='icon' />
              <ControlLabel>Our Menu</ControlLabel>
              </Control>
        {
          user ? <UserControls>
                <Control onClick={()=> navigate('/orders')} className='link'>
            <Payment className='icon'/>
            <ControlLabel>My Orders</ControlLabel>
          </Control>
          <Control onClick={()=> navigate('/cart')}  >

                <Badge badgeContent = {<Count> {amount} </Count>} >
              <ShoppingCart className='icon' />
              </Badge>

          </Control>
            <IconButton onClick={()=> navigate('/profile')} >
              <Avatar className='profile' src={user?.profilePic} alt={user?.name} />
              </IconButton>
          </UserControls>:<>
          <SignIn onClick={e=> goto('/auth/register')} > <Person/> sign up</SignIn>
          <Login onClick={e=> goto('/auth/login')} >login in</Login>
          
          </>
        }
      </Right>
      {
        showDrawer &&
      <Drawer/>
      }
      {
        open &&  <Model bg = ' #000000e5' center >
        <SignIn onClick={logout} >confirm you want to logout</SignIn>
      </Model>
      }
    </Container>
  )
}

export default Topnav