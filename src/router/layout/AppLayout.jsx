import React from 'react'
import styled from 'styled-components';
import {Outlet} from 'react-router-dom'
import Footer from '../../components/footer/Footer';
import Topnav from '../../components/nav/Topnav';
const Container = styled.main`
    height: 100vh;
    overflow: auto;
`
const AppLayout = () => {

  return (
    <Container>
      <Topnav/>
        <Outlet/>
        <Footer/>
    </Container>
  )
}

export default AppLayout