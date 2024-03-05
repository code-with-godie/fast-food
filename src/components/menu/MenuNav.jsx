import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HorizontantalNav from './HorizontantalNav';
import VerticalNav from './VerticalNav';
import { useFetch } from '../../api/useFetch'
import LoadingAnimation from '../loading/LoadingAnimation';
const Container = styled.div`
  flex: 1;

`

const MenuNav = ({setSlug,slug}) => {
  const [nav,setNav] = useState([]);
  const {data,loading,error} = useFetch('/products/nav');
  useEffect(()=>{
    data && setNav(data?.categories);
  },[data])
  if(loading) return <LoadingAnimation large />
  if(error) return <h1>something went wrong</h1>;
  return (
    <Container>
      <HorizontantalNav nav = {nav} setSlug ={setSlug} />
      <VerticalNav setSlug ={setSlug} nav = {nav} slug={slug}  />
    </Container>
  )
}

export default MenuNav