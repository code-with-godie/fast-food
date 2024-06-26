import React from 'react'
import styled from 'styled-components'
import url from '../../assets/how.jpg'
const Container = styled.div`
background-color: #F3F3F3;
/* position: relative; */
position: sticky;
top: 0;
z-index: -1;
`
const Image = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
`
const Title = styled.h1`
    color: #000000e2;
    font-size: 2rem;
    text-align: center;
    padding: 1rem;
`

const HowItWorks = () => {
  return (
    <Container>
        <Title>How its works</Title>
        <Image src={url} alt='how it works' />
    </Container>
  )
}

export default HowItWorks