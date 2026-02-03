import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, Tag, Divider, Space } from 'antd';
import { 
  CheckCircleFilled, 
  ClockCircleOutlined, 
  MessageOutlined, 
  PhoneOutlined,
  HomeOutlined,
  FileTextOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const PaymentSuccessModal = ({ isOpen, orderId, onHome }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const steps = [
    {
      icon: <CheckCircleFilled style={{ color: '#52c41a', fontSize: 24 }} />,
      title: 'Pesanan Diterima',
      desc: 'Data berhasil masuk sistem',
      active: true,
      done: true
    },
    {
      icon: <ClockCircleOutlined style={{ color: '#faad14', fontSize: 24 }} />,
      title: 'Menunggu Konfirmasi',
      desc: 'Admin akan menghubungi Anda',
      active: true,
      done: false
    },
    {
      icon: <MessageOutlined style={{ color: '#1677ff', fontSize: 24 }} />,
      title: 'Pembayaran & Kirim',
      desc: 'Konfirmasi via WhatsApp/Telepon',
      active: false,
      done: false
    }
  ];

  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
      centered
      width={480}
      bodyStyle={{ padding: 0, borderRadius: 24, overflow: 'hidden' }}
      style={{ borderRadius: 24 }}
    >
      <AnimatePresence>
        {showConfetti && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 10 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: Math.random() * 480, 
                  opacity: 1,
                  rotate: 0
                }}
                animate={{ 
                  y: 600, 
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                style={{
                  position: 'absolute',
                  width: 8 + Math.random() * 8,
                  height: 8 + Math.random() * 8,
                  borderRadius: Math.random() > 0.5 ? '50%' : 2,
                  backgroundColor: ['#52c41a', '#1677ff', '#faad14', '#eb2f96', '#722ed1'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header Section with Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
          padding: '40px 32px 32px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Animated Check Circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.2 
          }}
          style={{
            width: 90,
            height: 90,
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 32px rgba(82, 196, 26, 0.3)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
          >
            <CheckCircleFilled style={{ fontSize: 48, color: '#52c41a' }} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Title level={3} style={{ color: 'white', margin: 0, marginBottom: 8 }}>
            Pesanan Berhasil Dibuat!
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
            Terima kasih telah berbelanja dengan kami
          </Text>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div style={{ padding: '24px 32px 32px' }}>
        
        {/* Order ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated background pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 200,
              height: 200,
              background: '#52c41a',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(40px)'
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Space align="center" style={{ marginBottom: 8 }}>
              <FileTextOutlined style={{ color: '#389e0d' }} />
              <Text type="secondary" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                Nomor Order Anda
              </Text>
            </Space>
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <Title 
                level={2} 
                style={{ 
                  margin: '8px 0', 
                  color: '#389e0d', 
                  letterSpacing: 3,
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
              >
                {orderId}
              </Title>
            </motion.div>

            <Tag color="success" style={{ borderRadius: 12, padding: '4px 12px' }}>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ● Menunggu Konfirmasi Admin
              </motion.span>
            </Tag>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginBottom: 24 }}
        >
          <Text strong style={{ fontSize: 14, color: '#262626', display: 'block', marginBottom: 16 }}>
            Status Pesanan
          </Text>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 16,
                    top: 40,
                    width: 2,
                    height: 30,
                    background: step.done ? '#52c41a' : '#d9d9d9'
                  }} />
                )}
                
                <motion.div 
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: step.done ? '#f6ffed' : step.active ? '#fffbe6' : '#f5f5f5',
                    border: `2px solid ${step.done ? '#52c41a' : step.active ? '#faad14' : '#d9d9d9'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    flexShrink: 0,
                    zIndex: 1
                  }}
                  animate={step.active && !step.done ? {
                    scale: [1, 1.1, 1],
                    borderColor: ['#faad14', '#ffd666', '#faad14']
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
                
                <div style={{ paddingTop: 4, flex: 1 }}>
                  <Text strong style={{ 
                    color: step.done ? '#389e0d' : step.active ? '#d48806' : '#8c8c8c',
                    display: 'block',
                    marginBottom: 2
                  }}>
                    {step.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#8c8c8c' }}>
                    {step.desc}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{
            background: '#e6f7ff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            border: '1px solid #91d5ff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#1677ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <WhatsAppOutlined style={{ color: 'white', fontSize: 20 }} />
            </div>
            <div>
              <Text strong style={{ color: '#096dd9', display: 'block', marginBottom: 4 }}>
                Tim Admin Kami Akan Menghubungi Anda
              </Text>
              <Text style={{ fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
                Kami akan segera mengonfirmasi pesanan Anda melalui <b>WhatsApp</b> atau <b>Telepon</b> sesuai data yang telah diinputkan. Mohon pastikan nomor Anda aktif.
              </Text>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button 
            type="primary" 
            size="large" 
            block
            onClick={onHome}
            icon={<HomeOutlined />}
            style={{ 
              height: 48,
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)'
            }}
          >
            Kembali ke Beranda
          </Button>
          
          <Text style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginTop: 12, 
            fontSize: 12, 
            color: '#8c8c8c' 
          }}>
            Simpan nomor order Anda untuk tracking pesanan
          </Text>
        </motion.div>
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;