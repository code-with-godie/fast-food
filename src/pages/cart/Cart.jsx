import React from 'react'
import styled from 'styled-components'
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import { useAppContext } from '../../context/AppContext';
import bag from '../../assets/bag2.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Wrapper = styled.div`
  min-height: 200px;
  display: flex;
  justify-content: center;
  padding:1rem;
  align-items: flex-start;
   background: beige;
`
const Container = styled.div`
height: auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`
const ImageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Label = styled.p`
  padding:.5rem  1rem;
  background-color: #434848;
  color: white;
  border-radius: 1rem;
  text-transform: capitalize;
  cursor: pointer;
`
const Image = styled.img`
max-width: 100% ;
height: auto;
object-fit: contain;
`
const Cart = () => {
  const cart = useSelector(state => state.cart.cartItems)
  const navigate = useNavigate();
   if(cart.length === 0){
        return  <Wrapper>
      <ImageContainer>
      <Image src={bag}  />
      <Label onClick={()=> navigate('/menu')} >Explore menus</Label>
      </ImageContainer>
    </Wrapper>
    }
  return (
    <Wrapper>
    <Container>
      <CartItems/>
      <CartTotal/>
    </Container>
    </Wrapper>
  )
}

export default Cart