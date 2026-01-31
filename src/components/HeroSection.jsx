import React, { useState, useRef, useEffect } from 'react';
import { 
  Carousel, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Tag, 
  Space, 
  Skeleton,
  ConfigProvider
} from 'antd';
import { 
  ShoppingCartOutlined, 
  FireFilled,
  ClockCircleOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const HeroSection = ({ books, onBookClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState({});
  const carouselRef = useRef(null);

  useEffect(() => {
    if (books && books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  const handleDotClick = (index) => {
    carouselRef.current.goTo(index);
    setCurrentSlide(index);
  };

  const toggleDescription = (index) => {
    setExpandedDesc(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading || !books || books.length === 0) {
    return (
      <div style={{ 
        height: '480px', 
        borderRadius: '20px', 
        overflow: 'hidden',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <Row style={{ height: '100%', padding: '40px 24px' }} align="middle" justify="center">
          <Col xs={24} md={14}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Col>
          <Col xs={0} md={10} style={{ textAlign: 'center' }}>
            <Skeleton.Image style={{ width: 200, height: 300 }} />
          </Col>
        </Row>
      </div>
    );
  }

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#1677ff',
        borderRadius: 16,
      }
    }}>
      <div 
        style={{ 
          position: 'relative', 
          marginBottom: '40px', 
          borderRadius: '20px', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel 
          ref={carouselRef}
          autoplay 
          effect="fade"
          autoplaySpeed={6000}
          dots={false}
          afterChange={(current) => setCurrentSlide(current)}
        >
          {books.map((book, index) => {
            const isExpanded = expandedDesc[index] || false;
            
            return (
              <div key={book.id}>
                <div style={{ 
                  minHeight: '480px', 
                  background: gradients[index % gradients.length],
                  padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '32px 20px' : '60px 50px',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />

                  <Row 
                    gutter={[32, 32]} 
                    style={{ 
                      width: '100%', 
                      maxWidth: '1200px', 
                      margin: '0 auto',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 2 
                    }}
                    justify="center"
                  >
                    <Col xs={24} lg={14}>
                      <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        {/* Badges */}
                        <Space size={8} wrap>
                          <Tag 
                            icon={<FireFilled />}
                            color="#ff4d4f"
                            style={{ 
                              padding: '4px 12px', 
                              fontSize: '12px', 
                              fontWeight: 700,
                              borderRadius: '50px',
                              boxShadow: '0 4px 12px rgba(255, 77, 79, 0.4)',
                              border: 'none',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}
                          >
                            Buku Terbaru
                          </Tag>
                          
                          {book.publishedDate && (
                            <Tag 
                              icon={<ClockCircleOutlined />}
                              style={{ 
                                background: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '50px',
                                padding: '4px 12px',
                                fontSize: '12px',
                                backdropFilter: 'blur(10px)'
                              }}
                            >
                              {new Date(book.publishedDate).getFullYear()}
                            </Tag>
                          )}
                        </Space>

                        {/* Title */}
                        <div>
                          <Title 
                            level={1} 
                            style={{ 
                              margin: 0,
                              color: '#fff',
                              fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '28px' : 'clamp(36px, 4vw, 48px)',
                              fontWeight: 800,
                              lineHeight: 1.2,
                              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                              letterSpacing: '-0.02em'
                            }}
                          >
                            {book.title}
                          </Title>
                          
                          <Title 
                            level={4} 
                            style={{ 
                              marginTop: '12px',
                              marginBottom: 0,
                              color: 'rgba(255,255,255,0.9)',
                              fontWeight: 400,
                              fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '16px' : '20px'
                            }}
                          >
                            oleh <span style={{ fontWeight: 600, color: '#fff' }}>{book.author}</span>
                          </Title>
                        </div>

                        {/* Description Box dengan Line Clamp yang berfungsi */}
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          maxWidth: '550px'
                        }}>
                          {/* Ganti Paragraph dengan div agar line-clamp bekerja */}
                          <div style={{
                            fontSize: '15px',
                            color: 'rgba(255,255,255,0.95)',
                            lineHeight: 1.6,
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: isExpanded ? 999 : 3, // 999 untuk expand, 3 untuk collapse
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'all 0.3s ease'
                          }}>
                            {book.description || "Temukan kisah menarik dalam buku terbaru ini. Dapatkan pengalaman membaca yang tak terlupakan dengan narasi yang memukau dan karakter yang mendalam."}
                          </div>
                          
                          {/* Tombol Toggle */}
                          {(book.description?.length > 150 || !book.description) && (
                            <Button
                              type="link"
                              size="small"
                              onClick={() => toggleDescription(index)}
                              icon={isExpanded ? <UpOutlined style={{ fontSize: '10px' }} /> : <DownOutlined style={{ fontSize: '10px' }} />}
                              style={{
                                padding: '0',
                                height: '22px',
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '12px',
                                fontWeight: 600,
                                marginTop: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px'
                              }}
                            >
                              {isExpanded ? 'Ringkas' : 'Selengkapnya'}
                            </Button>
                          )}
                        </div>

                        {/* Single CTA Button */}
                        <div style={{ marginTop: '8px' }}>
                          <Button 
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => onBookClick(book)}
                            block={typeof window !== 'undefined' && window.innerWidth < 768}
                            style={{ 
                              height: '48px',
                              padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '0 24px' : '0 32px',
                              fontSize: '16px',
                              fontWeight: 700,
                              borderRadius: '12px',
                              background: '#fff',
                              color: '#333',
                              border: 'none',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
                              e.currentTarget.style.background = '#f8f8f8';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                              e.currentTarget.style.background = '#fff';
                            }}
                          >
                            Beli Sekarang
                          </Button>
                        </div>
                      </Space>
                    </Col>

                    {/* Image Section */}
                    <Col xs={24} lg={10} style={{ textAlign: 'center', position: 'relative' }}>
                      <div style={{
                        position: 'relative',
                        display: 'inline-block',
                        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.5s ease'
                      }}>
                        {/* Glow Effect */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '280px',
                          height: '280px',
                          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                          filter: 'blur(40px)',
                          zIndex: 1
                        }} />
                        
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          style={{ 
                            height: typeof window !== 'undefined' && window.innerWidth < 768 ? '280px' : '340px', 
                            maxWidth: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
                            transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            zIndex: 2
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 30px 50px -10px rgba(0, 0, 0, 0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
                            e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.4)';
                          }}
                        />
                        
                        {/* Price Tag */}
                        {book.price && typeof window !== 'undefined' && window.innerWidth > 375 && (
                          <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '-10px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                            zIndex: 3,
                            transform: 'rotate(3deg)',
                            border: '2px solid rgba(255,255,255,0.5)'
                          }}>
                            <Text style={{ 
                              fontSize: '18px', 
                              fontWeight: 800, 
                              color: '#ff4d4f',
                              display: 'block',
                              lineHeight: 1
                            }}>
                              Rp {book.price.toLocaleString('id-ID')}
                            </Text>
                            <Text style={{ fontSize: '11px', color: '#888' }}>
                              Stok Tersedia
                            </Text>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          })}
        </Carousel>

        {/* Custom Dots */}
        <div style={{ 
          position: 'absolute', 
          bottom: '24px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          display: 'flex', 
          gap: '10px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.25)',
          padding: '8px 16px',
          borderRadius: '50px',
          backdropFilter: 'blur(10px)'
        }}>
          {books.map((_, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                style={{
                  width: isActive ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0
                }}
                aria-label={`Slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => carouselRef.current.prev()}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s ease',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ‹
        </button>

        <button
          onClick={() => carouselRef.current.next()}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s ease',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ›
        </button>
      </div>
    </ConfigProvider>
  );
};

export default HeroSection;