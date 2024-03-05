import React from 'react'
import { Outlet} from 'react-router-dom';
import styled from 'styled-components'
import url from '../../assets/bg.webp'
import Header from '../../components/header/Header';

const Container = styled.section`
height: 100vh;
overflow: auto;
display: flex;
flex-direction: column;
`
const FormWrapper = styled.div`
flex: 1;
background: #000000c8 url(${props => props.url}) no-repeat center ;
background-size: cover;
background-blend-mode: darken;
display: flex;
justify-content: center;
align-items: center;
`

const AuthLayout = () => {
  return (
    <Container>
      <Header/>
      <FormWrapper url = {url} >
        <Outlet/>
      </FormWrapper>
      
    </Container>
  )
}

export default AuthLayout