import React, { useState } from 'react';
import { 
  Typography, 
  Tag, 
  Grid,
} from 'antd';
import { 
  EyeOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const BookCard = ({ book, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Warna kategori
  const getCatColor = (cat) => cat === 'fiksi' ? '#722ed1' : '#13c2c2';

  return (
    <div
      onClick={() => onClick(book)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        cursor: 'pointer',
        perspective: '1000px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0,0,0,0.25)' 
          : '0 10px 25px -5px rgba(0,0,0,0.1)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid #f0f0f0',
        position: 'relative'
      }}
    >
      {/* 3D Book Area */}
      <div style={{
        position: 'relative',
        height: isMobile ? 300 : 380,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px 15px',
        overflow: 'hidden'
      }}>
        {/* Ambient Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(100, 100, 255, 0.05) 0%, transparent 50%)`
        }} />

        {/* 3D Book Container */}
        <div style={{
          position: 'relative',
          width: isMobile ? 150 : 190,
          height: isMobile ? 210 : 270,
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? 'rotateY(-18deg) rotateX(8deg) translateZ(10px)' 
            : 'rotateY(-10deg) rotateX(4deg)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 2
        }}>
          
          {/* Book Spine (Left Side) */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 3,
            bottom: 3,
            width: 34,
            background: 'linear-gradient(to right, #3a3a3a 0%, #1a1a1a 100%)',
            transform: 'rotateY(-90deg) translateZ(17px)',
            transformOrigin: 'left center',
            borderRadius: '3px 0 0 3px',
            boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              transform: 'rotate(90deg)',
              whiteSpace: 'nowrap',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 0.5,
              maxWidth: 180,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '0 10px'
            }}>
              {book.author}
            </span>
          </div>

          {/* Back Cover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#d0d0d0',
            transform: 'translateZ(-17px)',
            borderRadius: 4,
            boxShadow: '10px 10px 30px rgba(0,0,0,0.15)'
          }} />

          {/* Front Cover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 4,
            overflow: 'hidden',
            transform: 'translateZ(17px)',
            boxShadow: '4px 4px 15px rgba(0,0,0,0.15), -2px 0 5px rgba(255,255,255,0.2)',
            background: '#fff',
            zIndex: 3
          }}>
            {/* Image */}
            <img 
              src={book.image_url || book.image || '/placeholder-book.jpg'} 
              alt={book.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            
            {/* Glossy Reflection Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(125deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 60%, rgba(0,0,0,0.05) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Category Tag - DIPINDAH KE KIRI ATAS agar tidak terpotong */}
            <div style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 4
            }}>
              <Tag style={{
                background: getCatColor(book.category),
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '3px 10px',
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                margin: 0,
                letterSpacing: '0.5px'
              }}>
                {book.category}
              </Tag>
            </div>

            {/* Stock Status */}
            {book.stock === 0 ? (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5
              }}>
                <span style={{
                  background: '#ff4d4f',
                  color: '#fff',
                  padding: '8px 18px',
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '1px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  SOLD OUT
                </span>
              </div>
            ) : book.stock <= 3 && (
              <div style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                background: '#ff4d4f',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: 10,
                fontSize: 10,
                fontWeight: 700,
                zIndex: 4,
                boxShadow: '0 2px 8px rgba(255,77,79,0.4)'
              }}>
                Sisa {book.stock}
              </div>
            )}
          </div>

          {/* Book Pages (Right Edge) - Disederhanakan agar tidak terlihat "terpotong" */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 2,
            bottom: 2,
            width: 32,
            background: 'linear-gradient(to left, #fefefe 0%, #f0f0f0 40%, #e0e0e0 100%)',
            transform: 'rotateY(90deg) translateZ(-15px)',
            transformOrigin: 'right center',
            borderRadius: '0 3px 3px 0',
            boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.08)',
            zIndex: 2
            // Garis-garis halaman dihapus agar tidak mengganggu visual
          }} />

          {/* Bottom Shadow */}
          <div style={{
            position: 'absolute',
            bottom: -20,
            left: '15%',
            right: '15%',
            height: 12,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(5px)',
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.5s ease',
            zIndex: 1
          }} />
        </div>

        {/* Hover Hint - Lihat Detail */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#1677ff',
            padding: '10px 20px',
            borderRadius: 25,
            fontWeight: 700,
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <EyeOutlined /> Lihat Detail
          </div>
        </div>
      </div>

      {/* Info Section - Integrated tanpa gap */}
      <div style={{
        padding: isMobile ? '16px' : '20px',
        background: '#fff',
        borderTop: '1px solid #f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flex: 1
      }}>
        {/* Stock & Meta */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 2
        }}>
          {book.stock > 3 ? (
            <Tag color="success" style={{ 
              margin: 0, 
              borderRadius: 6, 
              fontSize: 11,
              fontWeight: 600,
              padding: '0 8px'
            }}>
              Ready Stock
            </Tag>
          ) : (
            <div /> // Placeholder untuk alignment
          )}
          <Text type="secondary" style={{ fontSize: 12 }}>
            {book.category === 'fiksi' ? 'Novel' : 'Buku Umum'}
          </Text>
        </div>

        {/* Title */}
        <Title level={5} style={{ 
          margin: 0, 
          fontSize: isMobile ? 16 : 17,
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: isMobile ? 44 : 46,
          letterSpacing: '-0.3px'
        }}>
          {book.title}
        </Title>

        {/* Author */}
        <Text style={{ 
          fontSize: 13, 
          color: '#666',
          fontWeight: 500
        }}>
          {book.author}
        </Text>

        {/* Price - Bottom aligned */}
        <div style={{ 
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px dashed #f0f0f0',
        }}>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
            Harga
          </Text>
          <Text style={{ 
            fontSize: isMobile ? 20 : 22, 
            color: '#fa8c16',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            display: 'block'
          }}>
            Rp {Number(book.price).toLocaleString('id-ID')}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BookCard;