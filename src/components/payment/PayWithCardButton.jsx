import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { postData } from '../../api/apiCalls'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../context/cartSlice'
import logo from '../../assets/logo.png'
// import styled from 'styled-components';
// const Image = styled.img`
//   max-height: 50px;
//   width: auto;
//   object-fit: contain;
// `
const PayWithCardButton = ({children}) => {
    const dispatch  = useDispatch();
    const [stripeToken,setStripeToken] = useState(null);
    const navigate = useNavigate();
    const {total:cartTotal,cartItems:items} = useSelector(state => state.cart);
    const {token} = useAppContext();
    const KEY ='pk_test_51OlVnOEUD0JiQ0JxeCfjzPZ2qWzxi5LOWwWvF1HYib5BfsxyteQBRuBehRbvLo7P4Hft2vbqFECLPm6x8tzd9oot00Gg8zdYPo'
    const onToken = (token)=>{
        setStripeToken(token);
    }
    const ItemIDs = items?.map(item => item._id);
    useEffect(()=>{
      const makePayment = async ()=>{
        const res =  await postData('/pay/card',{tokenId:stripeToken.id,amount:cartTotal});
         if(res){
          const {receipt_url,amount,source:{address_city,address_country,address_line1}} = res?.payment
          console.log(receipt_url);
          const order = {amount,address:`${address_city},${address_country},`,phone:address_line1,paymentType:'card',orderItems:ItemIDs,receipt_url}
          const newOrder = await postData('/order',order,token);
          if(newOrder){
            dispatch(clearCart())
            navigate('/payment/success');
          }
            }
      }
      stripeToken && makePayment();
    },[stripeToken,navigate,cartTotal,ItemIDs,token,dispatch])
  return (
    <>
    {
      stripeToken ? <h1>processing...</h1>:
         <StripeCheckout
    name='FRESH GRUB'
    image= {logo}
    billingAddress
    shippingAddress
    description={`Yout toatl is Ksh. ${cartTotal}`}
    amount={cartTotal}
    token={onToken}
    stripeKey={KEY}
    > {children} </StripeCheckout>
    }
    </>
  )
}

export default PayWithCardButton