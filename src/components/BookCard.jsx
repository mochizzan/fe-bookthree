import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Tag, 
  Button, 
  Space, 
  Grid
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const BookCard = ({ book, onClick, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Warna kategori
  const getCategoryStyle = (cat) => {
    return cat === 'fiksi' 
      ? { bg: '#f9f0ff', color: '#722ed1', border: '#d3adf7' }
      : { bg: '#e6fffb', color: '#13c2c2', border: '#87e8de' };
  };

  const catStyle = getCategoryStyle(book.category);

  return (
    <Card
      hoverable
      bordered={false}
      onClick={() => onClick(book)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: isHovered 
          ? '0 16px 32px rgba(0,0,0,0.1)' 
          : '0 4px 12px rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f0f0f0'
      }}
      bodyStyle={{ 
        padding: isMobile ? '14px' : '18px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
      cover={
        <div style={{ 
          position: 'relative', 
          height: isMobile ? '220px' : '280px', 
          overflow: 'hidden',
          background: '#fafafa'
        }}>
          {/* Tag Kategori */}
          <div style={{ 
            position: 'absolute', 
            top: 12, 
            left: 12, 
            zIndex: 2 
          }}>
            <Tag style={{ 
              background: catStyle.bg,
              color: catStyle.color,
              border: `1px solid ${catStyle.border}`,
              borderRadius: '20px', 
              padding: '4px 14px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}>
              {book.category}
            </Tag>
          </div>

          {/* Gambar dengan Zoom Effect */}
          <img 
            alt={book.title} 
            src={book.image || '/placeholder-book.jpg'} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />

          {/* Overlay Desktop - Tombol Keranjang */}
          {!isMobile && book.stock > 0 && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
              padding: '20px 16px 16px',
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.3s ease',
              display: 'flex',
              zIndex: 3
            }}>
              <Button 
                type="primary" 
                block
                icon={<ShoppingCartOutlined />}
                onClick={() => onClick(book)}
                style={{
                  background: '#fff',
                  color: '#1677ff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  height: '40px',
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1677ff';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#1677ff';
                }}
              >
                Tambah Keranjang
              </Button>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {book.stock === 0 && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4
            }}>
              <div style={{
                background: '#ff4d4f',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                boxShadow: '0 4px 12px rgba(255, 77, 79, 0.3)'
              }}>
                SOLD OUT
              </div>
            </div>
          )}

          {/* Low Stock Badge */}
          {book.stock > 0 && book.stock <= 3 && (
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              background: '#ff4d4f',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(255, 77, 79, 0.3)'
            }}>
              Sisa {book.stock}
            </div>
          )}
        </div>
      }
    >
      {/* Content */}
      <Space direction="vertical" size={isMobile ? 6 : 8} style={{ width: '100%', flex: 1 }}>
        
        {/* Judul */}
        <Title level={5} style={{ 
          margin: 0, 
          fontSize: isMobile ? '15px' : '16px',
          lineHeight: 1.4,
          fontWeight: 600,
          color: '#1f1f1f',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: isMobile ? '42px' : '44px',
          letterSpacing: '-0.3px'
        }}>
          {book.title}
        </Title>

        {/* Penulis */}
        <Text style={{ 
          fontSize: '13px', 
          color: '#8c8c8c',
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {book.author}
        </Text>

        {/* Harga & Stok */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: isMobile ? '10px' : '12px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Text style={{ 
            fontSize: isMobile ? '16px' : '18px', 
            color: '#fa8c16',
            fontWeight: 800,
            letterSpacing: '-0.5px'
          }}>
            Rp {Number(book.price).toLocaleString('id-ID')}
          </Text>

          {!isMobile && book.stock > 3 && (
            <Text style={{ 
              fontSize: '12px', 
              color: '#52c41a', 
              fontWeight: 600,
              background: '#f6ffed',
              padding: '4px 10px',
              borderRadius: '12px'
            }}>
              Tersedia
            </Text>
          )}
        </div>

        {/* Mobile Button */}
        {isMobile && book.stock > 0 && (
          <Button
            type="primary"
            block
            size="middle"
            icon={<ShoppingCartOutlined />}
            onClick={() => onClick(book)}
            style={{
              marginTop: '8px',
              borderRadius: '10px',
              fontWeight: 700,
              height: '40px',
              background: '#1677ff',
              border: 'none',
              boxShadow: '0 4px 12px rgba(22, 119, 255, 0.2)'
            }}
          >
            Tambah Keranjang
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default BookCard;