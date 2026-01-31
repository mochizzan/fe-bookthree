import React from 'react';
import { Layout, Typography, Tooltip } from 'antd';
import { 
  DesktopOutlined, 
  BookOutlined, 
  ShoppingOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, setCollapsed, selectedKey, setSelectedKey }) => {
  const menuItems = [
    { key: '1', icon: <DesktopOutlined />, label: 'Dashboard' },
    { key: '2', icon: <BookOutlined />, label: 'Manajemen Buku' },
    { key: '3', icon: <ShoppingOutlined />, label: 'Transaksi' },
  ];

  return (
    <Sider 
      trigger={null}
      collapsible 
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={260}
      collapsedWidth={80}
      style={{
        background: 'linear-gradient(180deg, #1a1f2e 0%, #16213e 50%, #0f172a 100%)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        position: 'fixed', // TAMBAHKAN INI
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        height: '100vh', // Full height
        overflow: 'auto', // Jika konten sidebar terlalu panjang (opsional)
        scrollbarWidth: 'none', // Hide scrollbar Firefox
        msOverflowStyle: 'none', // Hide scrollbar IE
      }}
      // Hide scrollbar Chrome/Safari
      className="custom-sidebar"
    >
      <style>{`
        .custom-sidebar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Logo Header */}
      <div style={{
        height: 80,
        margin: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 16,
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            flexShrink: 0
          }}>
            <span style={{
              color: '#fff',
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: '-1px'
            }}>
              B3
            </span>
          </div>
          
          {!collapsed && (
            <div>
              <div style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.5px',
                lineHeight: 1.2
              }}>
                BOOKTHREE
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 11,
                letterSpacing: '1px',
                fontWeight: 500
              }}>
                ADMIN PANEL
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Menu */}
      <div style={{ 
        padding: '0 12px',
        position: 'relative',
        zIndex: 2
      }}>
        {menuItems.map((item) => {
          const isActive = selectedKey === item.key;
          
          return (
            <Tooltip 
              title={collapsed ? item.label : ''} 
              placement="right" 
              key={item.key}
            >
              <div
                onClick={() => setSelectedKey(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? 0 : 16,
                  padding: collapsed ? '16px 0' : '16px 20px',
                  margin: '8px 0',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%)' 
                    : 'transparent',
                  border: isActive ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: 20,
                    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '0 4px 4px 0',
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  fontSize: 20,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.3s ease',
                  minWidth: 24,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </div>

                {/* Label */}
                {!collapsed && (
                  <span style={{
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: 15,
                    letterSpacing: '0.3px',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.label}
                  </span>
                )}

                {/* Active Dot */}
                {isActive && !collapsed && (
                  <div style={{
                    position: 'absolute',
                    right: 12,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#52c41a',
                    boxShadow: '0 0 8px #52c41a'
                  }} />
                )}
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <div 
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: collapsed ? 20 : 20,
          width: 32,
          height: 32,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {collapsed ? <RightOutlined style={{ fontSize: 14, color: '#fff' }} /> : <LeftOutlined style={{ fontSize: 14, color: '#fff' }} />}
      </div>

      {/* Footer Status */}
      {!collapsed && (
        <div style={{
          position: 'absolute',
          bottom: 80,
          left: 20,
          right: 20,
          padding: 12,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.05)',
          zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ 
              width: 8, 
              height: 8, 
              background: '#52c41a', 
              borderRadius: '50%', 
              boxShadow: '0 0 8px #52c41a' 
            }} />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Sistem Aktif</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
            v1.0.0 Stable
          </span>
        </div>
      )}
    </Sider>
  );
};

export default AdminSidebar;