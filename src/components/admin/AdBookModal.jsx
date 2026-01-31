import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const AddBookModal = ({ isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Handle saat file gambar dipilih
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Mencegah auto-upload ke server (karena kita belum connect backend)
  const beforeUpload = (file) => {
    return false;
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Ambil file gambar asli dari object Upload Antd
        const imageFile =
          fileList.length > 0 ? fileList[0].originFileObj : null;

        // Kirim data ke parent
        onSubmit({
          ...values,
          imageFile: imageFile,
        });

        // Reset form
        form.resetFields();
        setFileList([]);
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Tambah Buku Baru"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText="Simpan Buku"
      cancelText="Batal"
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ category: "fiksi", stock: 10 }}
      >
        <Row gutter={16}>
          {/* Kolom Kiri: Info Utama */}
          <Col span={12}>
            <Form.Item
              name="title"
              label="Judul Buku"
              rules={[{ required: true, message: "Judul wajib diisi" }]}
            >
              <Input placeholder="Contoh: Harry Potter" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Penulis"
              rules={[{ required: true, message: "Penulis wajib diisi" }]}
            >
              <Input placeholder="Nama Penulis" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Harga (Rp)"
              rules={[{ required: true, message: "Harga wajib diisi" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  value
                    ? `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : ""
                }
                parser={(value) => value.replace(/\Rp\s?|(\.*)/g, "")}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="stock"
              label="Stok"
              rules={[{ required: true, message: "Stok wajib diisi" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="category"
              label="Kategori"
              rules={[{ required: true, message: "Pilih kategori" }]}
            >
              <Select>
                <Option value="fiksi">Fiksi</Option>
                <Option value="non-fiksi">Non-Fiksi</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Deskripsi / Sinopsis"
          rules={[{ required: true, message: "Deskripsi wajib diisi" }]}
        >
          <TextArea
            rows={3}
            placeholder="Ceritakan singkat tentang buku ini..."
          />
        </Form.Item>

        {/* Upload Foto */}
        <Form.Item label="Cover Buku" required>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={() => {}} // Opsional: Tambah logic preview jika mau
            onChange={handleUploadChange}
            beforeUpload={beforeUpload} // Penting: Agar tidak langsung upload via ajax
            maxCount={1} // Hanya boleh 1 gambar
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
