import React from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, BookOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, setCollapsed, selectedKey, setSelectedKey }) => {
  const items = [
    { key: '1', icon: <DesktopOutlined />, label: 'Dashboard' },
    { key: '2', icon: <BookOutlined />, label: 'Manajemen Buku' },
    { key: '3', icon: <ShoppingOutlined />, label: 'Transaksi' },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
        {collapsed ? 'B3' : 'ADMIN PANEL'}
      </div>
      <Menu 
        theme="dark" 
        selectedKeys={[selectedKey]} 
        mode="inline" 
        items={items} 
        onClick={(e) => setSelectedKey(e.key)}
      />
    </Sider>
  );
};

export default AdminSidebar;