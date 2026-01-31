import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Text, Title } = Typography;

const BookCard = ({ book, onClick }) => {
  return (
    <Card
      hoverable
      bordered={false} // Hilangkan border default agar lebih clean
      style={{ 
        width: '100%', 
        borderRadius: '16px', // Sudut lebih bulat
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.03)', // Shadow sangat halus (modern look)
        transition: 'transform 0.3s, box-shadow 0.3s'
      }}
      bodyStyle={{ padding: '16px' }} // Padding isi lebih lega
      cover={
        <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
          {/* Tag Kategori Melayang */}
          <div style={{ 
            position: 'absolute', 
            top: 12, 
            left: 12, 
            zIndex: 2 
          }}>
            <Tag color={book.category === 'fiksi' ? 'purple' : 'cyan'} style={{ 
              border: 'none', 
              borderRadius: '20px', 
              padding: '2px 10px',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              {book.category.toUpperCase()}
            </Tag>
          </div>
          
          {/* Gambar dengan efek zoom sedikit saat hover (via CSS di style tag bisa, tapi ini inline simple) */}
          <img 
            alt={book.title} 
            src={book.image} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }} 
          />
        </div>
      }
      onClick={() => onClick(book)}
    >
      {/* Judul Buku */}
      <Title level={5} style={{ 
        margin: '0 0 4px 0', 
        fontSize: '16px',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: 2, // Batasi judul max 2 baris
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        minHeight: '44px' // Menjaga tinggi kartu rata
      }}>
        {book.title}
      </Title>

      {/* Penulis */}
      <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '12px' }}>
        {book.author}
      </Text>

      {/* Harga & Tombol Aksi Visual */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <Text strong style={{ fontSize: '18px', color: '#fa8c16' }}>
          Rp {book.price.toLocaleString('id-ID')}
        </Text>
      </div>
    </Card>
  );
};

export default BookCard;