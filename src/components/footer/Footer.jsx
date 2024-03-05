import React from 'react'
import styled from 'styled-components';
import play from '../../assets/play.png'
import app from '../../assets/app.png'
const Container = styled.footer`
 display: grid;
  grid-template-columns:repeat(auto-fit,minmax(400px,1fr)) ;
  gap:1rem;
/* background:#626868;
background:#2E3333; */
background:rgb(29, 29, 29);
padding: 1rem 1rem 2rem 1rem;
`
const FooterItem = styled.div`
    background:#434848;
    padding:1rem;
`
const TextWrapper = styled.div`
    color: white;
`
const TextTitle = styled.h2`
    color: white;
`
const Text = styled.p`
    color: white;
    text-transform: capitalize;
    padding:.5rem;
    font-size:1rem;
    cursor: pointer;
    :hover{
        text-decoration: underline;
    }
`
const Image = styled.img`
    object-fit: contain;
    border-radius:.5rem;
    cursor: pointer;
    :hover{
        outline: 1px solid white;
    }
`
const ImageContainer = styled.div`
   display: flex;
   gap:.5rem;
   align-items: center;
padding:1rem 0;
`
const Footer = () => {
  return (
    <Container>
            <FooterItem>
                    <TextTitle>Discover Fresh grub</TextTitle>
                <TextWrapper>
                    <Text>Investors</Text>
            <Text>About Us</Text>
            <Text>Newsroom</Text>
            <Text>Engineering blog</Text>
            <Text>Design blog</Text>
            <Text>Gift Cards </Text>
            <Text>Fast Food Student</Text>
            <Text>Careers</Text>
            <Text>Restaurant signup</Text>
            <Text>Become a rider</Text>
                </TextWrapper>
            </FooterItem>
            <FooterItem>
                    <TextTitle>Legal</TextTitle>
                <TextWrapper>
                    <Text>Privacy</Text>
            <Text>cookies</Text>
            <Text>modern slavry statement</Text>
            <Text>text strategy</Text>
            <Text>section 172 statement</Text>
            <Text>public authority requests</Text>
                </TextWrapper>
            </FooterItem>
            <FooterItem>
                    <TextTitle>Help</TextTitle>
                <TextWrapper>
                                <Text>Investors</Text>
            <Text>Contact</Text>
            <Text>FAQs</Text>
            <Text>Cuisines</Text>
            <Text>Brands</Text>
                </TextWrapper>
            </FooterItem>
            <FooterItem>
                    <TextTitle>Take fresh grub with you</TextTitle>
                    <ImageContainer>
                <Image src={play} />
                <Image src={app} />
                    </ImageContainer>
            </FooterItem>
        </Container>
  )
}

export default Footer