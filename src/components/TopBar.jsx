import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Input, 
  Badge, 
  Typography, 
  Button, 
  Space, 
  Drawer, 
  Tooltip, 
  Divider,
  Grid,
  ConfigProvider
} from "antd";
import {
  ShoppingCartOutlined,
  BookOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
  TruckOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import CheckOrderModal from "./CheckOrderModal";

const { Header } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { useBreakpoint } = Grid;

const TopBar = ({ onSearch, cartCount }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMobile = !screens.md;

  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          controlHeight: 44,
        },
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          padding: isMobile ? "0 16px" : "0 32px",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 1px 3px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: isMobile ? "64px" : "80px",
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Logo Area */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Space align="center" size={12}>
            <div
              style={{
                background: "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
                borderRadius: 12,
                width: isMobile ? 36 : 42,
                height: isMobile ? 36 : 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(22, 119, 255, 0.25)",
                transition: "transform 0.3s ease",
              }}
            >
              <BookOutlined style={{ fontSize: isMobile ? 20 : 24, color: "#fff" }} />
            </div>
            <Title
              style={{
                margin: 0,
                fontSize: isMobile ? 18 : 22,
                fontWeight: 700,
                background: "linear-gradient(135deg, #1a1a1a 0%, #434343 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BookThree
            </Title>
          </Space>
        </Link>

        {/* Search Bar - Desktop */}
        {!isMobile && (
          <div
            style={{
              flex: 1,
              maxWidth: 600,
              margin: "0 40px",
            }}
          >
            <Input.Group compact style={{ display: "flex" }}>
              <Input
                placeholder="Cari judul buku, penulis, atau ISBN..."
                allowClear
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearch(e.target.value);
                }}
                onPressEnter={() => handleSearch(searchValue)}
                style={{
                  width: "calc(100% - 80px)",
                  height: 46,
                  borderRadius: "12px 0 0 12px",
                  border: "2px solid #e5e7eb",
                  borderRight: "none",
                  paddingLeft: 16,
                  fontSize: 14,
                  background: "#f9fafb",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.borderColor = "#1677ff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(22, 119, 255, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.background = "#f9fafb";
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => handleSearch(searchValue)}
                style={{
                  width: 80,
                  height: 46,
                  borderRadius: "0 12px 12px 0",
                  background: "#1677ff",
                  border: "2px solid #1677ff",
                  borderLeft: "none",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Cari
              </Button>
            </Input.Group>
          </div>
        )}

        {/* Actions Area */}
        <Space align="center" size={isMobile ? 8 : 16}>
          {/* Search Icon - Mobile Only */}
          {isMobile && (
            <Button
              type="text"
              shape="circle"
              icon={<SearchOutlined style={{ fontSize: 20, color: "#555" }} />}
              style={{ width: 40, height: 40 }}
              onClick={() => setMobileMenuOpen(true)}
            />
          )}

          {/* Cart */}
          <Link to="/cart">
            <Tooltip title="Keranjang">
              <Badge
                count={cartCount}
                showZero={false}
                color="#fa8c16"
                style={{ boxShadow: "0 2px 8px rgba(250, 140, 22, 0.4)" }}
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={<ShoppingCartOutlined style={{ fontSize: 22, color: "#555" }} />}
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "rgba(255,255,255,0.6)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </Badge>
            </Tooltip>
          </Link>

          {/* Cek Resi - Desktop */}
          {!isMobile && (
            <Tooltip title="Lacak Pesanan">
              <Button
                type="text"
                icon={<TruckOutlined style={{ fontSize: 18 }} />}
                onClick={() => setIsCheckModalOpen(true)}
                style={{
                  height: 44,
                  borderRadius: 12,
                  padding: "0 16px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: "rgba(255,255,255,0.6)",
                  color: "#555",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(22, 119, 255, 0.05)";
                  e.currentTarget.style.color = "#1677ff";
                  e.currentTarget.style.borderColor = "rgba(22, 119, 255, 0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.color = "#555";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Lacak
              </Button>
            </Tooltip>
          )}

          <Divider
            type="vertical"
            style={{ height: 24, borderColor: "rgba(0,0,0,0.08)" }}
          />

          {/* Login */}
          <Button
            type="primary"
            icon={<UserOutlined />}
            size="middle"
            onClick={() => navigate("/login")}
            style={{
              borderRadius: 12,
              fontWeight: 600,
              background: "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
              border: "none",
              boxShadow: "0 4px 12px rgba(22, 119, 255, 0.3)",
              height: 44,
              padding: "0 20px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(22, 119, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(22, 119, 255, 0.3)";
            }}
          >
            {isMobile ? "" : "Login"}
          </Button>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setMobileMenuOpen(true)}
              style={{ width: 40, height: 40 }}
            />
          )}
        </Space>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <Space align="center">
            <div
              style={{
                background: "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOutlined style={{ color: "#fff", fontSize: 18 }} />
            </div>
            <Text strong style={{ fontSize: 18 }}>
              BookThree
            </Text>
          </Space>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
        closeIcon={<CloseOutlined />}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          {/* Mobile Search Input */}
          <div>
            <Text type="secondary" style={{ marginBottom: 8, display: "block" }}>
              Pencarian
            </Text>
            <Input.Search
              placeholder="Cari buku..."
              allowClear
              enterButton
              onSearch={(value) => {
                onSearch(value);
                setMobileMenuOpen(false);
              }}
            />
          </div>

          <Divider style={{ margin: "8px 0" }} />

          {/* Mobile Menu Items */}
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            block
            style={{ justifyContent: "flex-start", height: 48 }}
            onClick={() => {
              navigate("/cart");
              setMobileMenuOpen(false);
            }}
          >
            Keranjang {cartCount > 0 && `(${cartCount})`}
          </Button>

          <Button
            type="text"
            icon={<TruckOutlined />}
            block
            style={{ justifyContent: "flex-start", height: 48 }}
            onClick={() => {
              setIsCheckModalOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            Lacak Pesanan
          </Button>

          <Button
            type="text"
            icon={<UserOutlined />}
            block
            style={{ justifyContent: "flex-start", height: 48 }}
            onClick={() => {
              navigate("/login");
              setMobileMenuOpen(false);
            }}
          >
            Login Admin
          </Button>
        </Space>
      </Drawer>

      <CheckOrderModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
      />
    </ConfigProvider>
  );
};

export default TopBar;