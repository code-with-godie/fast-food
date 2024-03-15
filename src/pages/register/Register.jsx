import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import google from '../../assets/google.png'
import {FacebookRounded } from '@mui/icons-material';
import { postData } from '../../api/apiCalls'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
font-size:1.5rem;
color: #000000ef;
font-weight: 300;
text-align: center;
padding: .5rem .5rem 1rem .5rem;
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
const Footer = styled.p`
padding: 1rem;
font-style: oblique;
font-size:.8rem;
`
const InputWrapper = styled.div`
display: flex;
flex-direction: column;
gap:.3rem;
`
const Label = styled.p`
font-size:.8rem;
color: #030303;
`
const Register = () => {
  const {loginWithGoogle,user:loggedInUser,openToast} = useAppContext();
  const [user,setUser] = useState({firstName:'',lastName:'', email:'',password:'',confirmPassword:''});
  const [disabled,setDisabled] = useState(true);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = e =>{
   const name =  e.target.name;
   const value = e.target.value;
    setUser(prev => ({...prev,[name]:value}))
  }
  const handleSubmit = async e =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res  = await postData('/users/auth/register',user);
      if(res){
        navigate('/auth/login')
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
  useEffect(()=>{
    if(user?.firstName?.length >= 3 && user?.lastName?.length >= 3 && user.email && user?.password?.length >= 5 && user.confirmPassword === user.password){
      setDisabled(false)
    }else{
      setDisabled(true);
    }
  },[user.name,user.email,user.password])
  useEffect(()=>{ 
    if(loggedInUser){
      navigate('/')
    }
  },[loggedInUser,navigate])
  return (
    <Container>
      <Title >Create an account with us</Title>
      <Form onSubmit={handleSubmit} >
        <InputWrapper>
        <FormInput value={user.firstName} onChange={e =>handleChange(e)} name='firstName' placeholder='Enter your first name' />
        <Label>Atleat 3 characters</Label>

        </InputWrapper>
        <InputWrapper>
        <FormInput value={user.lastName} onChange={e =>handleChange(e)} name='lastName' placeholder='Enter your last name' />
        <Label>Atleat 3 characters</Label>

        </InputWrapper>
        <FormInput type='email' value={user.email} onChange={e =>handleChange(e)} name='email' placeholder='Enter your  email address' />
        <InputWrapper>
        <FormInput type='password' value={user.password} onChange={e =>handleChange(e)} name='password' placeholder='Enter password' />
        <Label>Atleat 5 characters</Label>
        </InputWrapper>
        <InputWrapper>
        <FormInput type='password' value={user.confirmPassword} onChange={e =>handleChange(e)} name='confirmPassword' placeholder='confirm password' />
        <Label>should match the password</Label>
        </InputWrapper>
        <FormButton disabled = {disabled} > {loading ? <LoadingAnimation/> : 'continue'} </FormButton>
      </Form>
      <DividerContainer>
        <DividerLine/>
        <DividerText>Or</DividerText>
      </DividerContainer>
      <OauthButton onClick={loginWithGoogle} > <Image src={google} alt='google' /> continue with Google</OauthButton>
      {/* <OauthButton> <FacebookRounded className='fb' /> continue with Facebook</OauthButton> */}
      <Footer>
        By proceeding you consent to get calls,Whatapp or sms messages
        including by automated means,from Fast Food and affillites to the number 
        provided
      </Footer>
    </Container>
  )
}

export default Register