import React from 'react';
import { Card, Row, Col, Table, Button, Typography, Badge, Space } from 'antd';
import { 
  BookOutlined, 
  ShoppingOutlined, 
  UserOutlined,
  ArrowUpOutlined,
  ArrowRightOutlined,
  WalletOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardStats = ({ stats, recentTransactions, getStatusTag, onSeeAll }) => {
  // Data statistik dengan konfigurasi visual
  const statConfigs = [
    { 
      key: 'totalBooks',
      title: 'Total Buku',
      value: stats.totalBooks,
      icon: <BookOutlined />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      lightColor: '#f0f5ff',
      prefix: ''
    },
    { 
      key: 'totalTransactions',
      title: 'Total Transaksi',
      value: stats.totalTransactions,
      icon: <ShoppingOutlined />,
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      lightColor: '#f6ffed',
      prefix: ''
    },
    { 
      key: 'totalUser',
      title: 'Pelanggan',
      value: stats.totalUser,
      icon: <UserOutlined />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      lightColor: '#fff0f6',
      prefix: ''
    },
    { 
      key: 'omset',
      title: 'Total Omset',
      value: stats.omset,
      icon: <WalletOutlined />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      lightColor: '#fff7e6',
      prefix: 'Rp ',
      formatter: (val) => val.toLocaleString('id-ID')
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Stats Grid */}
      <Row gutter={[16, 16]}>
        {statConfigs.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={stat.key}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative'
              }}
              bodyStyle={{ padding: '20px 24px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              {/* Background Gradient Accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 100,
                height: 100,
                background: stat.gradient,
                opacity: 0.1,
                borderRadius: '0 0 0 100%',
                transition: 'all 0.3s ease'
              }} />
              
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start' 
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: stat.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 20,
                    boxShadow: `0 4px 12px ${stat.gradient.replace('linear-gradient(135deg, ', '').replace(')', '')}40`
                  }}>
                    {stat.icon}
                  </div>
                  
                  {/* Trend Indicator (Visual only) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: '#52c41a',
                    fontSize: 12,
                    fontWeight: 600,
                    background: '#f6ffed',
                    padding: '4px 8px',
                    borderRadius: 20
                  }}>
                    <ArrowUpOutlined style={{ fontSize: 10 }} />
                    <span>Aktif</span>
                  </div>
                </div>

                {/* Value */}
                <div>
                  <Text type="secondary" style={{ 
                    fontSize: 13, 
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 4 
                  }}>
                    {stat.title}
                  </Text>
                  <Title level={3} style={{ 
                    margin: 0, 
                    fontWeight: 700,
                    fontSize: 26,
                    letterSpacing: '-0.5px',
                    color: '#1f1f1f'
                  }}>
                    {stat.prefix}{stat.formatter ? stat.formatter(stat.value) : stat.value}
                  </Title>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Transactions Section */}
      <Card
        style={{ 
          marginTop: 24, 
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid #f0f0f0'
        }}
        bodyStyle={{ padding: 0 }}
        title={
          <div style={{ 
            padding: '20px 24px 0',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 700 }}>Pesanan Terbaru</Title>
              <Text type="secondary" style={{ fontSize: 13, marginTop: 4, display: 'block' }}>
                {recentTransactions.length} transaksi terakhir
              </Text>
            </div>
            <Button 
              type="primary" 
              ghost
              icon={<ArrowRightOutlined />}
              onClick={onSeeAll}
              style={{ borderRadius: 8, fontWeight: 600 }}
            >
              Lihat Semua
            </Button>
          </div>
        }
      >
        <div style={{ padding: '0 4px 4px' }}>
          <Table 
            columns={[
              { 
                title: <Text strong style={{ color: '#8c8c8c', fontSize: 12 }}>NO RESI</Text>, 
                dataIndex: 'order_code', 
                key: 'order_code',
                render: (text) => (
                  <Text strong style={{ fontFamily: 'monospace', color: '#1677ff', fontSize: 14 }}>
                    #{text}
                  </Text>
                )
              }, 
              { 
                title: <Text strong style={{ color: '#8c8c8c', fontSize: 12 }}>PELANGGAN</Text>, 
                dataIndex: 'customer_name', 
                key: 'customer_name',
                render: (text) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700
                    }}>
                      {text.charAt(0).toUpperCase()}
                    </div>
                    <Text strong style={{ fontSize: 14 }}>{text}</Text>
                  </div>
                )
              }, 
              { 
                title: <Text strong style={{ color: '#8c8c8c', fontSize: 12 }}>TOTAL</Text>, 
                dataIndex: 'total_amount', 
                key: 'total_amount',
                align: 'right',
                render: (val) => (
                  <Text strong style={{ fontSize: 15, color: '#fa8c16' }}>
                    Rp {val.toLocaleString('id-ID')}
                  </Text>
                )
              }, 
              { 
                title: <Text strong style={{ color: '#8c8c8c', fontSize: 12 }}>STATUS</Text>, 
                dataIndex: 'status', 
                key: 'status',
                align: 'center',
                render: (val) => getStatusTag(val)
              },
            ]}
            dataSource={recentTransactions}
            rowKey="id"
            pagination={false}
            rowClassName="hover-row"
            style={{ 
              borderRadius: 12,
              overflow: 'hidden'
            }}
          />
        </div>
      </Card>

      <style>{`
        .hover-row {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .hover-row:hover {
          background-color: #f5f5f5 !important;
          transform: scale(1.002);
        }
        .hover-row td {
          padding: 16px 24px !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DashboardStats;