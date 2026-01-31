import React, { useState } from "react";
import { Table, Button, Typography, Input, Space, Popconfirm, Tag } from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CarOutlined,
  AppstoreAddOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  WalletOutlined,
  UserOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

// Import Modal yang sudah dipisah
import TransactionDetailModal from "./TransactionDetailModal"; 

const { Title, Text } = Typography;

const TransactionTable = ({ data, getStatusTag, onUpdateStatus }) => {
  // --- STATE LOGIC ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // --- HANDLERS ---
  const showDetailModal = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  // --- LOGIC TOMBOL AKSI ---
  const renderActionButtons = (record) => {
    const currentStatus = record.status;

    // Tombol Update Status (Flow: 100 -> 101 -> 102 -> 103)
    if (currentStatus === 100) {
      return (
        <Space>
          <Button type="primary" size="small" icon={<AppstoreAddOutlined />} onClick={() => onUpdateStatus(record.id, 101)}>
            Proses
          </Button>
          <Popconfirm title="Batalkan?" onConfirm={() => onUpdateStatus(record.id, 104)} okText="Ya" cancelText="Tidak">
             <Button danger size="small" icon={<CloseCircleOutlined />} />
          </Popconfirm>
        </Space>
      );
    } 
    
    if (currentStatus === 101) {
      return (
        <Space>
           <Button type="primary" size="small" style={{ background: "#13c2c2" }} icon={<CarOutlined />} onClick={() => onUpdateStatus(record.id, 102)}>
            Kirim
          </Button>
          <Popconfirm title="Batalkan?" onConfirm={() => onUpdateStatus(record.id, 104)} okText="Ya" cancelText="Tidak">
             <Button danger size="small" icon={<CloseCircleOutlined />} />
          </Popconfirm>
        </Space>
      );
    } 
    
    if (currentStatus === 102) {
      return (
        <Button type="primary" size="small" style={{ background: "#52c41a" }} icon={<CheckCircleOutlined />} onClick={() => onUpdateStatus(record.id, 103)}>
          Selesai
        </Button>
      );
    }

    return <span style={{ color: "#ccc" }}>-</span>;
  };

  // --- KOLOM TABEL UTAMA ---
  const columns = [
    { 
      title: "Tanggal", 
      dataIndex: "date", 
      key: "date", 
      width: 110,
      render: (date) => new Date(date).toLocaleDateString('id-ID')
    },
    {
      title: "No Resi",
      dataIndex: "order_code",
      key: "order_code",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Pelanggan (Klik Detail)",
      dataIndex: "customer_name",
      key: "customer_name",
      // Badge Pelanggan yang bisa diklik
      render: (text, record) => (
        <Tag 
          color="geekblue" 
          style={{ cursor: "pointer", fontSize: '13px', padding: '4px 10px', borderRadius: '15px' }}
          onClick={() => showDetailModal(record)}
        >
          <UserOutlined style={{ marginRight: 5 }} /> 
          {text} <InfoCircleOutlined style={{ marginLeft: 5, fontSize: '10px' }}/>
        </Tag>
      ),
    },
    {
      title: "Metode",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (method) => 
        method === "tunai" ? (
          <Tag icon={<WalletOutlined />} color="green">COD</Tag>
        ) : (
          <Tag icon={<CreditCardOutlined />} color="blue">Transfer</Tag>
        ),
    },
    {
      title: "Total",
      dataIndex: "total_amount",
      render: (val) => `Rp ${val.toLocaleString("id-ID")}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => getStatusTag(val),
    },
    {
      title: "Aksi",
      width: 180,
      render: (_, record) => renderActionButtons(record),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>Riwayat Transaksi</Title>
        <Input prefix={<SearchOutlined />} placeholder="Cari No Resi..." style={{ width: 250 }} />
      </div>

      {/* Tabel */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      {/* Komponen Modal yang Dipisah */}
      <TransactionDetailModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        getStatusTag={getStatusTag}
      />
    </div>
  );
};

export default TransactionTable;