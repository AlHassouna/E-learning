import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #EFDAC7;
`;

export const CourseContent = styled.div`
  display: flex;
  justify-content: center;
  width : fit-content;
  margin : 0rem 10rem 0rem 10rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #9A616G;
`;

export const CourseTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9A616D;
  margin : 0 
`;

export const QuizzButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin : 0 auto ;
  background-color: #9A616D;
  border-radius : 4rem;
  padding : 1rem;
  display:block;
`;

export const FirstIcon = styled.img`
  width: 8%;
  hight: 8%;
`;

export const SecondIcon = styled.img`
  width: 8%;
  hight: 8%;
  margin-right:0;
  margin-left: auto;
  display:block;
`;

export const ContentDiv = styled.div`
  background-color: #EFDAC7;
  min-height: 100vh;
`;

export const StyledSection = styled.section`
  height: 100vh;
  background-color: #9A616D;
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
