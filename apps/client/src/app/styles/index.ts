import styled from 'styled-components';
import { Card, Typography, Button } from 'antd';

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #efdac7;
`;

export const StyledSection = styled.section`
  height: 100vh;
  background-color: #9a616d;
`;

export const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  padding: 5rem 0;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled.div`
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 50%;
  @media (min-width: 768px) {
    display: flex;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const StyledImageContainer = styled.div`
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledImage = styled.img`
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 100%;
  border-radius: 1rem 0 0 1rem;
`;

export const StyledCardBody = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export const ProfileCard = styled(Card)`
  min-width: 30vw;
  border-radius: 15px;
  text-align: center;
`;

export const ProfileBackground = styled.div`
min-height: 100vh;
background-color: #EFDAC7;
display: flex;
justify-content: center;
align-items: center;`;

export const ProfileContent = styled.div`
display: flex;
justify-content: space-between;
text-align: center;
margin-top: 5rem;
margin-bottom: 2rem;
`;
export const NotFoundContainer = styled.div`
  position: relative;
  height: 100vh;
`;

export const NotFoundWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 560px;
  width: 100%;
  padding-left: 160px;
  line-height: 1.1;
`;

export const NotFound404 = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 140px;
  height: 140px;
  background-image: url('./delete.png'); 
  background-size: cover;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(2.4);
    border-radius: 50%;
    background-color: #f2f5f8;
    z-index: -1;
  }
`;

export const NotFoundTitle = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 65px;
  font-weight: 700;
  margin-top: 0px;
  margin-bottom: 10px;
  color: #03565B;
  text-transform: uppercase;
`;

export const NotFoundSubtitle = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: 21px;
  font-weight: 400;
  margin: 0;
  text-transform: uppercase;
  color: #03565B;
`;

export const NotFoundText = styled.p`
  font-family: 'Nunito', sans-serif;
  color: #999fa5;
  font-weight: 400;
`;

export const NotFoundLink = styled.a`
  font-family: 'Nunito', sans-serif;
  display: inline-block;
  font-weight: 700;
  border-radius: 40px;
  text-decoration: none;
  color: #786283;
`;