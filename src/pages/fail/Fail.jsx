import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Fail = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        // setTimeout(()=>{
        //     navigate('/')
        // },3000)
    },[navigate])
  return (
    <div>payment failed</div>
  )
}

export default Fail