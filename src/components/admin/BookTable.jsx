import React, { useState } from "react";
import { Table, Avatar, Tag, Button, Typography, Space } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddBookModal from "./AdBookModal";
import EditBookModal from './EditBookModal';
import confirm from "antd/es/modal/confirm";

const { Title } = Typography;

const BookTable = ({ data, onAddBook, onEditBook, onDeleteBook}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // Menyimpan data buku yang sedang diedit

  // 1. HANDLE BUKA MODAL EDIT
  const handleEditClick = (record) => {
    setEditingBook(record); // Simpan data buku yang diklik ke state
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
        columns={[
          {
            title: "Cover",
            dataIndex: "image",
            render: (img) => <Avatar shape="square" size={64} src={img} />,
          },
          {
            title: "Judul Buku",
            dataIndex: "title",
            key: "title",
            render: (text) => <strong>{text}</strong>,
          },
          { title: "Penulis", dataIndex: "author", key: "author" },
          {
            title: "Kategori",
            dataIndex: "category",
            key: "category",
            render: (cat) => <Tag color="purple">{cat.toUpperCase()}</Tag>,
          },
          {
            title: "Harga",
            dataIndex: "price",
            render: (price) => `Rp ${price.toLocaleString("id-ID")}`,
          },
          {
            title: "Aksi",
            key: "action",
            render: (_, record) => (
              <Space>
                <Button size="small" onClick={() => handleEditClick(record)}>Edit</Button>
                <Button size="small" danger onClick={() => showDeleteConfirm(record.id, record.title)}>
                  Hapus
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={data}
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
