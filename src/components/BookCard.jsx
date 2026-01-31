import React, { useState } from 'react';
import { 
  Typography, 
  Tag, 
  Grid,
} from 'antd';
import { 
  ShoppingCartOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const BookCard = ({ book, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const BOOK_WIDTH = isMobile ? 150 : 180;
  const BOOK_HEIGHT = isMobile ? 220 : 270;
  const DEPTH = 35; // Ketebalan buku

  return (
    <div
      onClick={() => onClick(book)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        perspective: '1500px', // Perspective container
        background: 'transparent',
        padding: '10px'
      }}
    >
      {/* Container Layout Kartu */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#fff',
        borderRadius: 16,
        // Shadow dasar kartu (bukan shadow buku 3D)
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0,0,0,0.08)' 
          : '0 4px 12px rgba(0,0,0,0.03)',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #f0f0f0'
      }}>
        
        {/* AREA ANIMASI BUKU */}
        <div style={{
          height: isMobile ? 320 : 380,
          background: '#f8f9fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'visible',
          zIndex: 1
        }}>
          
          {/* WRAPPER 3D - Disini animasi terjadi */}
          <div style={{
            width: BOOK_WIDTH,
            height: BOOK_HEIGHT,
            position: 'relative',
            transformStyle: 'preserve-3d',
            // LOGIKA UTAMA:
            // Default: Rotasi 0 (Datar 2D)
            // Hover: Putar Y -25deg (Miring 3D) + Putar X 5deg (Ngangkat dikit)
            transform: isHovered 
              ? 'rotateY(-25deg) rotateX(5deg) translateX(10px)' 
              : 'rotateY(0deg) rotateX(0deg) translateX(0)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)', // Animasi halus
          }}>

            {/* 1. FRONT COVER (Depan) */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: '#fff',
              transform: `translateZ(${DEPTH / 2}px)`, // Maju setengah ketebalan
              borderRadius: '2px 4px 4px 2px',
              // Shadow buku itu sendiri
              boxShadow: isHovered 
                ? '-10px 10px 30px rgba(0,0,0,0.3)' // Shadow dalam saat 3D
                : '0 5px 15px rgba(0,0,0,0.1)',     // Shadow flat saat 2D
              zIndex: 10,
              overflow: 'hidden',
              transition: 'box-shadow 0.5s ease'
            }}>
              <img 
                src={book.image_url || book.image || 'https://via.placeholder.com/300x450'} 
                alt={book.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* Kilau Halus (Flash) saat transisi */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease'
              }} />

              {/* Tag Category */}
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <Tag color="#1677ff" style={{ 
                  border: 'none', 
                  fontWeight: 700, 
                  backdropFilter: 'blur(4px)',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#1677ff'
                }}>
                  {book.category}
                </Tag>
              </div>
            </div>

            {/* 2. SPINE (Punggung Buku) - KIRI */}
            {/* Hanya terlihat saat Hover (ketika buku miring) */}
            <div style={{
              position: 'absolute',
              width: DEPTH,
              height: '100%',
              background: 'linear-gradient(90deg, #ccc 0%, #f0f0f0 40%, #ddd 100%)', // Efek rounded
              transform: `rotateY(-90deg) translateZ(${DEPTH / 2}px)`,
              left: 0,
              transformOrigin: 'left center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <span style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: '9px',
                fontWeight: 600,
                color: '#888',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                opacity: 0.8
              }}>
                BESTSELLER
              </span>
            </div>

            {/* 3. PAGES (Kertas) - KANAN */}
            {/* Memberikan ilusi ketebalan */}
            <div style={{
              position: 'absolute',
              width: DEPTH - 2,
              height: BOOK_HEIGHT - 4,
              // Tekstur kertas
              background: `repeating-linear-gradient(
                90deg, 
                #fff, 
                #fff 1px, 
                #f0f0f0 2px, 
                #e6e6e6 3px
              )`,
              transform: `rotateY(90deg) translateZ(${BOOK_WIDTH - (DEPTH/2) - 1}px)`,
              top: 2,
              transformOrigin: 'right center',
              boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.05)'
            }} />

            {/* 4. BACK COVER (Belakang) */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: '#eee',
              transform: `translateZ(-${DEPTH / 2}px) rotateY(180deg)`,
              borderRadius: '4px 2px 2px 4px',
            }} />
          </div>

          {/* Bayangan Lantai (Floor Shadow) */}
          <div style={{
            position: 'absolute',
            width: BOOK_WIDTH,
            height: 20,
            bottom: isMobile ? 40 : 50,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)',
            // Bayangan mengecil dan memudar saat buku "terangkat"
            transform: isHovered 
              ? 'translateY(30px) scale(0.9)' 
              : 'translateY(15px) scale(1)',
            opacity: isHovered ? 0.4 : 0.6,
            filter: 'blur(8px)',
            transition: 'all 0.5s ease',
            zIndex: 0
          }} />

          {/* Overlay Button "Lihat" */}
          <div style={{
             position: 'absolute',
             bottom: 24,
             zIndex: 20,
             opacity: isHovered ? 1 : 0,
             transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
             transition: 'all 0.4s ease 0.1s' // Sedikit delay agar elegan
          }}>
            <button style={{
              background: '#1677ff',
              color: 'white',
              border: 'none',
              padding: '8px 24px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(22, 119, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              Lihat Detail <ArrowRightOutlined />
            </button>
          </div>
        </div>

        {/* INFO SECTION */}
        <div style={{
          padding: '16px 20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          zIndex: 2
        }}>
          <div style={{ marginBottom: 8 }}>
            <Title level={5} style={{ 
              margin: 0, 
              fontSize: 16, 
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '44px' 
            }}>
              {book.title}
            </Title>
            <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
              {book.author}
            </Text>
          </div>
          
          <div style={{ 
            marginTop: 'auto',
            paddingTop: 12,
            borderTop: '1px dashed #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 700, color: '#fa8c16' }}>
              Rp {Number(book.price).toLocaleString('id-ID')}
            </Text>
            
            <div style={{
              width: 32, height: 32,
              borderRadius: '50%',
              background: isHovered ? '#1677ff' : '#f0f5ff', // Tombol berubah warna saat hover
              color: isHovered ? '#fff' : '#1677ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <ShoppingCartOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;