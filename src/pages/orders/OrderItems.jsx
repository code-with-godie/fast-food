import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { DataGrid } from '@mui/x-data-grid';
const Wraper = styled.div`
min-height: 500px;
padding:.5rem;
overflow: auto;
display: flex;
justify-content: center;
.link{
  text-decoration: none;
  color: white;
  font-size: .8rem;
  background-color: #434848;
  padding:.5rem;
  border-radius:.5rem;
  text-transform: capitalize;
}
.link:hover{
  text-decoration: underline;
}
button{
  padding:.5rem;
  border: none;
  border-radius:.5rem;
  &.success{
    background-color: #6cee6c;
    color: #ffffff;
  }
}
img{
    border-radius:.5rem;
    cursor: pointer;
}
  
`
const Container = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
width: 100%;
max-width: 900px;
.grid{
  * {
    flex: 1;
  }
}
`
const OrderItems = () => {
    const {orderID} = useParams();
      const [myRows,setRows] = useState([])
    const {data,loading,error} = useFetch(`/order/items/${orderID}`);

    useEffect(()=>{
        if(data){

            data && console.log(data);
            setRows(data?.items?.orderItems)
        }
    },[data])
    const columns = [
  { field: 'image', headerName: 'Product',flex:2 ,renderCell:params =><img src={params.row.image}  alt='product url'/> },
  { field: 'name', headerName: 'Name' ,flex:1  },
  { field: 'price', headerName: 'Price per item' ,flex:1  },
  { field: 'description', headerName: 'description' ,flex:1.5   },
  { field: 'quantity', headerName: 'Quantity' ,flex:0.8  },
  { field: 'product', headerName: 'product link' ,flex:1,renderCell:params =><Link to={`/menu/${params.row._id}`} className='link' >see more</Link>   },
];
if (loading) {
  return <Wraper>
    <Container>
      <LoadingAnimation large />
    </Container>
  </Wraper>
}
if (error) {
  return <Wraper>
    <Container>
      <h1>something went wrong!!!!</h1>
    </Container>
  </Wraper>
}
  return (
    <Wraper>
      <Container>
        <DataGrid rowHeight={150} getRowId={row => row._id} rows={myRows} columns={columns} />
      </Container>
    </Wraper>
  )
}

export default OrderItems