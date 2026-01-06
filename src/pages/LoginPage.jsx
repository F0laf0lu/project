import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, App, Layout, Typography, Space, Avatar, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import logo from "../assets/logo_stanbic1.png";


import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';


const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();
  const { login, authUser, generateOTP, validateOTP } = useAuth()
  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true);

    const loginResponse = await login(values.sapid, values.password)
    if (!loginResponse.Success) {
      showNotification('error', {
        message: loginResponse.Message || "Login Failed"
      })
      setLoading(false)
      return;
    }
    setShowOTP(true)
    setLoading(false)
    const otpResponse = await generateOTP(loginResponse.Data.User)
    if (!otpResponse.Success) {
      showNotification('error', {
        message: otpResponse.Message
      })
      return;
    }
    showNotification('success', {
      message: "OTP has been sent to your mail"
    })
    console.log(authUser)
  };

  const onOTPSubmit = async (values) => {
    setLoading(true);
    console.log(authUser.Email)
    const { Success, Message } = await validateOTP(authUser.Email, values.otp)
    if (!Success) {
      showNotification('error', {
        message: Message || "Invalid OTP"
      })
      setLoading(false)
      return
    }
    showNotification('success', {
      message: Message
    })
    setLoading(false)
    navigate('/dashboard');
  };

  const onOTPFailed = (errorInfo) => {
    console.log("wrong otp")
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setLoading(false)
    otpForm.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo.errorFields)
    errorInfo.errorFields.map((error) => console.log(error.name))
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Content style={{ display: 'flex', padding: 0 }}>

        {/* Left Column */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          minHeight: '100vh',
          background: '#ffffff'
        }}>

          <div style={{ width: '100%', maxWidth: '450px' }}>

            {!showOTP ? (
              // Login Form
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={logo} alt="" style={{ width: "100px", height: "100px" }} />
                  <Title level={2} style={{ margin: 0, color: '#1890ff' }}>Stanbic IBTC Trustees Limited</Title>
                  <Text type="secondary" style={{ fontSize: '16px' }}>Core Administration System V.1.0</Text>
                </div>

                <Form
                  name="login"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
                  size={"large"}
                >
                  <Form.Item
                    label="SAPID"
                    name="sapid"
                    labelCol={{
                      style: {
                        fontWeight: 'bold',
                      }
                    }}
                    rules={[{ required: true, message: 'Please input your SAPID' }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: '#6993FF', fontSize: '20px', padding: '8px' }} />}
                      placeholder="Enter your SAPID" ref={inputRef}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    labelCol={{
                      style: {
                        fontWeight: 'bold'
                      }
                    }}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: '#1890ff', fontSize: '20px', padding: '8px' }} />}
                      placeholder="Enter your password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      style={{
                        height: '48px',
                        background: '#1890ff',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            ) : (
              // OTP Verification Form
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                  <Avatar
                    size={56}
                    icon={<LockOutlined />}
                    style={{ backgroundColor: '#1890ff', marginBottom: '20px' }}
                  />
                  <Title level={2} style={{ margin: 0, color: '#1890ff' }}>Verify Your Identity</Title>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    Enter the code sent to your email
                  </Text>
                </div>

                <Form
                  name="otp"
                  form={otpForm}
                  onFinish={onOTPSubmit}
                  onFinishFailed={onOTPFailed}
                  autoComplete="off"
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="One-Time Password"
                    name="otp"
                    rules={[
                      { required: true, message: 'Please input the OTP code!' },
                      { len: 6, message: 'OTP must be 6 digits!' }
                    ]}
                  >
                    <Input
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      style={{
                        fontSize: '24px',
                        letterSpacing: '8px',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      style={{
                        height: '48px',
                        background: '#1890ff',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '12px'
                      }}
                    >
                      Verify & Continue
                    </Button>

                    <Button
                      block
                      onClick={handleBackToLogin}
                      style={{
                        height: '48px',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}
                    >
                      Back to Login
                    </Button>
                  </Form.Item>
                </Form>
              </Space>)
            }
          </div>
        </div>

        {/* Right Column */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh'
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            top: '-100px',
            right: '-100px'
          }} />
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            bottom: '-80px',
            left: '-80px'
          }} />
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            top: '50%',
            left: '20%'
          }} />

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '30px'
            }}>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}