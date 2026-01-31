import React, { useState } from 'react';
import { Layout, Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // --- SIMULASI LOGIN (Nanti diganti request ke API GoLang) ---
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'admin123') {
        
        // 1. Simpan tanda login di LocalStorage
        localStorage.setItem('bookthree_token', 'rahasia-admin-token');
        localStorage.setItem('bookthree_role', 'admin');

        message.success('Login Berhasil! Selamat datang Admin.');
        
        // 2. Arahkan ke Dashboard
        navigate('/admin/dashboard');
      } else {
        message.error('Username atau Password salah!');
      }
      setLoading(false);
    }, 1000); // Simulasi delay 1 detik
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' // Background gradient halus
      }}>
        
        <Card 
          style={{ 
            width: 400, 
            borderRadius: 12, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '20px'
          }}
          bordered={false}
        >
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ 
              background: '#1677ff', 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 15px'
            }}>
              <LockOutlined style={{ fontSize: 24, color: '#fff' }} />
            </div>
            <Title level={3} style={{ margin: 0 }}>Admin Portal</Title>
            <Text type="secondary">Silakan login untuk mengelola toko</Text>
          </div>

          <Form
            name="login_admin"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Masukkan Username!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Username" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Masukkan Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                icon={<LoginOutlined />}
                style={{ fontWeight: 600 }}
              >
                MASUK
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              BookThree Administrator System
            </Text>
          </div>
        </Card>

      </Content>
    </Layout>
  );
};

export default LoginPage;