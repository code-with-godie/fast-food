
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, FormControlLabel, IconButton } from '@mui/material'
import logo from '../../../assets/noavatar.png'
import LoadingAnimation from '../../loading/LoadingAnimation';
import { CheckBox, Close } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { postData, updateData } from '../../../api/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import {productFetchFailure, productFetchStart, productFetchSuccess } from '../../../context/productSlice';
// import {openToast } from '../../../context/appSlice';
const Container = styled.section`
width: 100%;
max-width: 600px;
min-height: 200px;
background-color: #28313c3c;
background: #2A3447;
position: relative;
padding:.5rem;
display: flex;
flex-direction: column;
gap: 1rem;
position: relative;
.logo{
  width: 100px;
  height: 100px;
  position: absolute;
  cursor: pointer;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
}
.btn-close{
    position: absolute;
    top: 10px;
    right: 10px;
    .close{
        color: white;
        font-size: 2rem;
    }
}
`
const ControlWrapper = styled.div`
display: flex;
`
const Control = styled.button`
flex: 1;
padding: 1rem;
background: #475257;
border: none;
color: white;
font-weight: 400;
font-size: 1.2rem;
cursor: pointer;
text-transform: capitalize;
&.active{
  background: #53AD8A;
}
&:disabled{
  background: #676767;
  cursor: no-drop;
}
`
const Title = styled.h1`
    margin-top: 60px;
    text-transform: capitalize;
    text-align: center;
    color: white;
    font-weight: 400;
    font-size: 1.5rem;
    @media screen and (min-width:768px) {
        font-size: 3rem;
    }
`
const WrapperTwo = styled.section`
display: flex;
flex-direction: column;
gap: 1rem;
`
const Form = styled.form`
display: flex;
flex-direction: column;
gap: .5rem;
`
const InputWrapper = styled.div`
display: flex;
flex-direction: column;
gap:.5rem;
@media screen and (min-width: 768px) {
  flex-direction: row;
}

`
const Input = styled.input`
border: 1px solid #bab9b9;
flex: 1;
background: transparent;
font-size: 1.2rem;
color: white;
font-weight: 200;
padding:1rem;
outline: none;
::placeholder{
  text-transform: capitalize;
}
`
const Area = styled.textarea`
  outline: none;
  background-color: transparent;
  border: 1px solid #bab9b9;
  min-height: 50px;
  padding:.5rem;
  color: white;
  font-size: 1.2rem;
  resize: vertical;
  font-weight: 200;
`
const UpdateUser= ({setOpen,user:newUser,users}) => {
  console.log(newUser);
  const token = 'acd'
  const [loading,setLoading]  = useState(false)
  const [disabled,setDisabled]  = useState(true);
  const [user,setUser] = useState({profilePic:newUser?.profilePic,firtName:newUser?.firstName,lastName:newUser?.lastName,email:newUser?.email,password:'',confirmPassword:'',phone:newUser?.phone});

  const onChange = e =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setUser(prev => ({...prev,[name]:value}))
  }
  const onSubmit = async e =>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await updateData(`/users/update/${newUser?._id}`,user,token);
      if(res){
        console.log(res);
       users?.forEach((item,index)=>{
        if(item?._id === res?.user?._id){
          users.splice(index,1,res?.user)
        }
       })
    
        // setProducts(prev => [res?.user,...prev]);
            toast.success('user successfully creted',{
        position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    }) 
    setTimeout(() => {
        // setUser({image:'',name:"",price:'',quantity:'',categories:''});
      setOpen(false);        
    }, 3500);
      }
    } catch (error) {
      const messege = error?.response?.data?.messege || 'Something went wrong'  
      toast.error(messege,{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    }) 

      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
   const { getInputProps, getRootProps, acceptedFiles, isDragActive } =
        useDropzone({
            accept: { 'image/*': ['jpg', '.webp', 'png', 'jpeg','PNG'] },
            maxFiles: 1,
        });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[acceptedFiles.length - 1];
            const type = file?.type.split('/')[0];
            if (type !== 'image') {
                   toast.error('ony images are allowed 😟🥹🥹',{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    }) 
                return;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(acceptedFiles[acceptedFiles.length - 1]);
            fileReader.onload = () => {
                setUser(prev => ({...prev,profilePic:fileReader.result}))
            };
        }
    }, [acceptedFiles]);
    useEffect(()=>{
      if(user?.firtName?.length <= 0 || user?.lastName?.length <= 0  ||!user?.email ){
        setDisabled(true);
      }else{
        
        setDisabled(false);
      }
    },[user])
  return (
      <Container>
        <IconButton className='btn-close'  onClick={()=> setOpen(false)} >
            <Close className= 'close' />
        </IconButton>
        <Avatar className='logo' alt='Ojay' src={user?.profilePic || logo }  />
        <Title>update user </Title>
        <WrapperTwo>
      <Form onSubmit ={onSubmit} >
        <InputWrapper>
        <Control type='button' {...getRootProps({ hover: isDragActive })} >click to add image
         <input
                        {...getInputProps({
                            type: 'file',
                            hidden: true,
                        })}/>
        </Control>
        <Input name='firtName' onChange={onChange} value={user.firtName}  placeholder={`Enter user first name*`} />
        </InputWrapper>
        <InputWrapper>
        <Input name='lastName' type='text' onChange={onChange} value={user.lastName}  placeholder={`Enter user last name*`} />
        </InputWrapper>
           {/* <InputWrapper>
        <Input name='quantity'  onChange={onChange} value={user.quantity} min={1}  step='1' type='number'  placeholder={`Enter user quantity*`} />
        </InputWrapper> */}
           <InputWrapper>
        <Input name='email' type='email'  onChange={onChange} value={user.email}   placeholder={`Enter user Email*`} />
        </InputWrapper>
           <InputWrapper>
        <Input name='phone' type='number'  onChange={onChange} value={user.phone}   placeholder={`Enter user phone number*`} />
        </InputWrapper>
        {/* <Area placeholder='Enter user description' name='description'  onChange={onChange} value={user.description} /> */}
        {/* <Area placeholder='Enter user instruction' name='instructions'  onChange={ handleCategory} value={user.instructions} /> */}
        {/* <InputWrapper>
        <FormControlLabel value='all' control={<CheckBox sx={
          {color:'#cccccc', '&.Mui-checked':{color:'#53AD8A'}}} />} label ={'is the user acoholic'} />
        </InputWrapper> */}
        <ControlWrapper>
            <Control className='active' disabled = {disabled} > {loading ? <LoadingAnimation/>:'UPDATE USER'} </Control>
        </ControlWrapper>
      </Form>
    </WrapperTwo>
    <ToastContainer/>
      </Container>
  )
}

export default UpdateUser