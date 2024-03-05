import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import bg from '../../assets/menu.png'
import MenuItem from './MenuItem';
import { useFetch } from '../../api/useFetch'
import { useAppContext } from '../../context/AppContext';
import LoadingAnimation from '../../components/loading/LoadingAnimation'
const Container = styled.div`
flex: 3;
background: black url(${props => props.bg}) repeat center;
background-size: contain;
display: grid;
grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
/* grid-auto-rows:minmax(200px,1fr); */
gap: 1.3rem;
align-content: flex-start;
align-items: stretch;
padding:.3rem;
`
const MenuList = ({slugS}) => {
  const [menu,setMenu] = useState([]);
  const {slug} = useAppContext();
  const {loading,data,error} = useFetch(`/products?cat=${slug}`);
  useEffect(()=>{
    data && setMenu(data?.products)
  },[data])
  if(loading) return <LoadingAnimation large />
  if(error){
    console.log(error);
    return <h1>Something went wrong</h1>
  }
  return (
    <Container bg = {bg} >
      {
        menu.map(item =>  <MenuItem key={item._id}  {...item} />)
      }
    </Container>
  )
}

export default MenuList