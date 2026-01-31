import React, { useState, useRef } from 'react'; // Tambah useRef dan useState
import { Carousel, Button, Typography, Row, Col, Tag } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HeroSection = ({ books, onBookClick }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
  
    const handleDotClick = (index) => {
      carouselRef.current.goTo(index);
      setCurrentSlide(index);
    };
  
    // Jika data buku belum ada (loading), jangan render apa-apa dulu atau render skeleton
    if (!books || books.length === 0) return null;

  return (
    // Container utama kita buat relative agar bisa menaruh dots melayang
    <div style={{ position: 'relative', marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      
      <Carousel 
        ref={carouselRef} // Sambungkan Ref
        autoplay 
        effect="fade" 
        autoplaySpeed={5000}
        dots={false} // MATIKAN dots bawaan Antd/CSS
        afterChange={(current) => setCurrentSlide(current)} // Update state saat slide berubah otomatis
      >
        {books.map((book, index) => (
          <div key={book.id}>
            <div style={{ 
              height: '400px', 
              background: index % 2 === 0 ? '#E6F7FF' : '#FFF7E6', 
              padding: '0 40px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Row gutter={40} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Col xs={24} md={14}>
                  <Tag color="red" style={{ marginBottom: 10 }}>BUKU TERBARU</Tag>
                  <Title level={1} style={{ marginBottom: 10, color: '#333' }}>
                    {book.title}
                  </Title>
                  <Title level={4} type="secondary" style={{ marginTop: 0, marginBottom: 20 }}>
                    karya {book.author}
                  </Title>
                  
                  {/* Tampilkan Deskripsi Asli */}
                  <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: '16px', color: '#555', marginBottom: 30 }}>
                    {book.description || "Sinopsis belum tersedia."}
                  </Paragraph>

                  <Button 
                    type="primary" 
                    size="large" 
                    shape="round" 
                    icon={<ReadOutlined />}
                    style={{ height: '48px', padding: '0 32px', fontSize: '16px' }}
                    onClick={() => onBookClick(book)} 
                  >
                    Lihat Detail
                  </Button>
                </Col>

                <Col xs={0} md={10} style={{ textAlign: 'center' }}>
                  <img 
                    key={book.id} 
                    src={book.image} 
                    alt={book.title} 
                    style={{ 
                      height: '320px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      transform: 'rotate(-3deg)' 
                    }} 
                  />
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </Carousel>

      {/* CUSTOM DOTS */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: '8px',
        zIndex: 10 
      }}>
        {books.map((_, index) => {
          const isActive = currentSlide === index;
          return (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              style={{
                width: isActive ? '30px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: isActive ? '#1677ff' : '#000',
                opacity: isActive ? 1 : 0.2,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          );
        })}
      </div>

    </div>
  );
};

export default HeroSection;