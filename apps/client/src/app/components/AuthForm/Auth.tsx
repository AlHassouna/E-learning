import Logo from '../../images/cat.png';
import {
  LockOutlined,
  UserOutlined,
  MailOutlined
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider, ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components';
import { Space, Tabs, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/setupContext';
import { LoadingSpin } from '../../core/index';
import {
  AuthPage
} from '../../styles/index';
type LoginType = 'signup' | 'signin';


interface AuthProps {
  login: ({ email, password }: { email: string; password: string }) => void;
  signupF: ({ username, email, password, role }: {
    username: string,
    email: string;
    password: string,
    role: string
  }) => void;
  isLoadingResponse: boolean;
}

export const Auth: React.FunctionComponent<AuthProps> = ({ login, signupF, isLoadingResponse }) => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('signin');
  const [submitButtonHoverColor, setSubmitButtonHoverColor] = useState<string>('white');
  const { auth } = useStore();
  const { authMessage } = auth;
  const navigate = useNavigate();
  const submitter1 = {
    searchConfig: {
      submitText: isLoadingResponse ? <LoadingSpin /> : 'Sign In'
    },
    submitButtonProps: {
      style: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'var(--primary-color)',
        color: submitButtonHoverColor,
        transition: 'color 0.3s'
      },
      onMouseEnter: () => {
        setSubmitButtonHoverColor('#0D8A8F');
      },
      onMouseLeave: () => {
        setSubmitButtonHoverColor('white');
      }
    }
  };

  const submitter2 = {
    searchConfig: {
      submitText: isLoadingResponse ? <LoadingSpin /> : 'Sign Up'
    },
    submitButtonProps: {
      style: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'var(--primary-color)',
        color: submitButtonHoverColor,
        transition: 'color 0.3s'
      },
      onMouseEnter: () => {
        setSubmitButtonHoverColor('#0D8A8F');
      },
      onMouseLeave: () => {
        setSubmitButtonHoverColor('white');
      }
    }
  };
  const handleFormSubmit = async (values: any) => {
    try {
      if (loginType === 'signup') {
        signupF({
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role
        });
      } else {
        login({ email: values.email, password: values.password });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AuthPage hashed={false}>
      {/* @ts-ignore */}
      <style jsx>{`.styles__StyledCard-o52hax-10.eXqbUD{

          @media (max-width: 768px) {
            width: 100%;
          }
          
        }`}</style>

      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          submitter={loginType === 'signin' ? submitter1 : submitter2}
          onFinish={handleFormSubmit}
          logo={Logo}
          title="Grow With Us!"
          subTitle="Welcome to SKILCAT, the best place to grow your skills!"
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'signup'} tab={'Sign-up'} />
            <Tabs.TabPane key={'signin'} tab={'Log-in'} />
          </Tabs>
          {loginType === 'signup' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />
                }}
                placeholder={'Username'}
                rules={[
                  {
                    required: true,
                    message: 'Username is required!'
                  }
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={'prefixIcon'} />
                }}
                placeholder={'Email'}
                rules={[
                  {
                    required: true,
                    message: 'Email is required!'
                  }
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          Password strength: medium
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          Password strength: strong
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>
                        Password strength: weak
                      </div>
                    );
                  }
                }}
                placeholder={'Password'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required!'
                  }
                ]}
              />
              <ProFormCheckbox noStyle name="role">
                Are you a teacher?{' '}
              </ProFormCheckbox>
            </>
          )}
          {loginType === 'signin' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={'prefixIcon'} />
                }}
                name="email"
                placeholder={'Email'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email!'
                  }
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />
                }}
                placeholder={'Password'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required!'
                  }
                ]}
              />
            </>
          )}
        </LoginForm>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 34px'
          }}
        >
          <div>
            {
              authMessage && (
                <div style={{ color: token.colorError }}>
                  {authMessage}
                </div>
              )
            }
          </div>
          <a
            onClick={() => {
              navigate('/forgot-password');
            }}
          >
            Forgot Password?
          </a>
        </Space>
        <Space
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '0px'
          }}
        >

        </Space>
      </div>

    </AuthPage>
  );
};
