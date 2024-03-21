import React from "react";
import { Row, Col, Card } from 'antd';
import addImage from './add.png'; 
import removeImage from './remove.png'; 
import editImage from './edit.png';
import { Container, Heading, CustomCard, CustomImage } from '../../styles/adminStyle';
import { Link, useParams } from "react-router-dom";
function QuizzesManage() {
    const param = useParams()
    const addpagelink="/addquiz/"+param.courseId
    const deletepagelink="/deletequiz/"+param.courseId
    const editpagelink="/editquiz/"+param.courseId
  return (
    <Container>
      <div>
        <Heading>Course quizzes management page:</Heading>

        <Row justify="center" gutter={[16, 16]}>
          <Col >
          <Link to={addpagelink}>
            <CustomCard hoverable cover={<CustomImage alt="Add" src={addImage} />}>
              <Card.Meta title="Add Quiz" description="Add quizzes to the course" />
            </CustomCard>
            </Link>
          </Col>
          <Col >
          <Link to={deletepagelink}>
            <CustomCard hoverable cover={<CustomImage alt="Remove" src={removeImage} />}>
              <Card.Meta title="Delete Quiz" description="Delete quizzes in the course" />
            </CustomCard>
            </Link>
          </Col>
          <Col >
          <Link to={editpagelink}>
            <CustomCard hoverable cover={<CustomImage alt="Edit" src={editImage} />}>
              <Card.Meta title="Edit Quiz" description="Edit quizzes in the course" />
            </CustomCard>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default QuizzesManage;
