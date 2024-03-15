import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useStore } from '../../stores/setupContext';
import { CourseContent, CourseTitle, QuizzButton, FirstIcon, SecondIcon,ContentDiv} from '../../styles';
import img1 from '../../../assets/elearning.png';
import img2 from '../../../assets/elearning (1).png';


interface ContentProps{
    courseTitle : string
}

export const Content : React.FC<ContentProps>= observer(({courseTitle})=>{
    const { content } = useStore();
    const { getContent ,content: courseContent} = content
    useEffect(()=>{
        getContent(courseTitle)
    },[])
    console.log(courseContent.courseTitle)
    return (
        <ContentDiv>
            <CourseTitle>{courseContent.courseTitle}</CourseTitle>
            <FirstIcon src={img1}></FirstIcon>
            <CourseContent>{courseContent.content}</CourseContent>
            <SecondIcon src={img2}></SecondIcon>
            <QuizzButton>Take a quizz</QuizzButton>
            
        </ContentDiv>
    )
})