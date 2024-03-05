import React from 'react'
import styled from 'styled-components';
import Banner from '../../components/home/Banner'
import PopularCategories from '../../components/home/PopularCategories';
import HowItWorks from '../../components/home/HowItWorks';
import LetDoitTogether from '../../components/home/LetDoitTogether';
const Container = styled.section`
/* height:100vh;
overflow: auto; */
`
const Home = () => {
  return (
    <Container>
      <Banner/>
      <HowItWorks/>
      <PopularCategories/>
      <LetDoitTogether/>
    </Container>
  )
}

export default Home