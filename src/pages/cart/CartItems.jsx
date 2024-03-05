import React from 'react'
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal,increase,decrease, removeCartItem } from '../../context/cartSlice';
const Container = styled.div`
    padding:1rem;
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .btn:disabled{
      cursor: not-allowed;
    }
    `

const Item = styled.div`
     background-color: white;
    padding:.5rem;
    display: flex;
        transition: all 300ms ease-in-out;
:hover{
    transform: scale(1.03);
}
`

const Image = styled.img`
max-width: 100%;
height: 100%;
object-fit: contain;
`
const ImageContainer = styled.div`
flex: 1;
`
const DescriptionContainer = styled.div`
flex: 1.5;
padding:.5rem;
display: flex;
flex-direction: column;
gap: .5rem;
`
const DescriptionWrapper = styled.div`
  display: flex;
  gap:.2rem;
  align-items: center;
`
const ButtonWrapper = styled(DescriptionWrapper)`
  justify-content: space-between;
  /* padding-top: 1rem; */
`
const Label = styled.h3`
  text-transform: capitalize;
`
const Title = styled.h2`
text-transform: capitalize;
`
const Price = styled.h3``
const QualityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .arrow{
    font-size: 1.5rem;
    cursor: pointer;
  }
`
const Quantity = styled.button`
padding:.3rem;
border: 1px solid grey;
outline: none;
color: black;
font-size: 1rem;
border-radius:.5rem;
`
const Remove = styled.button`
display: flex;
align-items: center;
gap:.5rem;
outline: none;
border: none;
background:#2E3333;
padding:.5rem 1rem;
color: white;
border-radius:.5rem;
font-size: 1rem;
text-transform: capitalize;
cursor: pointer;
`
const CartItems = () => {
  //  const {cart inceaseCart,descreaseCart,getCartTotal} = useAppContext();
  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch()
   const increaseItem = (id)=>{
    console.log('increase called');
    dispatch(increase(id))
    dispatch(getCartTotal())
   }
   const decreaseItem = (id)=>{
    dispatch(decrease(id))
    dispatch(getCartTotal())
   }
   const deleteItem = (id)=>{
    dispatch(removeCartItem(id))
    dispatch(getCartTotal())
   }

  return (
    <Container>
      {
        cart.map(item =>(
            <Item key={item._id} >
            <ImageContainer>
            <Image src={item.image} />
    
            </ImageContainer>
            <DescriptionContainer>
              <Title> {item.name} </Title>
              <DescriptionWrapper>
                <Label>price:</Label>
                <Price>Kshs. {item.price} </Price>
              </DescriptionWrapper>
              <ButtonWrapper>
              <DescriptionWrapper>
                <Label>quanlity:</Label>
                <QualityWrapper>
                  <IconButton onClick={()=> increaseItem(item._id)} >
                  <KeyboardArrowUp  className='arrow' />

                  </IconButton>
                <Quantity> {item?.amount} </Quantity>
                <IconButton className='btn' disabled ={item?.amount <=1} onClick={()=> decreaseItem(item._id)}>
                  <KeyboardArrowDown className='arrow'/>
                </IconButton>
                </QualityWrapper>
              </DescriptionWrapper>
              <Remove onClick={ ()=> deleteItem(item?._id)} > <DeleteIcon/> delete</Remove>

              </ButtonWrapper>


            </DescriptionContainer>
        </Item>
        ))
      }
    </Container>
  )
}

export default CartItems