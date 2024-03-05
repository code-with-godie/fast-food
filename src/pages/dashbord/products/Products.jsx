import { useEffect, useState } from "react";
import "./products.scss";
import DataTable from "../../../components/dashboard/dataTable/DataTable";
// import { products } from "../../../data/data";
import AddProduct from "../../../components/dashboard/product/AddProduct";
import Model from '../../../components/model/Model'
import { useFetch } from '../../../api/useFetch'
import LoadingAnimation from "../../../components/loading/LoadingAnimation";
import RemoveProduct from "../../../components/dashboard/product/RemoveProduct";
const columns = [
  {
    field: "img",   
    headerName: "product Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 100,
  },
  {
    field: "category",
    type: "string",
    headerName: "category",
    width: 100,
  },
   {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 80,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 80,
  },
  {
    field: "description",
    headerName: "product Description",
    width: 200,
  },
  // {
  //   field: "createdAt",
  //   headerName: "Creation date",
  //   width: 200,
  //   type: "string",
  // },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [remove, setRemove] = useState(false);
  const [products,setProducts] = useState([])
  const {loading,error,data} = useFetch('/products');

  useEffect(()=>{
    if(data){

      setProducts(data?.products)
    }
  },[data])

  if(loading){
    return <LoadingAnimation/>
  } 
  if(error){
    return <h1>something went wrong!!!</h1>
  } 

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add new stock</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} setOpen = {setOpen} />
      {open && <Model bg = ' #0000005c' center >
        <AddProduct  open = {open} setOpen={setOpen} setProducts={setProducts} />
        </Model>}
      {remove && <Model bg = ' #0000005c' center >
        <RemoveProduct setOpen={setOpen} />
        </Model>}
    </div>
  );
};

export default Products;
