
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, IconButton } from '@mui/material'
import logo from '../../../assets/icon-1.png'
import LoadingAnimation from '../../../loading/LoadingAnimation';
import { Close } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { postData } from '../../../api/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, productFetchFailure, productFetchStart, productFetchSuccess } from '../../../context/productSlice';
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
    font-size: 2rem;
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
const AddProduct= ({setOpen,open}) => {
  const user = useSelector(state => state.user.user);
  const loading  = useSelector(state => state.products.loading);
  const dispatch = useDispatch();
  const [disabled,setDisabled]  = useState(true);
  const [product,setProduct] = useState({img:'',title:"",sellingPrice:'',buyingPrice:'',discount:'',quantity:'',categories:''});

  const onChange = e =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setProduct(prev => ({...prev,[name]:value}))
  }
  const onSubmit = async e =>{
    e.preventDefault();
    try {
      dispatch(productFetchStart())
      const res = await postData('/products',product);
      if(res){
        setProduct({img:'',title:"",sellingPrice:'',buyingPrice:'',discount:'',quantity:'',categories:''});
        dispatch(productFetchSuccess());
        dispatch(addProduct(res.product));
        setOpen(false);
        await postData(`/activity?type=PRODUCT_CREATION`);
        
      }
    } catch (error) {
      const messege = error?.reponse?.data?.messege || 'Something went wrong'   
      dispatch(productFetchFailure(messege));
      console.log(error);
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
                setProduct(prev => ({...prev,img:fileReader.result}))
            };
        }
    }, [acceptedFiles]);
    useEffect(()=>{
      if(product.img.length <= 0 || product.title.length <= 0  ||!product.buyingPrice || !product.sellingPrice || product.categories.length <=0 || !product.quantity){
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
        <Avatar className='logo' alt='Ojay' src={product?.img || logo}  />
        <Title>Add Stock </Title>
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
        <Input name='title' onChange={onChange} value={product.title}  placeholder={`Product title*`} />
        </InputWrapper>
        <InputWrapper>
        <Input name='buyingPrice' type='number' step='1'  min={1} onChange={onChange} value={product.buyingPrice}  placeholder={`Enter product buying price*`} />
        <Input name='sellingPrice'  onChange={onChange}  min={1} value={product.sellingPrice}  step='1' placeholder={`Enter product selling price*`} type='number' />
        </InputWrapper>
           <InputWrapper>
        <Input name='discount'  onChange={onChange} value={product.discount}  min={1} step='1' placeholder={`Enter product discount*`} type='number' />
        <Input name='quantity'  onChange={onChange} value={product.quantity} min={1}  step='1' type='number'  placeholder={`Enter product quantity*`} />
        </InputWrapper>
           <InputWrapper>
        <Input name='categories'  onChange={onChange} value={product.categories}   placeholder={`Enter product Category*`} />
        </InputWrapper>
        <ControlWrapper>
            <Control className='active' disabled = {disabled} > {loading ? <LoadingAnimation/>:'ADD STOCK'} </Control>
        </ControlWrapper>
      </Form>
    </WrapperTwo>
      </Container>
  )
}

export default AddProduct