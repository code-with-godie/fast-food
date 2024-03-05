import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation'
import { IconButton, Rating } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrease, getCartTotal, increase } from '../../context/cartSlice';
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding:.5rem;
  overflow: auto;
`
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  flex-direction: column;
  @media screen and (min-width:768px) {
    height: 80vh;
    flex-direction: row;
  }

`
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: #e4e0e0;
`
const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`
const DescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap:.5rem;
  padding:.5rem;

`

const Title = styled.h3`
color: #979090;
`
const Price = styled.h1`
color: #979090;
font-weight: 500;
font-size: 3rem;
`
const Description = styled.p`
color: #979090;

`
const Button = styled.button`
display: flex;
align-items: center;
gap:.5rem;
outline: none;
border: none;
background:#2E3333;
padding:.5rem 1rem;
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
`
const Quantity = styled.button`
padding:.3rem;
border: 1px solid grey;
outline: none;
color: black;
font-size: 1rem;
border-radius:.5rem;
`
const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding:.5rem;
`
const QualityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .arrow{
    font-size: 1.5rem;
    cursor: pointer;
  }
`
const IngredientContainer = styled.ul`
padding:.5rem;
padding-left: 1rem;
color: #979090;
 list-style-type: lower-roman;
`
const Ingredient = styled.li`
font-weight: 200;
`
const SingleProduct = () => {
  const {user} = useAppContext();
   const cart = useSelector(state => state.cart);
   const navigate = useNavigate();
  const [product,setProduct] =useState({})
  const [productCart,setProductCart] =useState({})
   const [inCart,setIncart] = useState(cart?.cartItems?.some(item => item._id === product?._id))
  const dispatch = useDispatch()
   const increaseItem = (id)=>{
    dispatch(increase(id))
    dispatch(getCartTotal())
   }
   const decreaseItem = (id)=>{
    dispatch(decrease(id))
    dispatch(getCartTotal())
   }
    const addCartItem = e =>{
        //  setInCart(true);
        //   addCartItem({_id,price,quantity,name,image})
        //   getCartTotal()
       if(user){
        dispatch(addToCart({_id:product?._id,price:product?.price,amount:1,name:product?.name,image:product?.image}))
        dispatch(getCartTotal())
       }else{
        navigate('/auth/login')
       }
    }
   const  getRating = (min, max) =>{
           return Math.floor(Math.random() * (max - min + 1) ) + min;
             } 

  const rating  = getRating(2,5);           
  const {menuId} = useParams()
  const {data,loading,error} = useFetch(`/products/single/${menuId}`);
  useEffect(()=>{
    data && setProduct(data.product);

  },[data])
  useEffect(()=>{
    setIncart(cart?.cartItems?.some(item => item._id === product?._id))
    setProductCart(cart?.cartItems?.find(item => item._id === product?._id))
  },[cart,product])

  if(loading){
    return <LoadingAnimation large />
  }
  if(error){
    console.log(error);
    return <h1>Something went wrong</h1>
  }
  return (
    <Wrapper>

    <Container>
      <ImageContainer>
        <Image src={product?.image} />
      </ImageContainer>
      <DescriptionContainer>
        <Title> {product?.name} </Title>
        <Price> Kshs. {product?.price} </Price>
        <Rating readOnly value={rating} />
        {
          product?.description &&
          <Description> {product?.description} </Description>
        }
        {
          product?.company &&
          <>
          <Title>company</Title>
          <Description> {product?.company} </Description>
          </>
        }
        {
          product?.isAcoholic &&
          <>
          <Title>Is product Acoholic?</Title>
          <Description> {product?.isAcoholic} </Description>
          </>
        }
        {
          product?.glass &&
          <>
          <Title>Glass</Title>
          <Description> {product?.glass} </Description>
          </>
        }
        {
          product?.size &&
          <Description> {product?.size} </Description>
        }
          <Control>
            {
              inCart ?<>
                  <QualityWrapper>
                      <IconButton onClick={()=> increaseItem(product._id)} >
                      <KeyboardArrowUp  className='arrow' />
    
                      </IconButton>
                    <Quantity> {productCart?.amount} </Quantity>
                    <IconButton disabled ={productCart?.amount <=1} className='btn' onClick={()=> decreaseItem(product._id)}>
                      <KeyboardArrowDown className='arrow'/>
                    </IconButton>
                    </QualityWrapper>
                    <Button onClick={()=> navigate('/cart')} > see In Cart</Button>
              </> :
              <>
          
            <Button onClick={addCartItem}  >add to cart</Button>
              
              </>
            }
        </Control>
        {
          product?.ingridients?.length > 0 &&
          <>
          <Title>Ingredients</Title>
          <IngredientContainer>
            {
              product?.ingridients?.map((item,index)=>(<Ingredient key={index} > {item} </Ingredient>))
            }
          </IngredientContainer>
            </>
        }
        {
          product?.instructions?.length > 0 &&
          <>
          <Title>Instructions</Title>
          <IngredientContainer>
            {
              product?.instructions?.map((item,index)=>(<Ingredient key={index} > {item} </Ingredient>))
            }
          </IngredientContainer>
            </>
        }
      </DescriptionContainer>
    </Container>
    </Wrapper>
  )
}

export default SingleProduct