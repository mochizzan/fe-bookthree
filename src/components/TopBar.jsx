import React, { useState } from "react";
import { Layout, Input, Badge, Typography, Button, Divider } from "antd";
import {
  ShoppingCartOutlined,
  BookOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import CheckOrderModal from "./CheckOrderModal";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

const TopBar = ({ onSearch, cartCount }) => {
  const navigate = useNavigate();

  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 0.95)", // Sedikit transparan agar modern
          backdropFilter: "blur(10px)", // Efek blur di belakang header
          padding: "0 20px", // Padding responsif
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)", // Shadow halus
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "70px",
        }}
      >
        {/* 1. Logo Area */}
        <div
          style={{ display: "flex", alignItems: "center", minWidth: "150px" }}
        >
          <div
            style={{
              background: "#1677ff",
              borderRadius: "8px",
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <BookOutlined style={{ fontSize: "20px", color: "#fff" }} />
          </div>
          <Title
            level={4}
            style={{ margin: 0, color: "#333", letterSpacing: "-0.5px" }}
          >
            BookThree
          </Title>
        </div>

        {/* 2. Search Bar (Lebih Lebar & Clean) */}
        <div style={{ flex: 1, maxWidth: "600px", margin: "0 40px" }}>
          <Search
            placeholder="Cari buku favoritmu..."
            allowClear
            enterButton="Cari"
            size="large"
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            style={{ borderRadius: "20px" }} // Membuat search bar rounded
          />
        </div>

        {/* 3. Action Area (Cart | Login) */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Cart Icon Link */}
          <Link to="/cart">
            <div
              style={{
                cursor: "pointer",
                transition: "transform 0.2s",
                marginRight: 10,
              }}
            >
              <Badge count={cartCount} showZero color="#fa8c16">
                <ShoppingCartOutlined
                  style={{ fontSize: "26px", color: "#555" }}
                />
              </Badge>
            </div>
          </Link>

          {/* TOMBOL CEK PESANAN (BARU) */}
          <Button 
            type="text" 
            icon={<SearchOutlined />} 
            onClick={() => setIsCheckModalOpen(true)}
            style={{ marginRight: 10 }}
          >
            Cek Resi
          </Button>

          {/* Pemisah / Divider */}
          <Divider
            type="vertical"
            style={{ height: "30px", margin: "0 20px", borderColor: "#e0e0e0" }}
          />

          {/* Tombol Login Admin */}
          <Button
            type="default"
            icon={<UserOutlined />}
            shape="round"
            size="middle"
            style={{ fontWeight: 500 }}
            onClick={() => navigate("/login")}
          >
            Login Admin
          </Button>
        </div>
      </Header>

      <CheckOrderModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
      />
    </>
  );
};

export default TopBar;
