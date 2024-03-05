import React from 'react'
import { Avatar, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import styled from 'styled-components';
const Profile = () => {

  const Container = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  justify-content: space-between;
  flex-direction: column;
   @media screen and (min-width:768px) {
    flex-direction: row;
  }
  `
  const InputContainer = styled.div`
    display: flex;
    flex: 1;
    max-width: 600px;
    border: 2px solid #f85e37;
    border: 2px solid white;
    border-radius: 2rem;
    .search{
      font-size: 2rem;
      color: white;
    }
`;
  const Input = styled.input`
    flex: 1;
    border: none;
    font-size: 1rem;
    background:transparent ;
    outline: none;
    color: white;
    ::placeholder{
      /* color: white; */
      text-transform: capitalize;
      
    }
`;
const SearchButton = styled.button`
    background: #11181dd1;
    border: 1px solid white;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    outline: none;
    padding: 0 1rem;
    text-transform: capitalize;
    font-size: 1.2rem;
    cursor: pointer;
    color: #ffffff;
`;
const ProfileContainer = styled.div`
  display: flex;
  gap:.3rem;
  align-items: center;
  .profile{
    width: 70px;
    height: 70px;
  }
`
const ProfileDescription = styled.p`
text-transform: capitalize;
color: white;
  font-weight: 200;
  font-size: 1.2rem;
`
  return (
    <Container>

                <InputContainer>
                    <IconButton>
                        <Search  className='search' />
                    </IconButton>
                    <Input placeholder='search for a product...' />
                    <SearchButton>Search</SearchButton>
                </InputContainer>
                <ProfileContainer>
                  <ProfileDescription> <strong>welcome</strong> <br/> godfrey </ProfileDescription>
                  <IconButton>
                    <Avatar src="godfrey" className='profile' />
                  </IconButton>
                </ProfileContainer>
    </Container>
  )
}

export default Profile