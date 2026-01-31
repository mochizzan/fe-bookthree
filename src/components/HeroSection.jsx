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
  ConfigProvider,
  Grid
} from 'antd';
import { 
  ShoppingCartOutlined, 
  FireFilled,
  ClockCircleOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const HeroSection = ({ books, onBookClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null); 
  const [expandedDesc, setExpandedDesc] = useState({});
  const carouselRef = useRef(null);
  
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const MIN_SLIDE_HEIGHT = isMobile ? '520px' : '540px';

  useEffect(() => {
    if (books && books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  const handleDotClick = (index) => {
    carouselRef.current.goTo(index);
    setCurrentSlide(index);
  };

  const toggleDescription = (e, index) => {
    e.stopPropagation();
    setExpandedDesc(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading || !books || books.length === 0) {
    return (
      <div style={{ 
        minHeight: MIN_SLIDE_HEIGHT,
        borderRadius: '20px', 
        overflow: 'hidden',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <Row style={{ height: '100%', padding: '40px 24px', minHeight: MIN_SLIDE_HEIGHT }} align="middle" justify="center">
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
      {/* Menambahkan CSS untuk fix tinggi dan Animasi Premium Badge */}
      <style>
        {`
          /* Fix untuk tinggi carousel agar sama rata */
          .hero-carousel .slick-track {
            display: flex !important;
            align-items: stretch;
          }
          .hero-carousel .slick-slide {
            height: auto !important;
            display: flex;
            justify-content: center;
            flex-direction: column;
          }
          .hero-carousel .slick-slide > div {
            height: 100%;
            display: flex;
            flex: 1;
            width: 100%;
          }

          /* --- CSS UNTUK PREMIUM BADGE --- */
          
          /* 1. Definisi Keyframes untuk animasi kilau (shimmer) */
          @keyframes shimmerMove {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(250%) skewX(-20deg); }
          }

          /* 2. Definisi Keyframes untuk animasi denyutan (pulse) mewah */
          @keyframes premiumPulse {
            0% { box-shadow: 0 4px 12px rgba(255, 77, 79, 0.5), 0 0 0 rgba(255, 215, 0, 0); }
            50% { box-shadow: 0 8px 20px rgba(255, 77, 79, 0.8), 0 0 15px rgba(255, 215, 0, 0.6); }
            100% { box-shadow: 0 4px 12px rgba(255, 77, 79, 0.5), 0 0 0 rgba(255, 215, 0, 0); }
          }

          /* 3. Styling Class Utama Badge Premium */
          .premium-badge {
            position: relative;
            overflow: hidden; /* Penting agar kilau tidak keluar batas */
            background: linear-gradient(135deg, #d90429 0%, #ff4d4f 100%) !important; /* Gradien merah kaya */
            border: 1px solid rgba(255, 215, 0, 0.4) !important; /* Border emas tipis */
            color: #fff !important;
            font-weight: 800 !important;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 6px 16px !important; /* Sedikit lebih besar */
            border-radius: 50px !important;
            /* Terapkan animasi pulse */
            animation: premiumPulse 3s infinite ease-in-out; 
          }

          /* 4. Elemen Pseudo (::after) untuk membuat efek kilau cahaya */
          .premium-badge::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%, /* Cahaya putih di tengah */
              rgba(255, 255, 255, 0) 100%
            );
            /* Miringkan cahaya */
            transform: skewX(-20deg); 
            /* Terapkan animasi gerak kilau */
            animation: shimmerMove 3s infinite linear; 
            pointer-events: none; /* Agar tidak mengganggu klik */
          }
        `}
      </style>

      <div 
        style={{ 
          position: 'relative', 
          marginBottom: '40px', 
          borderRadius: '20px', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
          background: '#fff',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel 
          className="hero-carousel"
          ref={carouselRef}
          autoplay={!isHovered}
          effect="fade"
          autoplaySpeed={6000}
          dots={false}
          afterChange={(current) => setCurrentSlide(current)}
          style={{ height: '100%' }}
        >
          {books.map((book, index) => {
            const isExpanded = expandedDesc[index] || false;
            const isBtnHovered = hoveredBtn === index;
            
            return (
              <div key={book.id} style={{ display: 'flex', flex: 1, width: '100%' }}>
                {/* SLIDE CONTAINER */}
                <div style={{ 
                  minHeight: MIN_SLIDE_HEIGHT,
                  width: '100%',
                  background: gradients[index % gradients.length],
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  paddingBottom: '60px',
                  flex: 1,
                  height: '100%'
                }}>
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    opacity: 0.1,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                    zIndex: 1
                  }} />

                  {/* Content Container */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    padding: isMobile ? '30px 20px 50px 20px' : '50px 50px 60px 50px',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Row 
                      gutter={[32, 32]} 
                      style={{ 
                        width: '100%', 
                        maxWidth: '1200px', 
                        margin: '0 auto',
                        alignItems: 'center'
                      }}
                      justify="center"
                    >
                      <Col xs={24} lg={14}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                          {/* Badges */}
                          <Space size={12} wrap alignItems="center">
                            {/* UBAHAN: Menggunakan class 'premium-badge' dan ikon emas */}
                            <Tag 
                              className="premium-badge"
                              icon={<FireFilled style={{ color: '#FFD700', fontSize: '14px' }} />} // Ikon Emas
                              style={{ 
                                fontSize: '13px',
                                // Style lain sudah ditangani oleh CSS class .premium-badge di atas
                              }}
                            >
                              Buku Terbaru
                            </Tag>
                            
                            {book.publishedDate && (
                              <Tag 
                                icon={<ClockCircleOutlined />}
                                style={{ 
                                  background: 'rgba(255,255,255,0.2)', color: '#fff',
                                  border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50px',
                                  padding: '4px 12px', fontSize: '12px', backdropFilter: 'blur(10px)'
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
                                margin: '8px 0 0 0', color: '#fff', // Sedikit margin top
                                fontSize: isMobile ? 26 : 44,
                                fontWeight: 800, lineHeight: 1.2,
                                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                              }}
                            >
                              {book.title}
                            </Title>
                            
                            <Title 
                              level={4} 
                              style={{ 
                                marginTop: '12px', marginBottom: 0,
                                color: 'rgba(255,255,255,0.9)', fontWeight: 400,
                                fontSize: isMobile ? 15 : 18
                              }}
                            >
                              oleh <span style={{ fontWeight: 600, color: '#fff' }}>{book.author}</span>
                            </Title>
                          </div>

                          {/* Description Box */}
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            maxWidth: '550px',
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{
                              fontSize: '15px',
                              color: 'rgba(255,255,255,0.95)',
                              lineHeight: 1.6,
                              margin: 0,
                              display: isExpanded ? 'block' : '-webkit-box',
                              WebkitLineClamp: isExpanded ? 'unset' : 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {book.description || "Temukan kisah menarik dalam buku terbaru ini..."}
                            </div>
                            
                            <Button
                              type="link"
                              size="small"
                              onClick={(e) => toggleDescription(e, index)}
                              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                              style={{
                                padding: '4px 0 0 0', height: 'auto',
                                color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 600,
                                marginTop: '8px'
                              }}
                            >
                              {isExpanded ? 'Ringkas' : 'Selengkapnya'}
                            </Button>
                          </div>

                          {/* CTA Button */}
                          <div style={{ marginTop: '8px' }}>
                            <Button 
                              type="primary"
                              size="large"
                              icon={<ShoppingCartOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookClick(book);
                              }}
                              onMouseEnter={() => setHoveredBtn(index)}
                              onMouseLeave={() => setHoveredBtn(null)}
                              block={isMobile}
                              style={{ 
                                height: '48px',
                                padding: isMobile ? '0 24px' : '0 32px',
                                fontSize: '16px', fontWeight: 700, borderRadius: '12px',
                                background: '#fff', color: '#333', border: 'none',
                                transform: isBtnHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)',
                                boxShadow: isBtnHovered 
                                  ? '0 15px 30px rgba(0,0,0,0.3)' 
                                  : '0 8px 24px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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
                          perspective: '1500px'
                        }}>
                          {/* Glow Effect */}
                          <div style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            transform: isHovered ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
                            width: '250px', height: '250px',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                            filter: 'blur(30px)',
                            zIndex: 1,
                            transition: 'all 0.5s ease'
                          }} />
                          
                          <img 
                            src={book.image} 
                            alt={book.title} 
                            style={{ 
                              height: isMobile ? 200 : 320, 
                              maxWidth: '100%',
                              objectFit: 'contain',
                              borderRadius: '8px',
                              boxShadow: isHovered 
                                ? '0 30px 60px -12px rgba(0, 0, 0, 0.6)' 
                                : '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
                              transform: isHovered
                                ? 'rotateY(-10deg) rotateX(5deg) translateY(-15px) scale(1.05)'
                                : 'rotateY(-5deg) rotateX(5deg) translateY(0) scale(1)',
                              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              position: 'relative',
                              zIndex: 2,
                              cursor: 'pointer'
                            }}
                          />
                          
                          {/* Price Tag */}
                          {book.price && !isMobile && (
                            <div style={{
                              position: 'absolute',
                              bottom: '10px', right: '-10px',
                              background: 'rgba(255, 255, 255, 0.95)',
                              padding: '10px 16px', borderRadius: '12px',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                              zIndex: 3,
                              transform: isHovered 
                                ? 'rotate(0deg) scale(1.1) translateZ(20px)' 
                                : 'rotate(3deg) scale(1) translateZ(0)',
                              transition: 'all 0.4s ease'
                            }}>
                              <Text style={{ 
                                fontSize: '18px', fontWeight: 800, color: '#ff4d4f',
                                display: 'block', lineHeight: 1
                              }}>
                                Rp {book.price.toLocaleString('id-ID')}
                              </Text>
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
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
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            );
          })}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default HeroSection;