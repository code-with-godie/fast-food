import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const Wrapper = styled.div`
    padding: 0.5rem;
    width: 100%;
    position: absolute;
    top: 1.5rem;
    display: flex;
    justify-content: center;
    z-index: 100000;
`;
const Container = styled.p`
    padding: 0.5rem;
    width: 90%;
    max-width: 400px;
    text-align: center;
    border-radius: 0.3rem;
    background-color: #e6e6e6db;
    background-color: TOMATO;
    color: #000000da;
    font-family: 'Poppins', sans-serif;
`;
const Toast = ({ messege, }) => {
    const {closeToast,toastMessage} = useAppContext();
    useEffect(() => {
        setTimeout(closeToast, 2000);
    }, []);
    return ReactDom.createPortal(
        <Wrapper>
            <Container> {toastMessage} </Container>
        </Wrapper>,
        document.getElementById('model')
    );
};

export default Toast;
