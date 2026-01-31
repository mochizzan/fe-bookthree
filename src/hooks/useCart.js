import { useState, useEffect } from 'react';
import { message } from 'antd';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('bookthree_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveToLocal = (items) => {
    setCartItems(items);
    localStorage.setItem('bookthree_cart', JSON.stringify(items));
  };

  const addToCart = (book, quantity) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === book.id);
    let updatedCart = [...cartItems];

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...book, quantity });
    }

    saveToLocal(updatedCart);
    message.success(`${quantity} buku "${book.title}" masuk keranjang!`);
  };

  // FUNGSI BARU: Update jumlah dari halaman Cart
  const updateQuantity = (bookId, newQty) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === bookId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveToLocal(updatedCart);
  };

  // FUNGSI BARU: Hapus item
  const removeFromCart = (bookId) => {
    const updatedCart = cartItems.filter(item => item.id !== bookId);
    saveToLocal(updatedCart);
    message.info("Buku dihapus dari keranjang");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('bookthree_cart');
  };

  return { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartCount,
    cartTotal
  };
};