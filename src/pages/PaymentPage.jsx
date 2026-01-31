import React, { useState } from 'react';
import { 
  Layout, Form, Input, Button, Radio, Row, Col, Card, Typography, 
  Divider, Modal, Result, Space 
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SafetyCertificateOutlined, 
  CreditCardOutlined, 
  WalletOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const PaymentPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // Ambil Data Keranjang
  const { cartItems, cartTotal, clearCart } = useCart();
  
  // Ambil Logic Checkout
  const { processCheckout, isLoading } = useCheckout();

  // State Lokal UI (Hanya untuk Popup Sukses)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Redirect jika keranjang kosong (dan bukan sedang sukses bayar)
  if (cartItems.length === 0 && !isSuccessModalOpen) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <Title level={3}>Keranjang Kosong</Title>
        <Button type="primary" onClick={() => navigate('/')}>Belanja Dulu</Button>
      </div>
    );
  }

  // Handler saat form disubmit
  const handleFinish = async (values) => {
    // Panggil fungsi dari Hook useCheckout
    const result = await processCheckout(values, cartItems, cartTotal);

    if (result.success) {
      // Jika sukses, update UI
      setOrderId(result.orderCode);
      setIsSuccessModalOpen(true);
      clearCart();
    }
    // Jika gagal, pesan error sudah ditangani oleh message.error di hook
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      
      {/* Header Simple */}
      <div style={{ background: '#fff', padding: '15px 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 15 }}>
          <Link to="/cart" style={{ color: '#333' }}> <ArrowLeftOutlined /> Kembali</Link>
          <Divider type="vertical" />
          <Title level={4} style={{ margin: 0 }}>Checkout Pengiriman</Title>
        </div>
      </div>

      <Content style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ paymentMethod: 'nontunai' }}
        >
          <Row gutter={32}>
            
            {/* KOLOM KIRI: FORM DATA DIRI */}
            <Col xs={24} lg={15}>
              <Card title="Alamat Pengiriman" bordered={false} style={{ borderRadius: 12, marginBottom: 20 }}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Nama Lengkap" name="fullname" rules={[{ required: true, message: 'Wajib diisi' }]}>
                      <Input placeholder="Contoh: Budi Santoso" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Nomor HP / WhatsApp" name="phone" rules={[{ required: true, message: 'Wajib diisi' }]}>
                      <Input placeholder="0812..." size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Email (Opsional)" name="email" rules={[{ type: 'email', message: 'Format email salah' }]}>
                  <Input placeholder="budi@example.com" size="large" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Provinsi" name="province" rules={[{ required: true, message: 'Wajib diisi' }]}>
                      <Input placeholder="Jawa Barat" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Kabupaten/Kota" name="city" rules={[{ required: true, message: 'Wajib diisi' }]}>
                      <Input placeholder="Bandung" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Kecamatan" name="district" rules={[{ required: true, message: 'Wajib diisi' }]}>
                      <Input placeholder="Coblong" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Kode Pos" name="postalCode" rules={[{ required: true, message: 'Wajib diisi' }]}>
                      <Input placeholder="40132" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Detail Alamat" name="address" rules={[{ required: true, message: 'Wajib diisi' }]}>
                  <TextArea rows={3} placeholder="Jl. Ganesha No. 10..." />
                </Form.Item>
              </Card>

              {/* CARD METODE PEMBAYARAN */}
              <Card title="Metode Pembayaran" bordered={false} style={{ borderRadius: 12 }}>
                <Form.Item name="paymentMethod" style={{ marginBottom: 0 }}>
                  <Radio.Group style={{ width: '100%' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Radio.Button value="nontunai" style={{ height: 'auto', padding: '15px', borderRadius: 8, width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <CreditCardOutlined style={{ fontSize: 24, color: '#1677ff' }} />
                          <div>
                            <Text strong>Non Tunai (QRIS / Transfer)</Text>
                            <div style={{ fontSize: 12, color: '#888' }}>Proses otomatis cek status</div>
                          </div>
                        </div>
                      </Radio.Button>

                      <Radio.Button value="tunai" style={{ height: 'auto', padding: '15px', borderRadius: 8, width: '100%', marginTop: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <WalletOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                          <div>
                            <Text strong>Tunai (COD)</Text>
                            <div style={{ fontSize: 12, color: '#888' }}>Bayar ditempat saat kurir datang</div>
                          </div>
                        </div>
                      </Radio.Button>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Col>

            {/* KOLOM KANAN: RINGKASAN */}
            <Col xs={24} lg={9}>
              <Card style={{ borderRadius: 12, position: 'sticky', top: 20 }}>
                <Title level={4}>Ringkasan Pesanan</Title>
                <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 20 }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <Text style={{ width: '70%' }}>{item.title} (x{item.quantity})</Text>
                      <Text>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</Text>
                    </div>
                  ))}
                </div>
                
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <Title level={4}>Total Bayar</Title>
                  <Title level={4} style={{ color: '#fa8c16' }}>
                    Rp {cartTotal.toLocaleString('id-ID')}
                  </Title>
                </div>

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block 
                  loading={isLoading} // Loading dari Hook
                  style={{ height: 50, fontSize: 16, borderRadius: 8 }}
                >
                  Bayar Sekarang
                </Button>

                <div style={{ marginTop: 20, textAlign: 'center', color: '#888', fontSize: 12 }}>
                  <SafetyCertificateOutlined /> Data anda dilindungi enkripsi
                </div>
              </Card>
            </Col>

          </Row>
        </Form>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        BookThree ©{new Date().getFullYear()}
      </Footer>

      {/* POPUP SUKSES */}
      <Modal
        open={isSuccessModalOpen}
        footer={null}
        closable={false}
        centered
        width={500}
      >
        <Result
          status="success"
          title="Pembayaran Berhasil!"
          subTitle={
            <div style={{ textAlign: 'center' }}>
              <Text>Terima kasih telah berbelanja.</Text>
              <br />
              <Text type="secondary">Nomor Order Anda:</Text>
              <Title level={3} style={{ margin: '10px 0', color: '#1677ff', letterSpacing: 2 }}>
                {orderId}
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Simpan nomor ini untuk mengecek status pesanan Anda.
              </Text>
            </div>
          }
          extra={[
            <Button type="primary" key="home" onClick={() => navigate('/')}>
              Kembali ke Beranda
            </Button>
          ]}
        />
      </Modal>

    </Layout>
  );
};

export default PaymentPage;