import React from 'react';
import { MailOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { profile } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ICourse } from '../../api/api-types';
import { useStore } from '../../stores/setupContext';
import { Chat } from '../Chat/Chat';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}


export const SideNav: React.FC<{ courses: ICourse[] }> = ({ courses }) => {
  const { navbar, auth } = useStore();
  const { search, courses: Courses, getAll, setChosenCourse, isLoading } = navbar;
  const { logout } = auth;


  const items: MenuProps['items'] = [
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Courses', 'courses', <BookOutlined />,
      courses.map((course, index) => (
        getItem(course.courseName, course.courseName
        ))
      )
    ),
    getItem('Profile', 'profile', <MailOutlined />,
      profile.map((profile, index) => (
        getItem(profile.title, profile.linkTo
        ))
      )
    ),
  ];
  const navigate = useNavigate();
  return (
    <Menu
      onClick={(e) => {
        if (e.keyPath[1] === 'courses') {
          setChosenCourse(e.key);
          navigate(`/courses/${e.key}`);
        } else if (e.keyPath[1] === 'profile') {
          if(e.key === 'signout'){
            logout();
            navigate('/auth');
          }else{

            navigate(`/${e.key}`);
          }
        } else if (e.keyPath[1] === 'profile') {
          navigate(`/chat`);
        }  else {
          navigate('/');

        }
      }}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

