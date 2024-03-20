import React, { useEffect } from "react";
import { Row, Col, Card } from 'antd';
import { Link, useParams } from "react-router-dom";
import { Container, Heading, CustomCard, CustomImage } from '../../styles/adminStyle';
import { observer } from "mobx-react";
import { useStore } from "../../stores/setupContext";
const AllDelQuizzes: React.FC = observer(()=> {
  const { navbar, quiz } = useStore();
  const { courses, setCourseId } = navbar;
  const { getAllQuizzes, allQuizzesByCourse } = quiz;
  const chosenCourse = useParams().courseTitle 
    const deletepagelink="/deletequiz/"+chosenCourse+"/oo"
    
    useEffect(() => {
      const fetchContent = async () => {
        console.log(chosenCourse)
        await getAllQuizzes(chosenCourse as string);
      };
      fetchContent();
    }, [chosenCourse]);

    return (
        <Container>
            <Card>
      <div>
        <Heading>Delete quiz:</Heading>

        <Row justify="center" gutter={[16, 16]}>
        {allQuizzesByCourse.map((q)=>
          <Col >
          <Link to={deletepagelink}>
            <CustomCard hoverable >
              <Card.Meta title="Quiz 1" description="Description of quiz" />
            </CustomCard>
            </Link>
          </Col>

        )}
          
         
        </Row>
        
      </div>
      </Card>
    </Container>
      );
})

export default AllDelQuizzes;
