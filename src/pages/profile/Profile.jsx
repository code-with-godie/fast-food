// import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { useDropzone } from 'react-dropzone';
import { postData } from '../../api/apiCalls';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    gap: 1rem;
`
const Container = styled.section`
    /* height: 100%; */
    /* overflow: auto; */
    display: flex;
    width: 100%;
    max-width: 700px;
    background-color: white;
    flex-direction: column;
    gap:.5rem;
    padding: 1rem;
`;
const Form = styled.form`
display: flex;
flex-direction: column;
gap:.5rem;
`
const FormInput = styled.input`
padding:.7rem;
font-size: 1rem;
background: #eeeeee64;
outline: none;
border:none;
border-radius:.5rem;
::placeholder{
  color: #000000b8;
}
`
const FormButton = styled.button`
padding:.7rem;
font-size: 1rem;
background: #000000b6;
outline: none;
border:none;
border-radius:.5rem;
color: white;
text-transform: capitalize;
cursor: pointer;
&:disabled{
  cursor: not-allowed;
  background-color: #9f9898;
}
`
const InputWrapper = styled.div`
display: flex;
flex-direction: column;
gap:.3rem;
&.profile{
    display: flex;
    align-items: center;
    .photo{
        width: 150px;
        height: 150px;
    }
}
`
const Label = styled.p`
font-size:.8rem;
color: #030303;
`
const Profile = () => {
    const notify = ()=> toast.success('wow',{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    })
    const {user:loggedInUser,token,openToast,setUser:setLoggedInUser}= useAppContext();
      const [user,setUser] = useState({firstName:loggedInUser?.firstName,lastName:loggedInUser.lastName, email:loggedInUser.email,profilePic:loggedInUser?.profilePic});
      const [disabled,setDisabled] = useState(true);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = e =>{
   const name =  e.target.name;
   const value = e.target.value;
    setUser(prev => ({...prev,[name]:value}))
  }
    const handleSubmit = async (e)=>{
         e.preventDefault();
    try {
      setLoading(true);
      const res  = await postData(`/users/profile/${loggedInUser?._id}`,user,token);
      if(res){
        setLoggedInUser({user:res?.user,token});
         toast.success('🚀.Your profile have been updated',{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
// transition: Bounce,
    })
        // navigate('/auth/login')
      }
    } catch (error) {
    const  message = error?.response?.data?.message || 'something went wrong';
      openToast(message);
      console.log(error);
      
    }

    finally{
      setLoading(false);
    }
    }
     const { getInputProps, getRootProps, acceptedFiles, isDragActive } =
        useDropzone({
            accept: { 'image/*': ['jpg', '.webp', 'png', 'jpeg','PNG'] },
            maxFiles: 1,
        });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[acceptedFiles.length - 1];
            const type = file?.type.split('/')[0];
            if (type !== 'image') {
                return;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(acceptedFiles[acceptedFiles.length - 1]);
            fileReader.onload = () => {
                setUser(prev => ({...prev,profilePic:fileReader.result}))
            };
        }
    }, [acceptedFiles]);
    useEffect(()=>{
    if(user?.firstName?.length >= 3 && user?.lastName?.length >= 3 && user.email){
      setDisabled(false)
    }else{
      setDisabled(true);
    }
  },[user])
    useEffect(()=>{
        setUser({firstName:loggedInUser?.firstName,lastName:loggedInUser.lastName, email:loggedInUser.email,profilePic:loggedInUser?.profilePic})
  },[loggedInUser])
    return (
        <Wrapper>
        <Container>

               <Form onSubmit={handleSubmit} >
        <InputWrapper className='profile' >
            <IconButton {...getRootProps({ hover: isDragActive })}  >
              <Avatar className='photo' src={user?.profilePic} alt={user?.firstName} />
                    <input
                        {...getInputProps({
                            type: 'file',
                            hidden: true,
                        })}/>

            </IconButton>

        </InputWrapper>
        <InputWrapper>
        <FormInput value={user.firstName} onChange={e =>handleChange(e)} name='firstName' placeholder='Enter your first name' />
        <Label>Atleat 3 characters</Label>
        </InputWrapper>
        <InputWrapper>
        <FormInput value={user.lastName} onChange={e =>handleChange(e)} name='lastName' placeholder='Enter your last name' />
        <Label>Atleat 3 characters</Label>

        </InputWrapper>
        <FormInput type='email' value={user.email} onChange={e =>handleChange(e)} name='email' placeholder='Enter your  email address' />
        <FormButton disabled = {disabled} > {loading ? <LoadingAnimation/> : 'continue'} </FormButton>
      </Form>
        </Container>
        <ToastContainer>

        </ToastContainer>
        </Wrapper>
    );
};

export default Profile;
