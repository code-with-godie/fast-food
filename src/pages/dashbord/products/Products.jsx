import { useEffect, useState } from "react";
import "./products.scss";
import DataTable from "../../../components/dashboard/dataTable/DataTable";
import AddProduct from "../../../components/dashboard/product/AddProduct";
import Model from '../../../components/model/Model'
import { useFetch } from '../../../api/useFetch'
import LoadingAnimation from "../../../components/loading/LoadingAnimation";
import RemoveProduct from "../../../components/dashboard/product/RemoveProduct";
import { deleteData } from "../../../api/apiCalls";
import UpdateProduct from '../../../components/dashboard/product/UpdateProduct'
import noavatar from '../../../assets/noavatar.png' 
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const columns = [
  {
    field: "img",   
    headerName: "product Image",
    width: 150,
    renderCell: (params) => {
      return <img width={100} height={100} src={params.row.image || noavatar} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Title",
    width: 100,
  },
  {
    field: "categories",
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
  // {
  //   field: "isAcoholic",
  //   headerName: "Acoholic",
  //   width: 80,
  //    renderCell: (params) => <p> {params.row.isAcoholic? 'True':'False'} </p>
  // },
  {
    field: "description",
    headerName: "product Description",
    width: 250,
  },
  {
    field: "instructions",
    headerName: "instructions",
    width: 200,
    type: "string",
    renderCell: (params) => {
      params.row?.instructions?.map(item => <li key={item} > {item} </li>)
    }
  },
  // {
  //   field: "inStock",
  //   headerName: "In Stock",
  //   width: 150,
  //   type: "boolean",
  // },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [remove, setRemove] = useState(false);
  const [products,setProducts] = useState([])
  const [product,setProduct] = useState({})
  const {loading,error,data} = useFetch('/products');

  useEffect(()=>{
    if(data){

      setProducts(data?.products)
    }
  },[data])
   useEffect(()=>{
    console.log(product);
  },[product])

  if(loading){
    return <LoadingAnimation/>
  } 
  if(error){
    return <h1>something went wrong!!!</h1>
  } 
  const handleDelete = async (id)=>{
    try {
      const res = await deleteData(`/products/single/${id}`);
      if(res){
        
        // window.location.reload();
           setProducts(products.filter(item => item._id !== id));
          //  console.log(res);
          toast.success('product successfully deleted',{
        position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    }) 

      }
    } catch (error) {
        toast.error('error occured',{
        position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    }) 
      
    }

  }

 
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add new stock</button>
      </div>
      <DataTable setProduct ={setProduct} updateProduct = {setUpdate} handleDelete = {handleDelete} slug="products" columns={columns} rows={products} setOpen = {setOpen} />
      {open && <Model bg = ' #0000005c' center >
        <AddProduct  open = {open} setOpen={setOpen} setProducts={setProducts} />
        </Model>}
      {update && <Model bg = ' #0000005c' center >
        <UpdateProduct products={products} product = {product} open = {update} setOpen={setUpdate} setProducts={setProducts} />
        </Model>}
      {remove && <Model bg = ' #0000005c' center >
        <RemoveProduct setOpen={setOpen} />
        </Model>}
        <ToastContainer/>
    </div>
  );
};

export default Products;
