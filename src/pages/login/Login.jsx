import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import google from '../../assets/google.png'
import {FacebookRounded} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { postData } from '../../api/apiCalls';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
const Container = styled.div`
  width: 100vw;
  max-width: 400px;
  background-color: #ffffff4c;
  padding:.5rem;
  display: flex;
  flex-direction: column;
  gap:.5rem;
  border-radius:.5rem;
`
const Title = styled.h3`
font-size:1.3rem;
color: #000000ef;
font-weight: 300;
text-align: center;
padding-top: 3rem;

`
const Form = styled.form`
display: flex;
flex-direction: column;
gap:.5rem;
`
const FormInput = styled.input`
padding:.7rem;
font-size: 1rem;
background: #eeeeee64;
outline: none;
border:none;
border-radius:.5rem;
::placeholder{
  color: #000000b8;
}
`
const FormButton = styled.button`
padding:.7rem;
font-size: 1rem;
background: #000000b6;
outline: none;
border:none;
border-radius:.5rem;
color: white;
text-transform: capitalize;
cursor: pointer;
&:disabled{
  cursor: not-allowed;
  background-color: #9f9898;
}
`
const DividerContainer = styled.div`
  display: flex;
  position: relative;
  padding:1rem 0;
`
const DividerLine = styled.div`
  width: 100%;
  padding:.08rem;
  background-color: #e8e2e258;
  flex:1;
`
const DividerText = styled.p`
  color: #aaa7a7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #ffffff;
  z-index: 10;
  font-size:.9rem;
  border-radius:50%;
  padding:.3rem;
`
const OauthButton = styled(FormButton)`
  background-color: #eeeeee64;
  color: black;
  display :flex ;
  align-items: center;
  gap:.5rem;
  padding-left: 5rem;
  .fb{
    color: blue;
    font-size: 2.5rem;
  }
`
const Image = styled.img`
  width: 50px;
  height: auto;
  object-fit: contain;
`
const Description = styled.p`
display: flex;
justify-content: center;
align-items: center;
gap: .5rem;
font-size:.9rem;
padding: 1.5rem 0;
.qr{
  font-size:.9rem;

}
`
const Footer = styled.p`
padding: 1rem;
font-style: oblique;
font-size:.8rem;
`
const Login = () => {
  const [user,setUser] = useState({email:'',password:''});
  const {loginWithGoogle,user:loggedInUser,openToast,setUser:updateUser } = useAppContext();
   const [disabled,setDisabled] = useState(true);
   const navigate = useNavigate();
   const [loading,setLoading] = useState(false);
  const handleSubmit = async  e =>{
    e.preventDefault();
    try {
      setLoading(true);
      let res = await postData('/users/auth/login',user)
      if(res){
        const {user,token} = res;
        updateUser({user,token})
        console.log(res);
      }
      
    } catch (error) {
      const  message = error?.response?.data?.message || 'something went wrong';
      openToast(message);
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
   const handleChange = e =>{
   const name =  e.target.name;
   const value = e.target.value;
    setUser(prev => ({...prev,[name]:value}))
  }
   useEffect(()=>{
    if(user.email && user.password.length >= 5){
      setDisabled(false)
    }else{
      setDisabled(true);
    }
  },[user.email,user.password])
  useEffect(()=>{
    if(loggedInUser){
      navigate('/')
    }
  },[loggedInUser,navigate])
  return (
    <Container>
      <Title>What your phone number or email address</Title>
      <Form onSubmit={handleSubmit} >
        <FormInput name='email' value={user.email} onChange={handleChange} placeholder='Enter phone number or email' />
        <FormInput name='password' type='password' value={user.password} onChange={handleChange} placeholder='Enter your password' />
        <FormButton disabled ={disabled} >{loading ? <LoadingAnimation/> : 'continue'} </FormButton>
      </Form>
      <DividerContainer>
        <DividerLine/>
        <DividerText>Or</DividerText>
      </DividerContainer>
      <OauthButton  onClick = {loginWithGoogle} > <Image src={google} alt='google' /> continue with Google</OauthButton>
      <OauthButton> <FacebookRounded className='fb' /> continue with Facebook</OauthButton>
      <Footer>
        By proceeding you consent to get calls,Whatapp or sms messages
        including by automated means,from Fast Food and affillites to the number 
        provided
      </Footer>
    </Container>
  )
}

export default Login