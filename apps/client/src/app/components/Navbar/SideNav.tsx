import React from 'react';
import { MailOutlined, BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { profile } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ICourse } from '../../api/api-types';

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
  const items: MenuProps['items'] = [
    getItem('Courses', 'courses', <BookOutlined />,
      courses.map((course, index) => (
        getItem(course.courseName, course.courseName.toLowerCase()
        ))
      )
    ),
    getItem('Profile', 'profile', <MailOutlined />,
      profile.map((profile, index) => (
        getItem(profile.title, ''
        ))
      )
    )
  ];
  const navigate = useNavigate();
  return (
    <Menu
      onClick={(e) => {
        if (e.keyPath[1] === 'courses') {
          console.log(e);
          navigate(`/courses/${e.key}`);
        } else if (e.keyPath[1] === 'profile') {
          navigate(`/profile/${e.key}`);
        }
      }}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

