import React from 'react';
import { Layout, Table, InputNumber, Button, Typography, Row, Col, Card, Empty } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useCart } from '../hooks/useCart';

import { useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const CartPage = () => {
const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  const columns = [
    {
      title: 'Produk Buku',
      dataIndex: 'book',
      key: 'book',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
          <img src={record.image} alt={record.title} style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 4 }} />
          <div>
            <Text strong>{record.title}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.author}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Harga Satuan',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `Rp ${price.toLocaleString('id-ID')}`,
    },
    {
      title: 'Kuantitas',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty, record) => (
        <InputNumber 
          min={1} 
          max={20} 
          value={qty} 
          onChange={(value) => updateQuantity(record.id, value)} 
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => (
        <Text strong style={{ color: '#fa8c16' }}>
          Rp {(record.price * record.quantity).toLocaleString('id-ID')}
        </Text>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => removeFromCart(record.id)} 
        />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* TopBar Reuse (Tanpa search function di halaman cart) */}
      <TopBar cartCount={cartCount} onSearch={() => {}} />

      <Content style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 20 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <ArrowLeftOutlined /> Kembali ke Katalog
          </Link>
          <Title level={2} style={{ marginTop: 10 }}>Keranjang Belanja</Title>
        </div>

        <Row gutter={24}>
          {/* Kolom Kiri: Daftar Barang */}
          <Col xs={24} lg={16}>
            <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              {cartItems.length > 0 ? (
                <Table 
                  dataSource={cartItems} 
                  columns={columns} 
                  rowKey="id" 
                  pagination={false} 
                  scroll={{ x: 600 }}
                />
              ) : (
                <Empty description="Keranjang masih kosong" />
              )}
            </Card>
          </Col>

          {/* Kolom Kanan: Ringkasan Pembayaran */}
          <Col xs={24} lg={8}>
            <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'sticky', top: 100 }}>
              <Title level={4}>Ringkasan Belanja</Title>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text>Total Buku ({cartCount})</Text>
                <Text>Rp {cartTotal.toLocaleString('id-ID')}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text>Diskon</Text>
                <Text type="success">-Rp 0</Text>
              </div>
              
              <div style={{ borderTop: '1px solid #eee', margin: '10px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Title level={4}>Total Tagihan</Title>
                <Title level={4} style={{ color: '#fa8c16' }}>Rp {cartTotal.toLocaleString('id-ID')}</Title>
              </div>

              <Button type="primary" size="large" block style={{ height: 50, fontSize: 16 }} onClick={() => navigate('/payment')}>
                Lanjut Pembayaran
              </Button>
              
              <div style={{ marginTop: 20, textAlign: 'center', color: '#888', fontSize: 12 }}>
                <SafetyCertificateOutlined /> Transaksi Aman & Terpercaya
              </div>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        BookThree ©{new Date().getFullYear()} Created by MochIzzan
      </Footer>
    </Layout>
  );
};

export default CartPage;