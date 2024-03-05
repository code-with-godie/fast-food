import { useEffect, useState } from "react";
import Single from "../../components/product/Single"
import { setProduct as globalProduct } from "../../context/productSlice"
import "./product.scss"
import { useFetch } from "../../api/useFetch";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../components/loading/LoadingAnimation";
import Model from "../../components/model/Model";
import ProductModel from '../../components/product/ProductModel'
import { useDispatch } from "react-redux";
const Product = () => {
    const {id} = useParams();
    const [product,setProduct] = useState({});
    const {data,loading,error} = useFetch(`/products/${id}`);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(data){
            setProduct(data?.product)
            dispatch(globalProduct(data?.product))
        }
    },[data,dispatch])
    if(loading){
        return <LoadingAnimation/>
    }
    if(error){
        return <h1>something went wrong!!!</h1>
    }


  
  return (
    <div className="product">
      <Single {...product} openModel = {setOpen}  />
      {
        open &&
      <Model center>
        <ProductModel product = {product} setOpen={setOpen}   />
      </Model>
      }
    </div>
  )
}

export default Product