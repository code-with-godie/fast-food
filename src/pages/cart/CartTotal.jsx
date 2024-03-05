import { ShoppingCartCheckout } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import { useSelector } from 'react-redux';
const Container = styled.div`
    background-color: white;
    padding:1rem;
    flex: 0.6;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap:.5rem;
    position: sticky;
    top: 10px;
`
const Item = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem .5rem;
border-bottom: 2px solid grey;
`
const Label = styled.h3`
`
const Value = styled.p`
`
const Button = styled.button`
display: flex;
align-items: center;
gap:.5rem;
outline: none;
border: none;
background:#2E3333;
padding:1rem;
color: white;
justify-content: center;
font-size: 1.3rem;
font-weight: bold;
text-transform: capitalize;
cursor: pointer;
.cart{
    font-size: 2rem;
}
&:disabled{
  cursor: not-allowed;
  background-color: #9f9898;
}
@media screen and (min-width: 768px) {
    padding:.5rem;
    font-size:1rem;
    .cart{
    font-size: 1.5rem;
}
    transition: all 300ms ease-in-out;
:hover{
    transform: scale(1.09);
}
}
`
const CartTotal = () => {
     const location = useLocation();
    const check = location?.pathname.includes('/cart')
    const navigate = useNavigate();
    const {total:cartTotal,tax:cartTax} = useSelector(state => state.cart)
    // const {cart:{cartTotal,cartTax}} = useAppContext();
    // const {cart:{cartTotal,cartTax}} = useAppContext();
    let tax =  cartTax * cartTotal;
    tax = parseFloat(tax.toFixed(2))
    let shipping = 0.03 * cartTotal;
     shipping = parseFloat(shipping.toFixed(2))
    let total = cartTotal + tax + shipping ;
    total = parseFloat(total.toFixed(2));
    // const [disabled,setDisabled] = useState(cart?.length === 0);
  return (
    <Container>
        <Item>
            <Label>Subtotal</Label>
            <Value>Kshs {cartTotal} </Value>
        </Item>
        <Item>
            <Label>Tax(5%)</Label>
            <Value>Ksh. {tax} </Value>
        </Item>
        <Item>
            <Label>Transport</Label>
            <Value>Ksh  {shipping} </Value>
        </Item>
        <Item>
            <Label>Total</Label>
            <Value> {total} </Value>
        </Item>
        {
            check && 
        <Button  onClick={()=> navigate('/payment')} >
        <ShoppingCartCheckout className='cart' />
            Checkout
            </Button>
        }
    </Container>
  )
}

export default CartTotal