import React, { useState } from "react";
import { Table, Tag, Button, Typography, Space, Image, Modal } from "antd"; // Ganti Avatar dengan Image agar lebih bagus
import { 
  ExclamationCircleOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileImageOutlined 
} from "@ant-design/icons";
import AddBookModal from "./AdBookModal";
import EditBookModal from './EditBookModal';

const { Title, Text } = Typography;
const { confirm } = Modal; // Cara import confirm yang lebih aman

// Perhatikan props-nya kembali menggunakan 'data', 'onAddBook', dll.
const BookTable = ({ data, onAddBook, onEditBook, onDeleteBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // 1. HANDLE BUKA MODAL EDIT
  const handleEditClick = (record) => {
    setEditingBook(record);
    setIsEditModalOpen(true);
  };

  // 2. HANDLE KONFIRMASI HAPUS
  const showDeleteConfirm = (id, title) => {
    confirm({
      title: 'Apakah Anda yakin ingin menghapus buku ini?',
      icon: <ExclamationCircleOutlined />,
      content: `Buku "${title}" akan dihapus permanen dari database.`,
      okText: 'Ya, Hapus',
      okType: 'danger',
      okCancel: true,
      cancelText: 'Batal',
      onOk() {
        onDeleteBook(id);
      },
    });
  };

  // --- DEFINISI KOLOM (DENGAN VISUALISASI STOK) ---
  const columns = [
    {
      title: "Cover",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (img) => (
        <Image
          width={50}
          src={img}
          fallback="https://via.placeholder.com/50?text=No+Img"
          preview={{ mask: <FileImageOutlined /> }}
          style={{ borderRadius: '4px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: "Judul & Penulis",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.author}</Text>
        </div>
      ),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      responsive: ['md'],
      render: (cat) => <Tag color="purple">{cat ? cat.toUpperCase() : '-'}</Tag>,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp ${price.toLocaleString("id-ID")}`,
      sorter: (a, b) => a.price - b.price,
    },
    
    // --- KOLOM STOK BARU (YANG DITAMBAHKAN) ---
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.stock - b.stock, 
      render: (stock) => {
        // Jika data stok belum ada di DB, anggap 0 agar tidak error
        const currentStock = stock || 0; 
        
        let color = 'success'; 
        let text = 'Aman';
        
        if (currentStock === 0) {
          color = '#f50'; // Merah
          text = 'Habis';
        } else if (currentStock <= 5) {
          color = 'volcano'; // Orange
          text = 'Menipis';
        } else if (currentStock <= 20) {
          color = 'gold'; // Kuning
          text = 'Terbatas';
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Tag 
                    color={color} 
                    style={{ 
                        fontSize: '13px', 
                        padding: '2px 10px', 
                        borderRadius: '20px', 
                        fontWeight: 'bold',
                        margin: 0,
                        border: 'none',
                    }}
                >
                    {currentStock} pcs
                </Tag>
                {currentStock <= 20 && (
                    <span style={{ fontSize: '10px', color: currentStock === 0 ? 'red' : 'orange' }}>
                        {text}
                    </span>
                )}
            </div>
        );
      },
    },
    // -------------------------------------------

    {
      title: "Aksi",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEditClick(record)} 
          />
          <Button 
            size="small" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => showDeleteConfirm(record.id, record.title)} 
          />
        </Space>
      ),
    },
  ];

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
          Data Buku
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Tambah Buku
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data} // Pastikan ini menggunakan 'data', bukan 'books'
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddBook}
      />
      <EditBookModal 
        isOpen={isEditModalOpen}
        onClose={() => {
            setIsEditModalOpen(false);
            setEditingBook(null);
        }}
        onSubmit={onEditBook}
        initialData={editingBook}
      />
    </div>
  );
};

export default BookTable;