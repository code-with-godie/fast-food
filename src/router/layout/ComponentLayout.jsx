import React from 'react'
import { Outlet} from 'react-router-dom';
import styled from 'styled-components'
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
const Container = styled.section`
height: 100vh;
overflow: auto;
/* display: flex;
flex-direction: column; */
`



const ComponentLayout = () => {
  return (
    <Container>
        <Header/>
      <Outlet/>
      <Footer/>
    </Container>
  )
}


export default ComponentLayout