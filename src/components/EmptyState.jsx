import React from 'react';
import { Typography, Button, Result } from 'antd';
import { ReadOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const EmptyState = ({ type = 'empty', onRetry }) => {
  if (type === 'error') {
    return (
      <Result
        status="500"
        title="Gagal Terhubung ke Server"
        subTitle="Maaf, kami tidak bisa mengambil data buku saat ini. Pastikan koneksi internet lancar atau coba lagi nanti."
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
            Coba Lagi
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px', 
      background: '#fff', 
      borderRadius: '16px',
      border: '1px dashed #d9d9d9',
      margin: '20px 0'
    }}>
      <div style={{ 
        background: '#f5f5f5', 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%', 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <ReadOutlined style={{ fontSize: '36px', color: '#bfbfbf' }} />
      </div>
      
      <Title level={3} style={{ marginBottom: '8px', color: '#595959' }}>
        Belum Ada Buku
      </Title>
      
      <Text type="secondary" style={{ fontSize: '16px', maxWidth: '400px', display: 'inline-block' }}>
        Koleksi buku sedang disiapkan oleh admin. Silakan kembali lagi nanti untuk melihat katalog terbaru kami.
      </Text>

      <div style={{ marginTop: '30px' }}>
        <Button size="large" onClick={onRetry} icon={<ReloadOutlined />}>
          Muat Ulang
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;