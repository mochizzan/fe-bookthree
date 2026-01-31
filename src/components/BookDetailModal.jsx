import React, { useState, useEffect } from 'react';
import { Modal, Button, InputNumber, Row, Col, Typography, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const BookDetailModal = ({ book, isOpen, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen, book]);

  if (!book) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      <Row gutter={24}>
        <Col span={10}>
          <img 
            src={book.image} 
            alt={book.title} 
            style={{ width: '100%', borderRadius: '8px' }} 
          />
        </Col>
        <Col span={14}>
          <Title level={3}>{book.title}</Title>
          <Text type="secondary">Oleh: {book.author}</Text>
          <Divider />
          <Title level={4} style={{ color: '#fa8c16', margin: 0 }}>
            Rp {book.price.toLocaleString('id-ID')}
          </Title>
          <Paragraph style={{ marginTop: 16 }}>
            {book.description}
          </Paragraph>
          
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Text>Jumlah:</Text>
            <InputNumber min={1} max={10} value={qty} onChange={setQty} />
          </div>

          <div style={{ marginTop: 24 }}>
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              size="large" 
              block
              onClick={() => {
                onAddToCart(book, qty);
                onClose();
              }}
            >
              + Keranjang
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default BookDetailModal;