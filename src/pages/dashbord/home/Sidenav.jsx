import React, { useState } from 'react'
import styled from 'styled-components';
import logo from '../../assets/logo.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Backup, CalendarMonth, CalendarToday, Dashboard, Group, Logout, Person, ProductionQuantityLimits, ScaleSharp, Settings, ShoppingCart} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Add from '../../components/add/Add';
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
    overflow: auto;
      border-radius:1rem;
    padding:.5rem;
    background-color: #28313ce6;
    flex: 1;

`
const Container = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap:1rem;
    .link{
       display: flex;
    align-items: center;
    gap: .7rem;
    padding:.5rem;
    text-decoration :none ;
    color: white;
    .icon{
        font-size: 2rem;
        color: white; 
    }
     :hover{
         background-color: #13417ac8;
    }
    }
`
const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    .logo{
        font-size: 2.5rem;
        color: white;
    }
`

const Title = styled.h1`
color: white;
font-weight: 200;
font-size: 1.2rem;
`
const Footer = styled.footer`
display: flex;
flex-direction: column;
gap:.5rem;
`
const FooterTitle = styled.p`
    color: white;
    font-size: 1rem;
    font-style: italic;
    text-align: center;
`
const Label = styled.p`
color: gray;
text-transform: uppercase;
font-size:.8rem;
`
const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:.3rem;
`
const Sidenav = () => {
    const [open,setOpen] = useState(false)
  return (
    <Wrapper>
        <Item>
            <LocalMallIcon className='logo' />
            <Title>OJAY</Title>
        </Item>
    <Container>
         <ItemWrapper>
        <Label>main</Label>
        <Link className='link' to='/' >
            <Dashboard className='icon' />
            <Title>Dashboard</Title>
        </Link>
         <Link className='link' to='/products' >
            <ShoppingCart className='icon' />
            <Title>Products</Title>
        </Link>
        <Link className='link' to='/users/1' >
            <Person className='icon' />
            <Title>Profile</Title>
        </Link>
        </ItemWrapper>
        <ItemWrapper>
        <Label>lists</Label>
        <Link className='link' to='/users' >
            <Group className='icon' />
            <Title>users</Title>
        </Link>
        <Link className='link' >
            <ScaleSharp className='icon' />
            <Title>Sales</Title>
        </Link>
        </ItemWrapper>
         <ItemWrapper>
        <Label>general</Label>
        <Link className='link' >
            <Settings className='icon' />
            <Title>settings</Title>
        </Link>
        <Link className='link' >
            <Backup className='icon' />
            <Title>backup</Title>
        </Link>
        <Link className='link' onClick={()=> setOpen(true)}  >
            <Logout className='icon' />
            <Title>logout</Title>
        </Link>
        </ItemWrapper>
    </Container>
    <Footer>
        <FooterTitle> All rights Reserved. Ojay 2024 - {new Date().getFullYear()} </FooterTitle>
    </Footer>
     {open && <Add confirm columns={[]} setOpen={setOpen} />}
    </Wrapper>
  )
}

export default Sidenav