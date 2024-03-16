import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';

export const items: MenuProps['items'] = [
  {
    label: 'Courses',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'R&D',
        children: [
          {
            label: 'Coding',
            key: 'setting:1'
          }
        ]
      }
    ]
  },
  {
    label: 'Profile',
    key: 'Divider',
    icon: <MailOutlined />,
    children: [
      {
        label: 'Option 3',
        key: 'setting:3'
      },
      {
        label: 'Option 4',
        key: 'setting:4'
      }
    ]
  }
];


export const courses = [
  {
    title: 'Art',
    key: '2'
  },
  {
    title: 'Math',
    key: '3'
  }
];


export const profile = [
  {
    title: 'My Profile',
    key: '4',
    linkTo: 'profile'
  },
  {
    title: 'Sign Out',
    key: '5',
    linkTo: 'signout'
  }
];
