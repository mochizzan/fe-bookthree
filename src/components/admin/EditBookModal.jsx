import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const EditBookModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // LOGIC PENTING: Isi form saat modal dibuka & data buku tersedia
  useEffect(() => {
    if (isOpen && initialData) {
      form.setFieldsValue({
        title: initialData.title,
        author: initialData.author,
        price: initialData.price,
        stock: initialData.stock,
        category: initialData.category,
        description: initialData.description,
      });
      // Reset upload list karena kita tidak menampilkan file lama di widget upload
      setFileList([]);
    }
  }, [isOpen, initialData, form]);

  const handleUploadChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const beforeUpload = () => false;

  const handleOk = () => {
    form.validateFields().then((values) => {
      const imageFile = fileList.length > 0 ? fileList[0].originFileObj : null;
      
      onSubmit(initialData.id, {
        ...values,
        imageFile: imageFile,
        image: initialData.image 
      });

      onClose();
    });
  };

  return (
    <Modal
      title="Edit Data Buku"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText="Simpan Perubahan"
      cancelText="Batal"
      width={700}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="title" label="Judul Buku" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="author" label="Penulis" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            {/* --- BAGIAN YANG DIPERBAIKI --- */}
            <Form.Item name="price" label="Harga" rules={[{ required: true }]}>
              <InputNumber 
                style={{ width: '100%' }} 
                // Formatter: Menampilkan Rp 10.000
                formatter={(value) => value ? `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
                // Parser: Membersihkan input agar jadi angka murni (Hapus Rp, spasi, dan titik)
                parser={(value) => value.replace(/\Rp\s?|(\.*)/g, '')}
                min={0}
              />
            </Form.Item>
            {/* ----------------------------- */}
          </Col>
          <Col span={8}>
            <Form.Item name="stock" label="Stok" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="category" label="Kategori" rules={[{ required: true }]}>
              <Select>
                <Option value="fiksi">Fiksi</Option>
                <Option value="non-fiksi">Non-Fiksi</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Deskripsi" rules={[{ required: true }]}>
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Ganti Cover (Opsional)">
          <div style={{ marginBottom: 10 }}>
             <img src={initialData?.image} alt="Cover Lama" style={{ width: 60, height: 90, objectFit: 'cover', borderRadius: 4, marginRight: 10 }} />
             <span style={{ color: '#888', fontSize: 12 }}>Cover Saat Ini</span>
          </div>
           <Upload listType="picture-card" fileList={fileList} onChange={handleUploadChange} beforeUpload={beforeUpload} maxCount={1}>
            {fileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Ganti</div></div>}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBookModal;