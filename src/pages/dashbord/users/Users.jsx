import DataTable from "../../../components/dashboard/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
// import { user } from "../../data/data";
import React from "react";
import Add from "../../../components/dashboard/add/Add";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useFetch } from '../../../api/useFetch'
import LoadingAnimation from '../../../components/loading/LoadingAnimation'
import { useAppContext } from "../../../context/AppContext";
// import Add from "../../components/add/Add";
import noavatar from '../../../assets/noavatar.png'
import Model from "../../../components/model/Model";
import UpdateUser from "../../../components/dashboard/users/UpdateUser";
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { deleteData } from "../../../api/apiCalls";
const columns = [
  {
    field: "profilePic",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.profilePic || noavatar} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 100,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 100,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Join Date",
    width: 250,
    type: "string",
    renderCell:(params =>{
      let formattedDate = moment(params.row.createdAt).format('dddd-MM-Do-YYYY h:mm:ss A');
      return <p> {formattedDate} </p>
    })
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useAppContext();
  const navigate = useNavigate();


  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({});
  const {loading,data,error} = useFetch('/users');
    const handleDelete = async (id)=>{
    try {
      const res = await deleteData(`/users/delete/${id}`);
      if(res){
           setUsers(prev => prev.filter(item => item._id !== id));
          toast.success('product successfully deleted',{
        position: "top-right",
autoClose: 1000,
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
      console.log(error);
        toast.error('error occured',{
        position: "top-right",
autoClose: 1000,
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

  useEffect(()=>{
    if(data){
      setUsers(data?.users)
      console.log(data);
    }
  },[data])
 
  if(loading){
    return <LoadingAnimation large />
  }
  if(error){
    return <h1>something went wrong</h1>
  }
  return (
    <div className="users">
      <div className="info">
        <h1>Flesh Grub Users</h1>
        {/* <button onClick={() => setOpen(true)}>Update users details</button> */}
      </div>
      <DataTable updateProduct = {setOpen} setProduct = {setUser} slug="users" columns={columns} rows={users} handleDelete ={handleDelete}  />
          {open && <Model bg = ' #0000005c' center >
        <UpdateUser setUsers={setUsers} users={users} user={user}  open = {open} setOpen={setOpen} setProducts={setUsers} />
        </Model>}
        <ToastContainer/>
    </div>
  );
};

export default Users;
