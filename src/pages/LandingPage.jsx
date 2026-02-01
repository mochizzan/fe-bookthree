import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Select, Typography, Pagination, Spin } from 'antd';
import TopBar from '../components/TopBar';
import HeroSection from '../components/HeroSection';
import EmptyState from '../components/EmptyState';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import { useBooks } from '../hooks/useBooks';
import { useCart } from '../hooks/useCart';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const LandingPage = () => {
  const { 
    books,
    allBooks,
    totalItems, 
    currentPage, 
    setCurrentPage, 
    pageSize,
    setSearch, 
    setSortType,
    loading,
    error
  } = useBooks();
  
  const { addToCart, cartCount } = useCart();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const heroBooks = allBooks.slice(0, 3);

  // Animation keyframes
  const fadeInUp = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `;

  return (
    <Layout style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <style>{fadeInUp}</style>
      
      <TopBar onSearch={setSearch} cartCount={cartCount} />

      <Content style={{ padding: '0', overflow: 'hidden' }}>
        
        {/* Hero Section with Modern Gradient Background */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
        }}>
          {/* Animated Background Shapes */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            top: '-100px',
            right: '-50px',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            bottom: '-50px',
            left: '10%',
            animation: 'float 8s ease-in-out infinite reverse'
          }} />
          
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1
          }}>
            <HeroSection 
              onBookClick={handleBookClick} 
              books={heroBooks} 
            />
          </div>
        </div>

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px 40px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out'
        }}>
          
          {/* Modern Filter Bar with Glassmorphism */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '40px', 
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '20px 30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}>
                📚
              </div>
              <Title level={3} style={{ 
                margin: 0, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                fontSize: '24px'
              }}>
                Katalog Buku
              </Title>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              background: '#f8f9fa',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <Text style={{ color: '#6c757d', fontWeight: 500, fontSize: '14px' }}>
                Urutkan:
              </Text>
              <Select 
                defaultValue="terbaru" 
                style={{ width: 150 }} 
                onChange={setSortType}
                bordered={false}
                dropdownStyle={{ borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                options={[
                  { value: 'terbaru', label: '✨ Terbaru' },
                  { value: 'terlama', label: '📅 Terlama' },
                  { value: 'termurah', label: '💰 Termurah' },
                  { value: 'termahal', label: '💎 Termahal' },
                ]}
              />
            </div>
          </div>
          
          {/* 1. KONDISI LOADING - Modern Skeleton */}
          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '100px 20px',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <Spin size="large" style={{ 
                  '& .ant-spin-dot-item': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }
                }} />
              </div>
              <Text style={{ 
                color: '#6c757d', 
                fontSize: '16px',
                display: 'block',
                animation: 'pulse 2s infinite'
              }}>
                Memuat koleksi buku terbaik untuk Anda...
              </Text>
            </div>
          ) : error ? (
            /* 2. KONDISI ERROR (Server Mati) */
            <div style={{
              animation: 'fadeInUp 0.6s ease-out',
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <EmptyState type="error" onRetry={handleRetry} />
            </div>
          ) : books.length === 0 ? (
            /* 3. KONDISI DATA KOSONG */
            <div style={{
              animation: 'fadeInUp 0.6s ease-out',
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <EmptyState type="empty" onRetry={handleRetry} />
            </div>
          ) : (
            /* 4. KONDISI DATA ADA */
            <>
              <Row gutter={[24, 24]}>
                {books.map((book, index) => (
                  <Col 
                    xs={24} 
                    sm={12} 
                    md={8} 
                    lg={6} 
                    key={book.id}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <div style={{
                      height: '100%',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}>
                      <BookCard 
                        book={book} 
                        onClick={handleBookClick}
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          borderRadius: '16px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          border: '1px solid rgba(255,255,255,0.8)',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Modern Pagination */}
              <div style={{ 
                marginTop: '60px', 
                textAlign: 'center',
                padding: '30px',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                <Pagination
                  current={currentPage}
                  total={totalItems}
                  pageSize={pageSize}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 500, behavior: 'smooth' });
                  }}
                  showSizeChanger={false}
                  style={{
                    '& .ant-pagination-item': {
                      borderRadius: '10px',
                      border: 'none',
                      background: '#f8f9fa',
                      transition: 'all 0.3s ease'
                    },
                    '& .ant-pagination-item-active': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                    }
                  }}
                />
                <Text style={{ 
                  display: 'block', 
                  marginTop: '12px', 
                  color: '#adb5bd',
                  fontSize: '14px'
                }}>
                  Menampilkan {books.length} dari {totalItems} buku
                </Text>
              </div>
            </>
          )}

        </div>
      </Content>

      {/* Modern Footer */}
      <Footer style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: '60px 20px 30px',
        marginTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #667eea)',
          backgroundSize: '300% 100%',
          animation: 'shimmer 3s infinite linear'
        }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[48, 32]} justify="space-between">
            <Col xs={24} md={8}>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ 
                  fontSize: '28px', 
                  fontWeight: 800, 
                  color: 'white',
                  letterSpacing: '-0.5px'
                }}>
                  BookThree
                </Text>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  background: '#667eea',
                  borderRadius: '50%',
                  marginLeft: '4px',
                  verticalAlign: 'super'
                }} />
              </div>
              <Text style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '14px',
                lineHeight: '1.8',
                display: 'block',
                marginBottom: '20px'
              }}>
                Temukan dunia baru di setiap halaman. Koleksi buku terbaik untuk menemani perjalanan literasi Anda.
              </Text>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['📖', '✍️', '🎓'].map((emoji, i) => (
                  <div key={i} style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-3px)'
                    }
                  }}>
                    {emoji}
                  </div>
                ))}
              </div>
            </Col>
            
            <Col xs={24} md={6}>
              <Title level={4} style={{ 
                color: 'white', 
                fontSize: '16px', 
                marginBottom: '20px',
                fontWeight: 600
              }}>
                Tautan Cepat
              </Title>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Beranda', 'Katalog', 'Tentang Kami', 'Kontak'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      '&:hover': {
                        color: '#667eea',
                        transform: 'translateX(5px)'
                      }
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>

            <Col xs={24} md={8}>
              <Title level={4} style={{ 
                color: 'white', 
                fontSize: '16px', 
                marginBottom: '20px',
                fontWeight: 600
              }}>
                Newsletter
              </Title>
              <Text style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '14px',
                display: 'block',
                marginBottom: '16px'
              }}>
                Dapatkan rekomendasi buku terbaru langsung ke inbox Anda.
              </Text>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  placeholder="Email Anda" 
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      borderColor: '#667eea',
                      background: 'rgba(255,255,255,0.1)'
                    }
                  }}
                />
                <button style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
                  }
                }}>
                  Kirim
                </button>
              </div>
            </Col>
          </Row>

          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: '40px',
            paddingTop: '30px',
            textAlign: 'center'
          }}>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              BookThree ©{new Date().getFullYear()} Created by MochIzzan
            </Text>
            <Text style={{ 
              color: 'rgba(255,255,255,0.3)', 
              fontSize: '12px',
              display: 'block',
              marginTop: '8px'
            }}>
              Made with 💜 & ☕
            </Text>
          </div>
        </div>
      </Footer>

      <BookDetailModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />
    </Layout>
  );
};

export default LandingPage;