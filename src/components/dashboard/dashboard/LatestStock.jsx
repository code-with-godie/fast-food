import React from 'react'
import styled from 'styled-components';
import product from '../../assets/product.jpg';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
    overflow: auto;
    padding:.5rem;
`
const Title = styled.h1`
    color: white;
    text-transform: capitalize;
    text-align: center;
font-size: 1.2rem;
`
const ProductContainer = styled.div`
display: flex;
flex-direction: column;
gap:.5rem;
`

const ProductWrapper = styled.div`
    display: flex;
    align-items: center;
    color: white;
    gap:.5rem;
    &:nth-child(1),
  &:nth-child(2),
&:nth-child(3){
    color: tomato;
    
}
    &:nth-child(4),
  &:nth-child(5),
&:nth-child(6){
    color: #c4c40b;
    
}
`
const ProductDescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:.3rem;
`
const ProductImage = styled.img`
object-fit: contain;
max-width: 70px;
height: auto;
border-radius:.5rem;
`
const ProductTitle = styled.h1`
font-size: 1.5rem;
color: inherit;
`
const ProductPrice = styled.p`
font-weight: 200;
color: inherit;

`
const Product = ()=>{
    return <ProductWrapper>
        <ProductImage src={product} />
        <ProductDescriptionWrapper>

            <ProductTitle>Pizza</ProductTitle>
            <ProductPrice>Ksh.546</ProductPrice>
        </ProductDescriptionWrapper>
        </ProductWrapper>
}
const LatestStock = () => {
  return (
    <Container>
        <Title>First selling products</Title>
        <ProductContainer>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </ProductContainer>
    </Container>
  )
}

export default LatestStock