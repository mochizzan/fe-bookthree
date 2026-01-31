import React from "react";
import { Table, Button, Typography, Input, Space, Popconfirm, Tag } from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CarOutlined,
  AppstoreAddOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// Kita terima props 'onUpdateStatus' dari parent
const TransactionTable = ({ data, getStatusTag, onUpdateStatus }) => {
  // Fungsi Helper untuk menentukan Tombol apa yang muncul
  const renderActionButtons = (record) => {
    const currentStatus = record.status;
    let nextActionBtn = null;
    let cancelBtn = null;

    // 1. LOGIKA TOMBOL UTAMA (Flow: 100 -> 101 -> 102 -> 103)
    if (currentStatus === 100) {
      nextActionBtn = (
        <Button
          type="primary"
          size="small"
          icon={<AppstoreAddOutlined />}
          onClick={() => onUpdateStatus(record.id, 101)} // Ubah ke 101 (Diproses)
        >
          Proses Pesanan
        </Button>
      );
    } else if (currentStatus === 101) {
      nextActionBtn = (
        <Button
          type="primary"
          size="small"
          style={{ background: "#13c2c2" }} // Warna Cyan
          icon={<CarOutlined />}
          onClick={() => onUpdateStatus(record.id, 102)} // Ubah ke 102 (Dikirim)
        >
          Kirim Barang
        </Button>
      );
    } else if (currentStatus === 102) {
      nextActionBtn = (
        <Button
          type="primary"
          size="small"
          style={{ background: "#52c41a" }} // Warna Hijau
          icon={<CheckCircleOutlined />}
          onClick={() => onUpdateStatus(record.id, 103)} // Ubah ke 103 (Selesai)
        >
          Selesaikan
        </Button>
      );
    }

    // 2. LOGIKA TOMBOL BATAL (Muncul jika status < 102 / belum dikirim)
    // Kita anggap kalau sudah dikirim tidak bisa dibatalkan admin sembarangan
    if (currentStatus < 102) {
      cancelBtn = (
        <Popconfirm
          title="Batalkan Pesanan?"
          description="Aksi ini tidak dapat dibatalkan."
          onConfirm={() => onUpdateStatus(record.id, 104)} // Ubah ke 104 (Batal)
          okText="Ya, Batalkan"
          cancelText="Tidak"
        >
          <Button
            type="default"
            danger
            size="small"
            icon={<CloseCircleOutlined />}
          >
            Batalkan
          </Button>
        </Popconfirm>
      );
    }

    // Jika sudah selesai atau batal, tidak ada tombol
    if (currentStatus === 103 || currentStatus === 104) {
      return <span style={{ color: "#aaa" }}>- Tidak ada aksi -</span>;
    }

    return (
      <Space>
        {nextActionBtn}
        {cancelBtn}
      </Space>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Riwayat Transaksi
        </Title>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Cari No Resi..."
          style={{ width: 250 }}
        />
      </div>

      <Table
        columns={[
          { title: "Tanggal", dataIndex: "date", key: "date", width: 110 },
          {
            title: "No Resi",
            dataIndex: "code",
            key: "code",
            render: (text) => <a>{text}</a>,
          },
          { title: "Pelanggan", dataIndex: "customer", key: "customer" },
          {
            title: "Pembayaran",
            dataIndex: "payment_method",
            key: "payment_method",
            render: (method) => {
              if (method === "tunai") {
                return (
                  <Tag icon={<WalletOutlined />} color="green">
                    Tunai (COD)
                  </Tag>
                );
              } else {
                return (
                  <Tag icon={<CreditCardOutlined />} color="blue">
                    Non-Tunai
                  </Tag>
                );
              }
            },
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
            width: 200,
            render: (_, record) => renderActionButtons(record),
          },
        ]}
        dataSource={data}
        rowKey="id"
      />
    </div>
  );
};

export default TransactionTable;
