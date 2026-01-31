import React from "react";
import { Modal, Descriptions, Table, Divider, Button, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const TransactionDetailModal = ({ open, onClose, transaction, getStatusTag }) => {
  // Kolom untuk tabel kecil di dalam modal
  const detailColumns = [
    { 
      title: 'Judul Buku', 
      dataIndex: ['book', 'title'], 
      key: 'title',
      render: (text) => <Typography.Text strong>{text}</Typography.Text>
    }, 
    { 
      title: 'Harga', 
      dataIndex: 'price', 
      render: (val) => `Rp ${val.toLocaleString('id-ID')}` 
    },
    { 
      title: 'Qty', 
      dataIndex: 'quantity', 
      key: 'qty',
      align: 'center'
    },
    { 
      title: 'Subtotal', 
      key: 'subtotal',
      align: 'right',
      render: (_, record) => `Rp ${(record.price * record.quantity).toLocaleString('id-ID')}`
    }
  ];

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <InfoCircleOutlined style={{ color: '#1890ff' }}/> Detail Transaksi
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>Tutup</Button>
      ]}
      width={700}
      centered
    >
      {transaction && (
        <>
          {/* Bagian Atas: Informasi Data Diri */}
          <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }} layout="vertical">
            <Descriptions.Item label="No Resi">{transaction.order_code}</Descriptions.Item>
            <Descriptions.Item label="Status">{getStatusTag(transaction.status)}</Descriptions.Item>
            <Descriptions.Item label="Nama Pelanggan">{transaction.customer_name}</Descriptions.Item>
            <Descriptions.Item label="No HP">{transaction.customer_phone}</Descriptions.Item>
            <Descriptions.Item label="Alamat Lengkap" span={2}>
              {transaction.customer_address}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left" style={{ borderColor: '#d9d9d9' }}>Item Pesanan</Divider>

          {/* Bagian Bawah: Daftar Barang */}
          <Table 
            dataSource={transaction.details || []}
            columns={detailColumns}
            rowKey="id"
            pagination={false}
            size="small"
            bordered
            summary={() => {
              return (
                <Table.Summary.Row style={{ background: '#fafafa' }}>
                  <Table.Summary.Cell index={0} colSpan={3} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    Total Pembayaran:
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} style={{ fontWeight: 'bold', color: '#fa541c', textAlign: 'right' }}>
                    Rp {transaction.total_amount.toLocaleString('id-ID')}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </>
      )}
    </Modal>
  );
};

export default TransactionDetailModal;