import React from 'react'
import styled from 'styled-components';
// import LatestStock from './LatestStock';
import RevenueAnalysis from './revenue/RevenueAnalysis';
import SlowSellingItem from './SlowSellingItem';
import FastSellingItems from './FastSellingItems';

const Container = styled.div`
  /* border-radius:.5rem; */
  padding:.5rem;
  display: flex;
  gap:1rem;
  flex-wrap: wrap;
  overflow: auto;
  /* @media screen and (min-width: 768px) {
    height: 350px;
  } */
`

const WrapperOne = styled.div`
  flex:1  0 300px;
  background-color: #262E39;
  border-radius:.5rem;
  overflow: auto;
   height: 400px;
  
  ` 
const WrapperTwo = styled.div`
  flex:1  0 300px;
  background-color: #262E39;
  border-radius:.5rem;
  overflow: auto;
  height: 400px;
  display: flex;
  
  ` 
const WrapperThree= styled.div`
 height: 400px;
  flex:3 0 500px;
  background-color: #262E39;
  border-radius:.5rem;
  overflow: auto;

` 
const BusinessInfo = () => {
  return (
    <Container>
      <WrapperOne>
        <FastSellingItems/>
        {/* <LatestStock/> */}
      </WrapperOne>
      <WrapperTwo>
        <SlowSellingItem/>
      </WrapperTwo>
      <WrapperThree>
        <RevenueAnalysis/>
      </WrapperThree>
    </Container>
  )
}

export default BusinessInfo