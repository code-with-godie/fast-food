
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, FormControlLabel, IconButton } from '@mui/material'
import logo from '../../../assets/logo.png'
import LoadingAnimation from '../../../components/loading/LoadingAnimation';
import { CheckBox, Close } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { postData } from '../../../api/apiCalls'
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
const AddProduct= ({setOpen,setProducts,product:newProduct,products}) => {
  // const user = useSelector(state => state.user.user);
  // const token = useSelector(state => state.user.token);
  const token = 'acd'
  const [loading,setLoading]  = useState(false)
  // const dispatch = useDispatch();
  const [disabled,setDisabled]  = useState(true);
  const [product,setProduct] = useState({image:newProduct?.image,name:newProduct?.name,price:newProduct?.price,categories:newProduct?.categories?.join(','),description:newProduct?.description,instructions:newProduct?.instructions?.join('.')});

  const onChange = e =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setProduct(prev => ({...prev,[name]:value}))
  }
  const handleCategory = e =>{
    const name = e.target.name;
    const value = name === 'categories' ? e.target.value?.split(','): e.target.value?.split('.');
    console.log(value);
    setProduct(prev => ({...prev,[name]:value}))
  }
  const onSubmit = async e =>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await postData(`/products/single/${newProduct?._id}`,product,token);
      if(res){
      const updatedProduct =  products?.map((item)=>{
        if(item._id === res?.product?._id){
          return res?.product
        }else{
         return  item
        }
       })
    
        setProducts(updatedProduct);
            toast.success('product successfully creted',{
        position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    }) 
    setTimeout(() => {
        setProduct({image:'',name:"",price:'',quantity:'',categories:''});
      setOpen(false);        
    }, 1000);
      }
    } catch (error) {
      const messege = error?.response?.data?.messege || 'Something went wrong'  
      toast.error(messege,{
        position: "top-right",
autoClose: 1000,
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
                return;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(acceptedFiles[acceptedFiles.length - 1]);
            fileReader.onload = () => {
                setProduct(prev => ({...prev,image:fileReader.result}))
            };
        }
    }, [acceptedFiles]);
    useEffect(()=>{
      if(product?.image?.length <= 0 || product?.name?.length <= 0  ||!product?.price || product?.categories?.length <=0 ){
        setDisabled(true);
      }else{
        
        setDisabled(false);
      }
    },[product])
  return (
      <Container>
        <IconButton className='btn-close'  onClick={()=> setOpen(false)} >
            <Close className= 'close' />
        </IconButton>
        <Avatar className='logo' alt='Ojay' src={product?.image || logo }  />
        <Title>update product </Title>
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
        <Input name='name' onChange={onChange} value={product.name}  placeholder={`Product name*`} />
        </InputWrapper>
        <InputWrapper>
        <Input name='price' type='number' step='0.5'  min={1} onChange={onChange} value={product.price}  placeholder={`Enter product price*`} />
        </InputWrapper>
           {/* <InputWrapper>
        <Input name='quantity'  onChange={onChange} value={product.quantity} min={1}  step='1' type='number'  placeholder={`Enter product quantity*`} />
        </InputWrapper> */}
           <InputWrapper>
        <Input name='categories'  onChange={ handleCategory} value={product.categories}   placeholder={`Enter product Category*`} />
        </InputWrapper>
        <Area placeholder='Enter product description' name='description'  onChange={onChange} value={product.description} />
        <Area placeholder='Enter product instruction' name='instructions'  onChange={ handleCategory} value={product.instructions} />
        {/* <InputWrapper>
        <FormControlLabel value='all' control={<CheckBox sx={
          {color:'#cccccc', '&.Mui-checked':{color:'#53AD8A'}}} />} label ={'is the product acoholic'} />
        </InputWrapper> */}
        <ControlWrapper>
            <Control className='active' disabled = {disabled} > {loading ? <LoadingAnimation/>:'UPDATE PRODUCT'} </Control>
        </ControlWrapper>
      </Form>
    </WrapperTwo>
    <ToastContainer/>
      </Container>
  )
}

export default AddProduct