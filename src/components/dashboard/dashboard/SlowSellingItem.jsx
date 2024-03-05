import React from 'react'
import {PieChartBox} from './pieChart/PieChartBox'
import styled from 'styled-components';
const SlowSellingItem = () => {
  const Container = styled.div`
    flex: 1;
    padding:1rem;
    color:  white;
  `
  return <Container>
    <PieChartBox/>
  </Container>
}

export default SlowSellingItem