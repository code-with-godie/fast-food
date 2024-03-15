import React from 'react'
import {PieChartBox} from './pieChart/PieChartBox'
import styled from 'styled-components';
  const Container = styled.div`
    flex: 1;
    padding:1rem;
    color:  white;
  `
const SlowSellingItem = () => {

  return <Container>
    <PieChartBox/>
  </Container>
}

export default SlowSellingItem