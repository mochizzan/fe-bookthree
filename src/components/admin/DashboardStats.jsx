import React from 'react';
import { Card, Row, Col, Statistic, Table, Button, Typography } from 'antd';
import { BookOutlined, ShoppingOutlined, UsergroupAddOutlined, DollarOutlined } from '@ant-design/icons'; // Ganti Icon User

const { Title } = Typography;

const DashboardStats = ({ stats, recentTransactions, getStatusTag, onSeeAll }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {/* Total Buku */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Total Buku" 
              value={stats.totalBooks} 
              prefix={<BookOutlined style={{ color: '#1890ff', background: '#e6f7ff', padding: 8, borderRadius: '50%' }} />} 
            />
          </Card>
        </Col>

        {/* Total Transaksi */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Total Transaksi" 
              value={stats.totalTransactions} 
              prefix={<ShoppingOutlined style={{ color: '#52c41a', background: '#f6ffed', padding: 8, borderRadius: '50%' }} />} 
            />
          </Card>
        </Col>

        {/* Total Pembeli (Unik) */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Total Pembeli" 
              value={stats.totalUser} 
              prefix={<UsergroupAddOutlined style={{ color: '#fa8c16', background: '#fff7e6', padding: 8, borderRadius: '50%' }} />} 
            />
          </Card>
        </Col>

        {/* Total Omset */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Total Omset" 
              value={stats.omset} 
              precision={0}
              prefix={<DollarOutlined style={{ color: '#f5222d', background: '#fff1f0', padding: 8, borderRadius: '50%' }} />} 
              formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabel Ringkas */}
      <div style={{ marginTop: 24, background: '#fff', padding: 24, borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
           <Title level={4} style={{ margin: 0 }}>Pesanan Terbaru</Title>
           <Button type="link" onClick={onSeeAll}>Lihat Semua</Button>
        </div>
        
        <Table 
          columns={[
            { title: 'No Resi', dataIndex: 'order_code', key: 'order_code' }, // Sesuaikan dengan JSON Backend (order_code)
            { title: 'Pelanggan', dataIndex: 'customer_name', key: 'customer_name' }, // Sesuaikan (customer_name)
            { title: 'Total', dataIndex: 'total_amount', render: (val) => `Rp ${val.toLocaleString('id-ID')}` },
            { title: 'Status', dataIndex: 'status', render: (val) => getStatusTag(val) },
          ]}
          dataSource={recentTransactions}
          rowKey="id"
          pagination={false}
        />
      </div>
    </>
  );
};

export default DashboardStats;