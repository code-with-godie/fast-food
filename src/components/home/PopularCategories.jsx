import React from 'react'
import styled from 'styled-components';
import dessert from '../../assets/desset.png'
import snack from '../../assets/SNACK.png'
import burger from '../../assets/burger.png'
import wine from '../../assets/wine.png'
import meat from '../../assets/meat.jpeg'
import pizza from '../../assets/pizza.jpg'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
const Container = styled.div`
    min-height: 200px;
    background: linear-gradient(to bottom, #F3F3F3, white);
    padding-top: 2rem;
    position: sticky;
top: 0;
z-index: -1;
`
const Title = styled.h1`
text-align: center;
padding: 1rem;
color: #000000da;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns:repeat(auto-fit,minmax(400px,1fr)) ;
  grid-auto-rows: 350px;
  gap:.5rem;
`
const Category = styled.div`
  background:#00000081 url(${props => props.bg}) no-repeat center;
  background-size: cover;
  background-blend-mode: darken;
  display: flex;
  flex-direction: column;
  gap:.5rem;
  align-items: center;
  justify-content: center;
`
const Label = styled.h4`
font-size: 2.5rem;
font-weight: 500;
color: white;
text-transform: capitalize;
`
const Button = styled.button`
font-size: 1rem;
color: white;
text-transform: capitalize;
background-color: #434848;
border-radius:1rem;
border:none;
cursor: pointer;
outline: none;
padding:.5rem 1rem;
`
const MyCategory = ({bg,title})=>{
  const {filterProducts} = useAppContext()
  const navigate = useNavigate();
  const handleClick = (slug)=>{
    navigate('/menu');
    filterProducts(slug)

  }
  return <Category bg = {bg} >
    <Label> {title} </Label>
    <Button onClick={()=> handleClick(title)} >explore menus</Button>
  </Category>
}
const PopularCategories =  () => {
  return (
    <Container>
      <Title>Popular delicacies in Home </Title>
      <Wrapper>
        <MyCategory bg = {pizza} title = "pizza" >

        </MyCategory>
        <MyCategory bg = {dessert} title = "desserts" >

        </MyCategory>
        <MyCategory bg = {burger} title = "burger" >

        </MyCategory>
        <MyCategory bg = {wine} title = "wine" >

        </MyCategory>
        <MyCategory bg = {meat} title = "food" >

        </MyCategory>
        <MyCategory bg = {snack} title = "snack" >

        </MyCategory>
      </Wrapper>
    </Container>
  )
}

export default PopularCategories