import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { IconButton, Rating } from '@mui/material'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { useAppContext } from '../../context/AppContext'
import { addToCart, getCartTotal } from '../../context/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const Container = styled.div`
position: relative;
    display: flex;
    flex-direction: column;
background-color: white;
box-shadow: 2px 2px 5px #e0dede;
cursor: pointer;

`
const ImageContainer = styled.div`
flex:1;
`
const DescriptionContainer = styled.div`
padding: 0.5rem;
display: flex;
flex-direction: column;
gap:1rem;
padding:.5rem;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Title = styled.h4``
const Price = styled.h4`
font-size: 1.3rem;
color: #FF0000;
`
const CartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding:.3rem;
    background-color: #27272F;
    .icon{
        color: white;
        font-size: 1.7rem;

    }
`
const LabelContainer = styled(CartContainer)`
/* pointer-events: none; */
`
const Label = styled.p`
font-size: 1.2rem;
color: white;
text-transform: capitalize;
`
const MenuItem = ({image,name,price,_id}) => {
    const {user} = useAppContext();
    const [quantity,setQuantity] = useState(1);
    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart.cartItems)
    const [incart,setInCart] = useState(cart.includes(item => item._id === _id));
    const navigate = useNavigate();
    const  getRating = (min, max) =>{
           return Math.floor(Math.random() * (max - min + 1) ) + min;
             } 
  
    const rating = getRating(2,5);      
    const addCartItem = e =>{
         e.stopPropagation();
         if(user){
              setInCart(true);
        //   addCartItem({_id,price,quantity,name,image})
        //   getCartTotal()
        dispatch(addToCart({_id,price,amount:quantity,name,image}))
        dispatch(getCartTotal())
         }else{
            navigate('/auth/login')
         }
    }

    // useEffect(()=>{
    //     const look = cart.includes(item => item._id === _id);
    //     console.log(look);
    // },[cart,_id])
  return (
    <Container onClick={()=> navigate(`/menu/${_id}`)} >
        <ImageContainer>
            <Image src={image} />
        </ImageContainer>
        <DescriptionContainer>
            <Title>{name} </Title>
            <Price> Kshs. {price} </Price>
            <Rating readOnly value={rating} />
              {
                    incart ? <LabelContainer onClick={e => e.stopPropagation()}>
                        <Label>In Cart</Label>
                    </LabelContainer> :
                     <CartContainer onClick={addCartItem} >
                         <Label >add to cart</Label>
            <IconButton>
                <ShoppingCartCheckout className='icon' />
            </IconButton>
              
            </CartContainer>
                }
            
        </DescriptionContainer>
    </Container>
  )
}

export default MenuItem