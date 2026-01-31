import React, { useState } from 'react';
import { Modal, Input, Button, Steps, Typography, Divider, Card, Tag, Alert } from 'antd';
import { SearchOutlined, SolutionOutlined, DropboxOutlined, CarOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CheckOrderModal = ({ isOpen, onClose }) => {
  const [orderCode, setOrderCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async () => {
    if (!orderCode) return;

    setLoading(true);
    setErrorMsg("");
    setOrderData(null);

    try {
      // Panggil API GoLang yang baru kita buat
      const response = await fetch(`https://bookthree.api.miproduction.my.id/api/check-order?code=${orderCode}`);
      
      if (response.status === 404) {
        setErrorMsg("Nomor pesanan tidak ditemukan.");
        setLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Gagal mengambil data");

      const data = await response.json();
      setOrderData(data);
    } catch (err) {
      setErrorMsg("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk menentukan Step aktif berdasarkan status code (100-103)
  const getCurrentStep = (status) => {
    if (status === 104) return -1; // Batal
    return status - 100; // 100->0, 101->1, 102->2, 103->3
  };

  return (
    <Modal
      title="Cek Status Pesanan"
      open={isOpen}
      onCancel={() => {
        onClose();
        setOrderData(null);
        setOrderCode("");
        setErrorMsg("");
      }}
      footer={null}
      width={600}
    >
      {/* 1. INPUT SEARCH */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Input 
          placeholder="Masukkan Kode Pesanan (Contoh: B3-2025-XXXX)" 
          value={orderCode}
          onChange={(e) => setOrderCode(e.target.value)}
          size="large"
          onPressEnter={handleSearch}
        />
        <Button type="primary" size="large" icon={<SearchOutlined />} onClick={handleSearch} loading={loading}>
          Cek
        </Button>
      </div>

      {/* 2. PESAN ERROR */}
      {errorMsg && <Alert message={errorMsg} type="error" showIcon style={{ marginBottom: 20 }} />}

      {/* 3. HASIL PENCARIAN */}
      {orderData && (
        <div style={{ marginTop: 20 }}>
          <Divider orientation="left">Detail Pesanan</Divider>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <Text type="secondary">Pembeli:</Text><br/>
              <Text strong>{orderData.customer_name}</Text>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Text type="secondary">Total Tagihan:</Text><br/>
              <Text strong style={{ color: '#fa8c16' }}>Rp {orderData.total_amount.toLocaleString('id-ID')}</Text>
            </div>
          </div>

          {/* 4. VISUALISASI STATUS (STEPS) */}
          {orderData.status === 104 ? (
             <Alert message="Pesanan Dibatalkan" type="error" showIcon />
          ) : (
            <Steps 
              current={getCurrentStep(orderData.status)} 
              items={[
                { title: 'Menunggu', icon: <SolutionOutlined /> },
                { title: 'Diproses', icon: <DropboxOutlined /> },
                { title: 'Dikirim', icon: <CarOutlined /> },
                { title: 'Selesai', icon: <SmileOutlined /> },
              ]}
            />
          )}

          {/* Info Tambahan */}
          <Card style={{ marginTop: 20, background: '#f9f9f9' }} size="small" bordered={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Metode Bayar:</Text>
                <Tag color={orderData.payment_method === 'tunai' ? 'green' : 'blue'}>
                    {orderData.payment_method.toUpperCase()}
                </Tag>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                <Text>Tanggal Order:</Text>
                <Text>{new Date(orderData.date).toLocaleDateString('id-ID')}</Text>
            </div>
          </Card>

        </div>
      )}
    </Modal>
  );
};

export default CheckOrderModal;