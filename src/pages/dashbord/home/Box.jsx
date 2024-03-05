import { Person } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
border-radius:.5rem;
padding: 1rem;
display: flex;
gap:.5rem;
background: ${props =>props.bg};
width: 100%;
max-width: 500px;
border:1px solid  ${props =>props.border};
    
`
const ImageContainer = styled.div`
background: ${props =>props.bg};
border-radius:.5rem;
padding:.5rem;
.icon{
    font-size: 2.5rem;
    color: white;
}
`
const Description = styled.div`
display: flex;
flex-direction: column;
gap:.3rem;
`
const Title = styled.h3`
    text-transform: capitalize;
    color: #11181D;
    font-weight: bold;
    font-size: 1.5rem;
`
const Price = styled.p`
color: #11181D;
font-weight: 200;
font-size:1.2rem;
    
`
const Box = ({title,bg,iconBg,border}) => {
  return (
    <Container bg = {bg} border = {border} >
        <ImageContainer bg = {iconBg} >
            <Person className='icon' />
        </ImageContainer>
        <Description>
            <Title> {title} </Title>
            <Price>Kshs. 345</Price>
        </Description>
    </Container>
  )
}

export default Box