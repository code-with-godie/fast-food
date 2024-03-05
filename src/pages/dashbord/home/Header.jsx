import React from 'react'
import styled from 'styled-components'
import Profile from './Profile'
import Dates from './Dates'
const Container = styled.div`
display: flex;
flex-direction: column;
gap:2rem;
background-color: #262E39;
border-radius: 1px;
padding:.5rem;
border-radius:.5rem;
`
const Header = () => {
  return (
    <Container>
      <Dates/>
      {/* <Profile/> */}
    </Container>
  )
}

export default Header