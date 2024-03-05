import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";

// type Props = {
//   id: number;
//   img?: string;
//   title: string;
//   info: object;
//   chart?: {
//     dataKeys: { name: string; color: string }[];
//     data: object[];
//   };
//   activities?: { time: string; text: string }[];
// };

const Single = (props) => {
const handleClick = ()=>{
  
}
  return (
    <div className="single">
          <div className="topInfo">
            {props.img && <img src={props?.img} alt="" />}
          </div>
      <div className="view">
        <div className="info">
          <div className="details">
            <h1>{props.title}</h1>
              <div className="item" >
                <span className="itemTitle">buying price :</span>
                <span className="itemValue">{props?.buyingPrice} Kshs.</span>
              </div>
              <div className="item" >
                <span className="itemTitle">selling price :</span>
                <span className="itemValue">{props?.sellingPrice} Kshs.</span>
              </div>
              <div className="item" >
                <span className="itemTitle">quantity :</span>
                <span className="itemValue">{props?.quantity}</span>
              </div>
              <div className="item" >
                <span className="itemTitle">discount :</span>
                <span className="itemValue">{props?.discount} Kshs.</span>
              </div>
              <div className="item" >
                <span className="itemTitle">instock :</span>
                <span className="itemValue">{props?.inStock ? 'True' : 'False'}</span>
              </div>
              {/* <div className="item" >
                <span className="itemTitle">category :</span>
                <span className="itemValue">{props?.categories[0] || 'not psecified'}</span>
              </div> */}
            <button onClick={ ()=> props.openModel(true)} >Update</button>
          </div>
        </div>
        {/* <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}*/}
      </div> 
      {/* <div className="activities">
        <h2>Latest Activities and actions</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default Single;
