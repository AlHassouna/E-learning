import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Row, Col } from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  BookOutlined
} from '@ant-design/icons';

import { observer } from 'mobx-react';
import { SearchInput } from '../../core';
import { SideNav } from './SideNav';
import { courses, profile } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/setupContext';
import { SearchBar } from '../../styles';

const { Header } = Layout;
const { SubMenu } = Menu;

export const Navbar: React.FC = observer(() => {
  const { navbar, auth } = useStore();
  const { logout } = auth;
  const { search, courses: Courses, getAll, setChosenCourse, isLoading } = navbar;
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCourses = async () => {
      await getAll();
    };
    fetchCourses();
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {

        <Layout className="layout">
          {/*@ts-ignore*/}
          <style jsx>{`
            .css-dev-only-do-not-override-1drr2mu .ant-col-xs-2 {
            }
          `}</style>
          <Header style={{ padding: 0 }}>
            <Row justify="space-between" align="middle">
              <Col xs={0} sm={0} md={24}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                  <Menu.Item onClick={() => {
                    navigate('/');
                  }} key="home">Home</Menu.Item>

                  <SearchBar>
                    <SubMenu key="courses" icon={<BookOutlined />} title="Courses">
                      {
                        Courses.map((course, index) => (
                          <Menu.Item onClick={() => {
                            setChosenCourse(course.courseName);
                            navigate(`/courses/${course.courseName.toLowerCase()}`);
                          }} key={course._id}>{course.courseName}</Menu.Item>
                        ))
                      }
                    </SubMenu>
                    <SearchInput search={search} />
                  </SearchBar>
                  <SubMenu key="profile" icon={<UserOutlined />} title="Profile">
                    {
                      profile.map((profile, index) => (
                        profile.title === 'Sign Out' ?
                          <Menu.Item danger onClick={() => {
                            logout();
                            navigate('/auth');
                          }} key={profile.key}>{profile.title}</Menu.Item>
                          :
                          <Menu.Item onClick={() => {
                            navigate(`/${profile.linkTo}`);
                          }} key={profile.key}>{profile.title}</Menu.Item>
                      ))
                    }
                  </SubMenu>
                </Menu>
              </Col>
              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginRight: '20px'
              }}>
                <Col xs={2} sm={2} md={0}>
                  <Button type="primary" onClick={showDrawer}>
                    <MenuOutlined />
                  </Button>
                </Col>
              </div>
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => {
                  if (visible) {
                    onClose();
                  }
                }}
                visible={visible}
              >
                <SideNav courses={Courses} />
              </Drawer>
            </Row>
          </Header>
        </Layout>
      }
    </>

  );
});


