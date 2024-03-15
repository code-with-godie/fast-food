import React, { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../api/apiCalls';

const Success = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);
      const orderID = searchParams.get('paymentId');
  const payerID = searchParams.get('PayerID');
  console.log(orderID,payerID);

    const retrieveOrder = useCallback(async (orderID,payerID)=>{
        try {
            const res = await postData(`/pay/paypalV2GetOrder/${orderID}/${payerID}`)
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    },[])
    const navigate = useNavigate();
    useEffect(()=>{
        // setTimeout(()=>{
        //     navigate('/orders')
        // },3000)
       ( orderID && payerID) && retrieveOrder(orderID,payerID)
    },[orderID,payerID,retrieveOrder])
  return (
    <div>payment success</div>
  )
}


export default Success