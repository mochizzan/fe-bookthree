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

  // Konstanta ukuran untuk consistency
  const BOOK_WIDTH = isMobile ? 150 : 190;
  const BOOK_HEIGHT = isMobile ? 210 : 270;
  const DEPTH = 20; // Ketebalan buku
  const SPINE_WIDTH = 28; // Lebar spine yang lebih tipis

  return (
    <div
      onClick={() => onClick(book)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        cursor: 'pointer',
        perspective: '1200px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0,0,0,0.25)' 
          : '0 10px 25px -5px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* 3D Book Area */}
      <div style={{
        position: 'relative',
        height: isMobile ? 300 : 380,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 20px',
        overflow: 'hidden'
      }}>
        {/* 3D Book Container - Dibuat center alignment yang tepat */}
        <div style={{
          position: 'relative',
          width: BOOK_WIDTH,
          height: BOOK_HEIGHT,
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? 'rotateY(-15deg) rotateX(5deg)' 
            : 'rotateY(-8deg) rotateX(2deg)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          
          {/* 
            STRUKTUR 3D YANG BENAR:
            Semua elemen menggunakan translateZ yang konsisten
          */}

          {/* Front Cover (Depan) - z-index paling depan */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: BOOK_WIDTH,
            height: BOOK_HEIGHT,
            borderRadius: 3,
            overflow: 'hidden',
            transform: `translateZ(${DEPTH/2}px)`,
            boxShadow: '2px 2px 10px rgba(0,0,0,0.15)',
            background: '#fff',
            zIndex: 10
          }}>
            {/* Cover Image */}
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
            
            {/* Glossy Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Category Tag - KIRI ATAS (jauh dari tepi kanan) */}
            <div style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 5
            }}>
              <Tag style={{
                background: getCatColor(book.category),
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                margin: 0
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
                zIndex: 6
              }}>
                <span style={{
                  background: '#ff4d4f',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: 12
                }}>
                  HABIS
                </span>
              </div>
            ) : book.stock <= 3 && (
              <div style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                background: '#ff4d4f',
                color: '#fff',
                padding: '3px 8px',
                borderRadius: 8,
                fontSize: 10,
                fontWeight: 700,
                zIndex: 5
              }}>
                Sisa {book.stock}
              </div>
            )}
          </div>

          {/* Book Spine (Kiri) - Nyatu dengan cover */}
          <div style={{
            position: 'absolute',
            left: -SPINE_WIDTH/2, // Setengah lebar spine ke kiri
            top: 2,
            width: SPINE_WIDTH,
            height: BOOK_HEIGHT - 4,
            background: 'linear-gradient(to right, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)',
            transform: 'rotateY(-90deg)',
            transformOrigin: 'center center',
            borderRadius: '2px 0 0 2px',
            boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5
          }}>
            <span style={{
              transform: 'rotate(90deg)',
              whiteSpace: 'nowrap',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 1,
              maxWidth: BOOK_HEIGHT - 20,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {book.author}
            </span>
          </div>

          {/* Book Pages (Kanan) - Dibuat SANGAT TIPIS dan transparan */}
          <div style={{
            position: 'absolute',
            right: -2, // Hampir menyatu dengan cover
            top: 3,
            width: 4, // Sangat tipis
            height: BOOK_HEIGHT - 6,
            background: 'linear-gradient(to left, #f8f8f8 0%, #eeeeee 100%)',
            transform: 'rotateY(90deg)',
            transformOrigin: 'center center',
            borderRadius: '0 2px 2px 0',
            opacity: 0.6, // Transparan
            zIndex: 5
          }} />

          {/* Back Cover (Belakang) */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: BOOK_WIDTH,
            height: BOOK_HEIGHT,
            background: '#e0e0e0',
            transform: `translateZ(-${DEPTH/2}px)`,
            borderRadius: 3,
            boxShadow: '10px 10px 30px rgba(0,0,0,0.2)',
            zIndex: 1
          }} />

          {/* Drop Shadow di bawah */}
          <div style={{
            position: 'absolute',
            bottom: -30,
            left: '10%',
            width: '80%',
            height: 20,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.5s ease',
            zIndex: 0
          }} />
        </div>

        {/* Hover Indicator */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 20
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

      {/* Info Section */}
      <div style={{
        padding: isMobile ? '16px' : '20px',
        background: '#fff',
        borderTop: '1px solid #f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        flex: 1
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 4
        }}>
          {book.stock > 3 ? (
            <Tag color="success" style={{ 
              margin: 0, 
              borderRadius: 6, 
              fontSize: 11,
              fontWeight: 600
            }}>
              Tersedia
            </Tag>
          ) : <span />}
          <Text type="secondary" style={{ fontSize: 12 }}>
            {book.category === 'fiksi' ? 'Novel' : 'Buku'}
          </Text>
        </div>

        <Title level={5} style={{ 
          margin: 0, 
          fontSize: isMobile ? 15 : 16,
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: isMobile ? 42 : 44
        }}>
          {book.title}
        </Title>

        <Text style={{ 
          fontSize: 13, 
          color: '#666'
        }}>
          {book.author}
        </Text>

        <div style={{ 
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px dashed #f0f0f0',
        }}>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
            Harga
          </Text>
          <Text style={{ 
            fontSize: isMobile ? 18 : 20, 
            color: '#fa8c16',
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}>
            Rp {Number(book.price).toLocaleString('id-ID')}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BookCard;