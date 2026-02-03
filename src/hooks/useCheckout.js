import { useState } from 'react';
import { message } from 'antd';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi utama untuk memproses pembayaran
  const processCheckout = async (formData, cartItems, cartTotal) => {
    setIsLoading(true);

    try {
      // 1. Susun Payload sesuai format Backend GoLang
      const payload = {
        customer_name: formData.fullname,
        customer_email: formData.email,
        customer_phone: formData.phone,
        // Gabungkan alamat agar rapi di database
        customer_address: `${formData.address}, ${formData.district}, ${formData.city}, ${formData.province} (${formData.postalCode})`,
        payment_method: formData.paymentMethod,
        total_amount: cartTotal,
        details: cartItems.map(item => ({
          book_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // 2. Kirim Request ke Backend
      const response = await fetch("https://bookthree-api.miproduction.my.id/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Gagal melakukan pembayaran");
      }

      const result = await response.json();
      
      // 3. Return data sukses (Order Code dari backend)
      return { success: true, orderCode: result.order_code, data: result };

    } catch (error) {
      console.error("Checkout Error:", error);
      message.error("Terjadi kesalahan saat memproses pesanan.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCartItems([]); // Kosongkan State
    localStorage.removeItem('bookthree_cart'); // Hapus dari Browser Storage
  };

  return {
    clearCart,
    processCheckout,
    isLoading
  };
};