import React, { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { useFetch } from '../../../../api/useFetch'
import LoadingAnimation from '../../../../components/loading/LoadingAnimation'
// const slow = [
//   { name: "milk", value: 400, color: "#0088FE" },
//   { name: "tomato", value: 300, color: "#00C49F" },
//   { name: "beans", value: 300, color: "#FFBB28" },
//   { name: "maize flour", value: 200, color: "#FF8042" },
//   { name: "fat", value: 0, color: "#42ffd9" },
// ];

export const PieChartBox = () => {
    const {data,loading,error} = useFetch('/order/slowSelling');
    const [slow,setSlow] = useState([]);
    console.log(slow);
    const colors = useCallback(()=> ["#0088FE","#00C49F","#FFBB28","#FF8042","#42ffd9"],[])
    useEffect(()=>{
      if(data){
        const {products} = data;
        if(products){
          const tempData = products?.map((item,index) =>({name:item.name,value:item.price,color:colors[index]}))
          setSlow(tempData)

        }
        console.log(products);
      }
    },[data,colors])

  if(loading){
    return <LoadingAnimation/>;
  }
  if(error){
    return <h1>something went wrong</h1>
  }
  // if(slow?.length === 0){
  //   return <h1>no slow selling item</h1>
  // }
  return (
    <div className="pieChartBox">
      <h1>slow selling items</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={slow}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {slow.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {slow.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
