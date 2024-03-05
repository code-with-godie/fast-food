import React from 'react'
import styled from 'styled-components';
import RevenueChat from './RevenueChat';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
    flex: 1;
`
const Title = styled.h1`
    color: white;
    text-transform: capitalize;
    text-align: center;
font-size: 2rem;
`
const ChatContainer = styled.div`
flex: 1;
`

const RevenueAnalysis = () => {
  return (
    <Container>
        <Title>profit analysis for best 3 selling items</Title>
        <ChatContainer>
        <RevenueChat/>
        </ChatContainer>
    </Container>
  )
}

export default RevenueAnalysis