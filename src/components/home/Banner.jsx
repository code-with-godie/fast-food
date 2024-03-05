import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { AccessTime, KeyboardArrowDown} from '@mui/icons-material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import url from '../../assets/banner.png'
// import animation from '../../assets/animation.webm'
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
const Container = styled.section`
height:90vh;
background:#00000027 url(${props => props.url}) no-repeat top left;
background-size: cover;
position: relative;
display: flex;
align-items: center;
justify-content: center;
`
const ModelContainer = styled.div`
padding:.5rem;
flex: 1;
display: flex;
flex-direction: column;
gap:1rem;
align-items: flex-start;
a{
  color: white;
  text-decoration: none;
  @media screen and (max-width:768px) {
    padding-left: 1rem;
  }
}
a:hover{
  text-decoration: underline;
}
`
const Title = styled.h1`
font-size:3rem;
color: #ffffff;
align-self: stretch;
@media screen and (max-width: 768px){
  text-align: center;
  padding: 0.5rem;
}
`
const FormContainer = styled.form`
display: flex;
gap: 1rem;
width: 100vw;
flex-direction: column;
max-width: 800px;
  padding:.7rem;
@media screen and (min-width: 768px) {
  flex-direction: row;
  align-items: center;

}
`
const FormWrapper = styled.div`
display: flex;
align-items: center;
gap:.5rem;
padding:1rem;
background-color: white;
&.big{
  flex: 1;
}
.icon{
  color: #000000c9;
}
 @media screen and (max-width:768px) {
    border-radius:.5rem;
  }
`
const FormInput = styled.input`
background: transparent;
border: none;
outline: none;
font-size: 1rem;
flex: 1;
`
const Label = styled.p`
  color: black;
  font-weight: 200;
  font-size: 1rem;
`
const FormLabel = styled.button`
color: white;
background-color: #000000ec;
font-size: 1.2rem;
text-transform: capitalize;
padding: 1rem;
border-radius:.5rem;
border: none;
cursor: pointer;
`
// const Animation = styled.video`
//   max-width: 100%;
//   height: auto;
//   object-fit: contain;
//   position: absolute;
//   top: 20px;
//   right: 10px;
//   z-index: 0;
//   `
const Banner = () => {
  const ref = useRef();
   const navigate = useNavigate();
  const search  = e => {
    e.preventDefault()
  }
  const {changeScrollValue} = useAppContext();
    const createObserver = () => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                  if(entry.isIntersecting){
                    changeScrollValue(false)
                  }else{
                    changeScrollValue(true)
                  }
                });
            },
            { threshold: 0.60 }
        );
        return observer;
    };

    useEffect(() => {
        const observer = createObserver();
        if(ref){
          observer.observe(ref.current);
        }
    }, [ref]);
  return (
    <Container url = {url} ref={ref} >
      <ModelContainer>
        <Title>Order delivery near you</Title>
        <FormContainer onSubmit={search} >
          <FormWrapper className='big' >
            <LocationOnIcon className='icon'/>
          <FormInput placeholder='Enter delivery address' />
          </FormWrapper>
          <FormWrapper>
            <AccessTime className='icon'/>
            <Label>Deliver  now</Label>
          <KeyboardArrowDown/>
          </FormWrapper>
            <FormLabel onClick={()=> navigate('/menu')} >order now</FormLabel>
        </FormContainer>
        <Link className='link' to='/auth/login' >or sign in</Link>
      </ModelContainer>
      {/* <Animation  src={animation} autoPlay loop /> */}
    </Container>
  )
}

export default Banner