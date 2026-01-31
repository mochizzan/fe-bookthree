import React from "react";
import { Modal, Table, Button, Typography, Space, Tag, Card, Row, Col, Divider } from "antd";
import { 
  InfoCircleOutlined, 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,  // Ganti ReceiptOutlined
  CloseOutlined,
  ShoppingOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const TransactionDetailModal = ({ open, onClose, transaction, getStatusTag }) => {
  // Struktur kolom tetap sama, hanya styling yang diperbarui
  const detailColumns = [
    { 
      title: 'Judul Buku', 
      dataIndex: ['book', 'title'], 
      key: 'title',
      render: (text) => (
        <Text style={{ fontSize: '14px', fontWeight: 500, color: '#262626' }}>
          {text}
        </Text>
      )
    }, 
    { 
      title: 'Harga', 
      dataIndex: 'price', 
      align: 'right',
      width: 130,
      render: (val) => (
        <Text style={{ color: '#595959', fontFamily: 'monospace', fontSize: '13px' }}>
          Rp {val.toLocaleString('id-ID')}
        </Text>
      )
    },
    { 
      title: 'Qty', 
      dataIndex: 'quantity', 
      key: 'qty',
      align: 'center',
      width: 70,
      render: (val) => (
        <Text style={{ 
          background: '#e6f7ff', 
          color: '#1890ff', 
          padding: '2px 10px', 
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '13px'
        }}>
          {val}
        </Text>
      )
    },
    { 
      title: 'Subtotal', 
      key: 'subtotal',
      align: 'right',
      width: 140,
      render: (_, record) => (
        <Text strong style={{ color: '#262626', fontFamily: 'monospace' }}>
          Rp {(record.price * record.quantity).toLocaleString('id-ID')}
        </Text>
      )
    }
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={750}
      centered
      styles={{
        body: { 
          padding: 0, // Padding dihandle oleh container internal
          background: '#f8fafc',
        },
        mask: { background: 'rgba(0,0,0,0.6)' }
      }}
      closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '16px' }} />}
    >
      {transaction && (
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '85vh' }}>
          
          {/* Header yang Compact & Modern */}
          <div style={{ 
            background: 'linear-gradient(to right, #1677ff, #0958d9)',
            padding: '24px 28px',
            color: 'white',
            position: 'relative'
          }}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col flex="auto">
                <Space size="middle" align="start">
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileTextOutlined style={{ fontSize: '28px', color: 'white' }} />
                  </div>
                  <div>
                    <Title level={4} style={{ color: 'white', margin: 0, marginBottom: '4px', fontWeight: 600 }}>
                      Detail Transaksi
                    </Title>
                    <Space size="small">
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>
                        ID: {transaction.order_code}
                      </Text>
                      <Text copyable={{ text: transaction.order_code }} style={{ color: 'rgba(255,255,255,0.7)' }} />
                    </Space>
                  </div>
                </Space>
              </Col>
              <Col>
                {getStatusTag(transaction.status)}
              </Col>
            </Row>
          </div>

          {/* Content Area dengan Scroll */}
          <div style={{ 
            padding: '24px 28px', 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            {/* Customer Info Card - Grid Layout */}
            <Card 
              bordered={false} 
              style={{ 
                borderRadius: '12px', 
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)',
                background: 'white'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space size="small" style={{ marginBottom: '8px' }}>
                  <UserOutlined style={{ color: '#1677ff' }} />
                  <Text strong style={{ fontSize: '15px', color: '#1f2937' }}>
                    Informasi Pelanggan
                  </Text>
                </Space>

                <Row gutter={[24, 20]}>
                  <Col xs={24} sm={12} lg={8}>
                    <Space direction="vertical" size={2}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        <UserOutlined style={{ marginRight: 4 }} /> Nama
                      </Text>
                      <Text strong style={{ fontSize: '14px', color: '#111827' }}>
                        {transaction.customer_name}
                      </Text>
                    </Space>
                  </Col>

                  <Col xs={24} sm={12} lg={8}>
                    <Space direction="vertical" size={2}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        <MailOutlined style={{ marginRight: 4 }} /> Email
                      </Text>
                      <Text strong style={{ fontSize: '14px', color: '#111827' }}>
                        {transaction.customer_email || '-'}
                      </Text>
                    </Space>
                  </Col>

                  <Col xs={24} sm={12} lg={8}>
                    <Space direction="vertical" size={2}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        <PhoneOutlined style={{ marginRight: 4 }} /> Telepon
                      </Text>
                      <Text strong style={{ fontSize: '14px', color: '#111827' }}>
                        {transaction.customer_phone}
                      </Text>
                    </Space>
                  </Col>

                  <Col span={24}>
                    <Space direction="vertical" size={2} style={{ width: '100%' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        <HomeOutlined style={{ marginRight: 4 }} /> Alamat Lengkap
                      </Text>
                      <div style={{
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        marginTop: '4px'
                      }}>
                        <Text style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: '1.5' }}>
                          {transaction.customer_address}
                        </Text>
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Card>

            {/* Order Items Table */}
            <Card 
              bordered={false}
              style={{ 
                borderRadius: '12px', 
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                background: 'white'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space size="small">
                  <ShoppingOutlined style={{ color: '#1677ff' }} />
                  <Text strong style={{ fontSize: '15px', color: '#1f2937' }}>
                    Item Pesanan
                  </Text>
                  <Tag color="blue" size="small">{transaction.details?.length || 0} buku</Tag>
                </Space>

                <Table 
                  dataSource={transaction.details || []}
                  columns={detailColumns}
                  rowKey="id"
                  pagination={false}
                  size="small"
                  bordered={false}
                  locale={{ emptyText: 'Tidak ada item' }}
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row style={{ background: '#fafafa' }}>
                        <Table.Summary.Cell index={0} colSpan={3}>
                          <Text strong style={{ float: 'right', marginRight: '12px' }}>
                            Total Pembayaran:
                          </Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} align="right">
                          <Text strong style={{ 
                            color: '#dc2626', 
                            fontSize: '16px',
                            fontFamily: 'monospace'
                          }}>
                            Rp {transaction.total_amount.toLocaleString('id-ID')}
                          </Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </Space>
            </Card>
          </div>

          {/* Footer Action */}
          <div style={{ 
            padding: '16px 28px', 
            background: 'white', 
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button 
              type="primary" 
              size="large"
              onClick={onClose}
              icon={<CloseOutlined />}
              style={{ 
                borderRadius: '8px',
                height: '40px',
                paddingLeft: '24px',
                paddingRight: '24px',
                fontWeight: 500
              }}
            >
              Tutup
            </Button>
          </div>
        </div>
      )}

      <style>{`
        .ant-table-thead > tr > th {
          background: #f8fafc !important;
          color: #475569 !important;
          font-weight: 600 !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .ant-table-summary-row td {
          border-top: 2px solid #e2e8f0 !important;
        }
      `}</style>
    </Modal>
  );
};

export default TransactionDetailModal;