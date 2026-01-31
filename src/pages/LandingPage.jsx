import React, { useState } from 'react';
import { Layout, Row, Col, Select, Typography, Empty, Pagination, Spin } from 'antd';
import TopBar from '../components/TopBar';
import HeroSection from '../components/HeroSection';
import EmptyState from '../components/EmptyState';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import { useBooks } from '../hooks/useBooks';
import { useCart } from '../hooks/useCart';

const { Content, Footer } = Layout;
const { Title } = Typography;

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const heroBooks = allBooks.slice(0, 3);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <TopBar onSearch={setSearch} cartCount={cartCount} />

      <Content style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Hero Section tetap ditampilkan agar halaman tidak sepi */}
          <HeroSection onBookClick={handleBookClick} books={heroBooks} />

          {/* Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
            <Title level={3} style={{ margin: 0 }}>Katalog Buku</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#888' }}>Urutkan:</span>
              <Select 
                defaultValue="terbaru" 
                style={{ width: 150 }} 
                onChange={setSortType}
                options={[
                  { value: 'terbaru', label: 'Terbaru' },
                  { value: 'terlama', label: 'Terlama' },
                  { value: 'termurah', label: 'Termurah' },
                  { value: 'termahal', label: 'Termahal' },
                ]}
              />
            </div>
          </div>
          
          {/* 1. KONDISI LOADING */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <Spin size="large" tip="Memuat koleksi buku..." />
            </div>
          ) : error ? (
            /* 2. KONDISI ERROR (Server Mati) */
            <EmptyState type="error" onRetry={handleRetry} />
          ) : books.length === 0 ? (
            /* 3. KONDISI DATA KOSONG */
            <EmptyState type="empty" onRetry={handleRetry} />
          ) : (
            /* 4. KONDISI DATA ADA */
            <>
              <Row gutter={[24, 24]}>
                {books.map((book) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
                    <BookCard book={book} onClick={handleBookClick} />
                  </Col>
                ))}
              </Row>

              <div style={{ marginTop: 40, textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  total={totalItems}
                  pageSize={pageSize}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 500, behavior: 'smooth' });
                  }}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}

        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#fff', marginTop: 40 }}>
        BookThree ©{new Date().getFullYear()} Created by MochIzzan
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