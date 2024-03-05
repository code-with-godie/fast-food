import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MenuNav from './MenuNav';
import MenuList from './MenuList';
const Container = styled.div`
display: flex;
min-height: 300px;
display: flex;
flex-direction: column;

@media screen and (min-width: 768px) {
 flex-direction:row ;
}
`
const Menu = () => {
  const [slug,setSlug] = useState('burger');
  return (
    <Container>
        <MenuNav setSlug ={setSlug}  slug={slug} />
        <MenuList slug ={slug} />
    </Container>
  )
}

export default Menu