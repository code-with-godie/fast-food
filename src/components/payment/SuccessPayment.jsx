import React, { useEffect } from 'react'
import styled from 'styled-components'
import success from '../../assets/success.png'
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
min-height: 500px;
display: flex;
align-items: center;
justify-content: center;
gap:.5rem;
flex-direction: column;
`
const Image = styled.img`
max-width: 100%;
height: auto;
object-fit: contain;
`
const Text = styled.p`
font-size: .9rem;
color: #afaaaa;
font-weight: 500;
font-style: oblique;
.big{
  font-size: 1.2rem;
  font-style: normal;
}
`
const SuccessPayment = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      const id =   setTimeout(()=>{
            navigate(`/orders`)
        },5000)
    return ()=>{
        clearTimeout(id)
    }
    },[navigate])
  return (
    <Container>
        <Image src={success} />
        <Text className='big'>Your order is been prepared</Text>
        <Text>Wait for a Redirect....</Text>
    </Container>
  )
}

export default SuccessPayment