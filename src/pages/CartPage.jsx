import React, { useState, useEffect } from 'react';
import { Layout, Table, InputNumber, Button, Typography, Row, Col, Card, Empty, Space, Badge, Tag, Divider, Grid } from 'antd';
import { 
  DeleteOutlined, 
  ArrowLeftOutlined, 
  SafetyCertificateOutlined,
  LockOutlined,
  ShoppingOutlined,
  CheckCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const CartPage = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  // Helper untuk format harga
  const formatPrice = (price) => {
    return `Rp ${Number(price).toLocaleString('id-ID')}`;
  };

  // Handler quantity dengan safety
  const handleQtyChange = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty >= 1 && newQty <= 99) {
      updateQuantity(id, newQty);
    }
  };

  // Columns untuk Desktop Table
  const columns = [
    {
      title: <Text strong style={{ fontSize: 14, color: '#595959' }}>Produk</Text>,
      key: 'product',
      width: '40%',
      render: (_, record) => (
        <Space size={16} align="center">
          <div style={{ 
            width: 80, 
            height: 120, 
            borderRadius: 12, 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            flexShrink: 0,
            background: '#f5f5f5'
          }}>
            <img 
              src={record.image} 
              alt={record.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ maxWidth: 250 }}>
            <Text strong style={{ 
              fontSize: 15, 
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: 4
            }}>
              {record.title}
            </Text>
            <Text type="secondary" style={{ fontSize: 13, display: 'block' }}>
              {record.author}
            </Text>
            <Tag color={record.category === 'fiksi' ? 'purple' : 'cyan'} style={{ 
              marginTop: 6, 
              borderRadius: 20, 
              fontSize: 11,
              textTransform: 'uppercase'
            }}>
              {record.category}
            </Tag>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 14, color: '#595959' }}>Harga Satuan</Text>,
      key: 'price',
      width: '18%',
      align: 'center',
      render: (_, record) => (
        <Text style={{ fontSize: 15, color: '#666', fontWeight: 500, whiteSpace: 'nowrap' }}>
          {formatPrice(record.price)}
        </Text>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 14, color: '#595959' }}>Jumlah</Text>,
      key: 'quantity',
      width: '22%',
      align: 'center',
      render: (_, record) => (
        <QuantityControl 
          qty={record.quantity} 
          onMinus={() => handleQtyChange(record.id, record.quantity, -1)}
          onPlus={() => handleQtyChange(record.id, record.quantity, +1)}
          onChange={(val) => updateQuantity(record.id, val)}
        />
      ),
    },
    {
      title: <Text strong style={{ fontSize: 14, color: '#595959' }}>Subtotal</Text>,
      key: 'subtotal',
      width: '15%',
      align: 'right',
      render: (_, record) => (
        <Text strong style={{ 
          fontSize: 16, 
          color: '#fa8c16',
          whiteSpace: 'nowrap',
          display: 'block'
        }}>
          {formatPrice(record.price * record.quantity)}
        </Text>
      ),
    },
    {
      title: '',
      key: 'action',
      width: '5%',
      align: 'center',
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

  // Component Quantity Control (Shared untuk Desktop & Mobile)
  const QuantityControl = ({ qty, onMinus, onPlus, onChange }) => (
    <div style={{ 
      display: 'inline-flex', 
      alignItems: 'center',
      border: '1px solid #d9d9d9',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#fff'
    }}>
      <Button 
        size="small"
        icon={<MinusOutlined style={{ fontSize: 12 }} />}
        disabled={qty <= 1}
        onClick={onMinus}
        style={{ 
          border: 'none',
          borderRadius: 0,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
      <InputNumber 
        min={1} 
        max={99} 
        value={qty} 
        readOnly
        controls={false}
        onChange={onChange}
        style={{ 
          width: 50, 
          border: 'none',
          textAlign: 'center',
        }}
      />
      <Button 
        size="small"
        icon={<PlusOutlined style={{ fontSize: 12 }} />}
        onClick={onPlus}
        style={{ 
          border: 'none',
          borderRadius: 0,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );

  // Mobile Cart Item Card
  const MobileCartItem = ({ item }) => (
    <Card 
      style={{ 
        marginBottom: 16, 
        borderRadius: 16,
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
      bodyStyle={{ padding: 16 }}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Gambar */}
        <div style={{ 
          width: 90, 
          height: 130, 
          borderRadius: 12, 
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          flexShrink: 0
        }}>
          <img 
            src={item.image} 
            alt={item.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <Text strong style={{ 
              fontSize: 16, 
              display: 'block',
              lineHeight: 1.4,
              marginBottom: 4
            }}>
              {item.title}
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {item.author}
            </Text>
          </div>

          <Tag color={item.category === 'fiksi' ? 'purple' : 'cyan'} style={{ 
            width: 'fit-content',
            borderRadius: 20, 
            fontSize: 11,
            textTransform: 'uppercase',
            margin: 0
          }}>
            {item.category}
          </Tag>

          <div style={{ marginTop: 'auto' }}>
            <Text strong style={{ fontSize: 18, color: '#fa8c16', display: 'block' }}>
              {formatPrice(item.price * item.quantity)}
            </Text>
            {item.quantity > 1 && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                {formatPrice(item.price)} x {item.quantity}
              </Text>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => removeFromCart(item.id)}
            style={{ padding: '4px 8px' }}
          />
        </div>
      </div>

      {/* Quantity Control di Baris Terpisah */}
      <div style={{ 
        marginTop: 16, 
        paddingTop: 16,
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text type="secondary" style={{ fontSize: 13 }}>Jumlah:</Text>
        <QuantityControl 
          qty={item.quantity}
          onMinus={() => handleQtyChange(item.id, item.quantity, -1)}
          onPlus={() => handleQtyChange(item.id, item.quantity, +1)}
          onChange={(val) => updateQuantity(item.id, val)}
        />
      </div>
    </Card>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <TopBar cartCount={cartCount} onSearch={() => {}} />

      <Content style={{ 
        padding: isMobile ? '16px 12px 24px' : '24px 20px 40px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%' 
      }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? 16 : 24 }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8,
            color: '#595959',
            fontSize: 14
          }}>
            <ArrowLeftOutlined /> {isMobile ? 'Kembali' : 'Kembali Belanja'}
          </Link>
          <div style={{ 
            marginTop: isMobile ? 12 : 16, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12 
          }}>
            <Title level={isMobile ? 3 : 2} style={{ margin: 0, fontWeight: 700 }}>
              Keranjang
            </Title>
            <Badge 
              count={cartCount} 
              style={{ backgroundColor: '#1677ff', fontWeight: 600 }}
            />
          </div>
        </div>

        {cartItems.length > 0 ? (
          <Row gutter={[16, 16]}>
            {/* Kolom Kiri: Daftar Barang */}
            <Col xs={24} lg={16}>
              {/* Desktop: Table */}
              {!isMobile && (
                <Card 
                  style={{ 
                    borderRadius: 16, 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  bodyStyle={{ padding: 0 }}
                >
                  <Table 
                    dataSource={cartItems} 
                    columns={columns} 
                    rowKey="id" 
                    pagination={false}
                    style={{ width: '100%' }}
                  />
                </Card>
              )}

              {/* Mobile: Card Layout */}
              {isMobile && (
                <div>
                  {cartItems.map(item => (
                    <MobileCartItem key={item.id} item={item} />
                  ))}
                </div>
              )}

              {/* Trust Signals - Desktop saja yang 2 kolom, Mobile 1 kolom */}
              <div style={{ 
                marginTop: isMobile ? 16 : 24, 
                display: 'flex', 
                gap: 12, 
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <Card 
                  size="small" 
                  style={{ 
                    flex: 1,
                    borderRadius: 12,
                    background: '#f0f7ff',
                    border: '1px solid #d6e4ff'
                  }}
                  bodyStyle={{ padding: isMobile ? 12 : 16 }}
                >
                  <Space align="center">
                    <SafetyCertificateOutlined style={{ 
                      fontSize: isMobile ? 20 : 24, 
                      color: '#1677ff' 
                    }} />
                    <div>
                      <Text strong style={{ display: 'block', color: '#1677ff', fontSize: 13 }}>
                        Pembayaran Aman
                      </Text>
                      <Text style={{ fontSize: 12, color: '#595959' }}>SSL Encrypted</Text>
                    </div>
                  </Space>
                </Card>
                
                <Card 
                  size="small" 
                  style={{ 
                    flex: 1,
                    borderRadius: 12,
                    background: '#f6ffed',
                    border: '1px solid #d9f7be'
                  }}
                  bodyStyle={{ padding: isMobile ? 12 : 16 }}
                >
                  <Space align="center">
                    <CheckCircleOutlined style={{ 
                      fontSize: isMobile ? 20 : 24, 
                      color: '#52c41a' 
                    }} />
                    <div>
                      <Text strong style={{ display: 'block', color: '#52c41a', fontSize: 13 }}>
                        Garansi 100%
                      </Text>
                      <Text style={{ fontSize: 12, color: '#595959' }}>Uang Kembali</Text>
                    </div>
                  </Space>
                </Card>
              </div>
            </Col>

            {/* Kolom Kanan: Ringkasan */}
            <Col xs={24} lg={8}>
              <div style={{ 
                position: isMobile ? 'static' : 'sticky', 
                top: 100 
              }}>
                <Card 
                  style={{ 
                    borderRadius: 16, 
                    boxShadow: isMobile ? '0 -4px 20px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.08)',
                    border: 'none',
                    background: '#fff'
                  }}
                  bodyStyle={{ padding: isMobile ? 20 : 24 }}
                >
                  <Title level={4} style={{ marginBottom: 20, fontWeight: 700 }}>
                    Ringkasan
                  </Title>
                  
                  <Space direction="vertical" style={{ width: '100%' }} size={14}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#8c8c8c' }}>
                        Total Item ({cartCount})
                      </Text>
                      <Text style={{ fontSize: 15, fontWeight: 500 }}>
                        {formatPrice(cartTotal)}
                      </Text>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#8c8c8c' }}>Pengiriman</Text>
                      <Tag color="success" style={{ borderRadius: 6, fontSize: 12 }}>Gratis</Tag>
                    </div>

                    <Divider style={{ margin: '8px 0', borderColor: '#f0f0f0' }} />

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '4px 0'
                    }}>
                      <Text strong style={{ fontSize: 15 }}>Total</Text>
                      <Title level={3} style={{ 
                        margin: 0, 
                        color: '#fa8c16',
                        fontWeight: 800,
                        fontSize: isMobile ? 22 : 26,
                        whiteSpace: 'nowrap'
                      }}>
                        {formatPrice(cartTotal)}
                      </Title>
                    </div>

                    <Button 
                      type="primary" 
                      size="large" 
                      block 
                      icon={<LockOutlined />}
                      onClick={() => navigate('/payment')}
                      style={{ 
                        height: isMobile ? 48 : 52, 
                        fontSize: 16, 
                        fontWeight: 700,
                        borderRadius: 12,
                        background: '#1677ff',
                        border: 'none',
                        boxShadow: '0 8px 20px rgba(22, 119, 255, 0.3)',
                        marginTop: 8
                      }}
                    >
                      Bayar Sekarang
                    </Button>

                    <div style={{ 
                      padding: '10px 14px',
                      background: '#f6ffed',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      border: '1px solid #d9f7be'
                    }}>
                      <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: 18 }} />
                      <Text style={{ fontSize: 12, color: '#389e0d', fontWeight: 500 }}>
                        Transaksi dijamin aman
                      </Text>
                    </div>
                  </Space>
                </Card>
              </div>
            </Col>
          </Row>
        ) : (
          <EmptyCart onBack={() => navigate('/')} isMobile={isMobile} />
        )}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f8fafc', color: '#8c8c8c', padding: '24px 0' }}>
        <Text type="secondary">BookThree ©{new Date().getFullYear()}</Text>
      </Footer>
    </Layout>
  );
};

// Component Empty State
const EmptyCart = ({ onBack, isMobile }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: isMobile ? '50vh' : '60vh'
  }}>
    <Card 
      style={{ 
        borderRadius: 20, 
        textAlign: 'center',
        padding: isMobile ? '40px 24px' : '60px 40px',
        width: '100%',
        maxWidth: 450,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: 'none'
      }}
    >
      <div style={{
        width: isMobile ? 90 : 120,
        height: isMobile ? 90 : 120,
        background: '#f0f5ff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px'
      }}>
        <ShoppingCartOutlined style={{ fontSize: isMobile ? 45 : 60, color: '#1677ff' }} />
      </div>
      <Title level={isMobile ? 4 : 3} style={{ marginBottom: 8 }}>Keranjang Kosong</Title>
      <Paragraph type="secondary" style={{ marginBottom: 24, fontSize: 14 }}>
        Yuk, cari buku favoritmu sekarang!
      </Paragraph>
      <Button 
        type="primary" 
        size="large"
        block={isMobile}
        onClick={onBack}
        style={{ 
          height: 44, 
          padding: isMobile ? '0 32px' : '0 24px',
          borderRadius: 10,
          fontWeight: 600
        }}
      >
        Mulai Belanja
      </Button>
    </Card>
  </div>
);

export default CartPage;