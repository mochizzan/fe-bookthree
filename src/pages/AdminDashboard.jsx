import React, { useState } from 'react';
import { Layout, theme, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// Import Komponen Logic
import { useAdmin } from '../hooks/useAdmin';

// Import Komponen UI
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardStats from '../components/admin/DashboardStats';
import BookTable from '../components/admin/BookTable';
import TransactionTable from '../components/admin/TransactionTable';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Panggil Logic dari Hook
  const { 
    selectedKey, setSelectedKey, handleLogout, getStatusTag, 
    booksData, transactions, stats, updateStatus, books,
    addBook, editBook, deleteBook
  } = useAdmin();
  
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  // Logic Render Konten Halaman
  const renderContent = () => {
    switch (selectedKey) {
      case '1': 
        return (
          <DashboardStats 
            stats={stats} 
            recentTransactions={transactions.slice(0, 3)} 
            getStatusTag={getStatusTag}
            onSeeAll={() => setSelectedKey('3')} 
          />
        );
      case '2': 
        return <BookTable data={books} onAddBook={addBook} onEditBook={editBook} onDeleteBook={deleteBook}/>;
      case '3': 
        return <TransactionTable data={transactions} getStatusTag={getStatusTag} onUpdateStatus={updateStatus} />;
      default: 
        return null;
    }
  };

  // Helper Judul Header
  const getHeaderTitle = () => {
    if (selectedKey === '1') return 'Dashboard Overview';
    if (selectedKey === '2') return 'Kelola Buku';
    return 'Data Transaksi';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      {/* 1. SIDEBAR COMPONENT */}
      <AdminSidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        selectedKey={selectedKey} 
        setSelectedKey={setSelectedKey} 
      />

      <Layout>
        {/* 2. HEADER */}
        <Header style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>{getHeaderTitle()}</Title>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} danger>Logout</Button>
        </Header>

        {/* 3. DYNAMIC CONTENT AREA */}
        <Content style={{ margin: '16px 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {renderContent()}
          </div>
        </Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          BookThree Admin System ©{new Date().getFullYear()}
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;