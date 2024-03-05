import React from 'react'
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
display: flex;
padding:.5rem;
gap:.5rem;
overflow: auto;
::-webkit-scrollbar{
  height: 2px;
}
@media screen and (min-width: 768px) {
  display: none;
}
`
const Item = styled.div`
  padding:.5rem 1.3rem;
  flex-shrink: 0;
  background-color: #27272fe3;
  color: white;
  font-size:1.2rem;
  text-transform: capitalize;
  border-radius:1rem;
  cursor: pointer;
`
const HorizontantalNav = ({nav}) => {
  const {filterProducts} = useAppContext()
  return (
    <Container>
      {
        nav.map((item,index)=><Item key={index} onClick={()=> filterProducts(item)} > {item} </Item>)
        }
    </Container>
  )
}

export default HorizontantalNav