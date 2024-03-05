import React from 'react'
import BarChartBox from '../barChartBox/BarChartBox';
import {barChartBoxRevenue} from '../../data/data'
const FastSellingItems = () => {
  return (
    <BarChartBox {...barChartBoxRevenue} />
  )
}

export default FastSellingItems