import React from 'react'
import "./bigChartBox.scss";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    name: "Sun",
    sugar: 4000,
    rice: 2400,
    oil: 2400,
  },
  {
    name: "Mon",
    sugar: 3000,
    rice: 1398,
    oil: 2210,
  },
  {
    name: "Tue",
    sugar: 2000,
    rice: 9800,
    oil: 2290,
  },
  {
    name: "Wed",
    sugar: 2780,
    rice: 3908,
    oil: 2000,
  },
  {
    name: "Thu",
    sugar: 1890,
    rice: 4800,
    oil: 2181,
  },
  {
    name: "Fri",
    sugar: 2390,
    rice: 3800,
    oil: 2500,
  },
  {
    name: "Sat",
    sugar: 3490,
    rice: 4300,
    oil: 2100,
  },
  {
    name: "SUN",
    sugar: 2480,
    rice: 5500,
    oil: 1000,
  },
];
const RevenueChat = () => {
  return (
    <div className="bigChartBox">
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sugar"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="rice"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="oil"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChat