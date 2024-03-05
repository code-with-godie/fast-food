import React, {  useState } from 'react'
import styled from 'styled-components';
// import OrderSummary from '../../components/payment/OrderSummary';
import UserDetails from '../../components/payment/UserDetails';
// import ContinueControls from '../../components/payment/ContinueControls';
import PaymentTypes from '../../components/payment/PaymentTypes';
import { useAppContext } from '../../context/AppContext';
import CartTotal from '../cart/CartTotal';
import { postData } from '../../api/apiCalls';
import { useSelector } from 'react-redux';

const Wrapper = styled.section`
     min-height: 80vh;
    overflow: auto;
`
const Container = styled.section`
    display: flex;
    padding:1rem;
    max-width: 1000px;
    margin:0 auto;
    flex-direction: column;
    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`
const DetailsWrapper = styled.div`
    flex: 4;
    
`
const Payment = () => {
    const [payment,setPayment] = useState(true);
    const{total:cartTotal,tax:cartTax} = useSelector(state => state.cart);
    let tax =  cartTax * cartTotal;
    tax = parseFloat(tax.toFixed(2))
    let shipping = 0.03 * cartTotal;
     shipping = parseFloat(shipping.toFixed(2))
    let amount = cartTotal + tax + shipping ;
    const {user:{name,phone}} = useAppContext();
  // const [firstName,lastName] = name?.split(' ')
  // const [user,setUser]=  useState({firstName,lastName,phone,addPhone:''})
  const [paymentType,setPaymentType]=  useState('card')
   const handleChange = e =>{
    const name = e.target.name
    const value = e.target.value
    // setUser(prev => ({...prev,[name]:value}))
  }
    const pay = async ()=>{
      try {
        console.log(amount);
        const res = await postData('/pay/paypal',{amount})
        // alert(`${paymentType} service is under development`)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
        // console.log(paymentType);
    }
  return (
    <Wrapper>
        <Container>
            <DetailsWrapper>

            <PaymentTypes pay={pay} setPayment={setPayment} paymentType={paymentType} setPaymentType={setPaymentType} />
            
            </DetailsWrapper>
            <CartTotal/>


        </Container>
    </Wrapper>
  )
}

export default Payment