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
  const { search, courses: Courses } = navbar;
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
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
                    courses.map((course, index) => (
                      <Menu.Item onClick={() => {
                        navigate(`/courses/${course.title.toLowerCase()}`);
                      }} key={course.key}>{course.title}</Menu.Item>
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
          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
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
            <SideNav />
          </Drawer>
        </Row>
      </Header>
    </Layout>
  );
});


