import { KeyboardArrowRight } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container =  styled.div`
    padding:4rem 1rem;
    background-color: #27272F;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`
const SmallNav = styled.div`
    display: flex;
    align-items: center;
    gap:.5rem;
`
const Labels = styled.p`
    font-size: 1rem;
    cursor: pointer;
    :hover{
        text-decoration: underline;
    }
`
const Header = () => {
    const navigate = useNavigate();
  return (
    <Container>
        <SmallNav>
            <Labels onClick={()=>{navigate('/')}}>Home</Labels>
            <KeyboardArrowRight/>
            <Labels onClick={()=>{navigate('/menu')}}>Menu</Labels>
        </SmallNav>
    </Container>
  )
}

export default Header