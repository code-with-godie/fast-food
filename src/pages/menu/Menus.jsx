import React from 'react'
import styled from 'styled-components';
import Header from '../../components/menu/Header';
import Menu from '../../components/menu/Menu';
const Container = styled.div`
`
const Menus = () => {
  return (
    <Container>
      <Header/>
      <Menu/>
    </Container>
  )
}

export default Menus