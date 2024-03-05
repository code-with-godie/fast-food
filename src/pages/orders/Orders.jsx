import React, { useEffect, useState } from 'react'
import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import styled from 'styled-components'
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { useAppContext } from '../../context/AppContext';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

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
const Orders = () => {
  const {user} = useAppContext();
  const {data,loading,error} = useFetch(`/order/${user?._id}`);
  const [myRows,setRows] = useState([])

  useEffect(()=>{
    if(data){
      const newData = data?.orders.map(item => {
        const {user:{name,profilePic},amount,address,paymentType,_id,createdAt} = item;
        return ({name,profilePic,amount,address,paymentType,_id,date:createdAt})
      })
      setRows(newData)
    }
  },[data])
//   const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];
const columns = [
  { field: 'profilePic', headerName: 'Avatar',flex:0.7 ,renderCell:params =><Avatar src={params.row.profilePic} /> },
  { field: '_id', headerName: 'Order ID' ,flex:2.5},
  { field: 'name', headerName: 'Name' ,flex:1.7   },
  { field: 'address', headerName: 'Address' ,flex:1.5   },
  { field: 'paymentType', headerName: 'Payment' ,flex:0.8  },
  { field: 'amount', headerName: 'Amount' ,flex:.8   },
  { field: 'date', headerName: 'Date' ,flex:1.5  },
  { field: 'items', headerName: 'Items' ,flex:1.3,renderCell:params =><Link to={`/orders/items/${params.row._id}`} className='link' >view items</Link>   },
  { field: 'status', headerName: 'Status' ,flex:1 ,renderCell:params =><button className='success' >paid</button>   },
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
        <DataGrid 
           initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[25]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        rowHeight={70} 
        getRowId={row => row._id} 
        rows={myRows}
         columns={columns} />
      </Container>
    </Wraper>
  )
}

export default Orders