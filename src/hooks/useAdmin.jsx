import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, message } from 'antd';

export const useAdmin = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1'); 
  
  // --- STATE DATA (Realtime dari API) ---
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. INITIAL LOAD ---
  useEffect(() => {
    const token = localStorage.getItem('bookthree_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Panggil kedua data sekaligus
    fetchBooks();
    fetchTransactions();
  }, [navigate]);

  // --- 2. FETCH DATA BUKU (GET) ---
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/books');
      if (!response.ok) throw new Error("Gagal mengambil data buku");
      const data = await response.json();
      setBooks(data || []);
    } catch (error) {
      console.error(error);
      // Jangan spam error message jika ini load awal
    }
  };

  // --- 3. FETCH DATA TRANSAKSI (GET) ---
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transactions');
      if (!response.ok) throw new Error("Gagal mengambil data transaksi");
      const data = await response.json();
      setTransactions(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Matikan loading setelah semua selesai
    }
  };

  // --- 4. CRUD BUKU (Connect ke Backend) ---

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // Key harus "image" sesuai GoLang

    try {
      const response = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal upload gambar");

      const data = await response.json();
      return data.url; // Mengembalikan URL dari server (http://localhost:8080/uploads/...)
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // --- UPDATE ADD BOOK ---
  const addBook = async (values) => {
    try {
      let imageUrl = "https://placehold.co/300x450?text=No+Image"; // Default jika tidak ada gambar

      // Jika user memilih file gambar, upload dulu!
      if (values.imageFile) {
        message.loading({ content: "Mengupload gambar...", key: "uploading" });
        imageUrl = await uploadImage(values.imageFile);
        message.success({ content: "Gambar terupload!", key: "uploading" });
      }

      const payload = {
        title: values.title,
        author: values.author,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        category: values.category,
        description: values.description,
        image: imageUrl // <--- Gunakan URL hasil upload / default
      };

      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Gagal menyimpan buku");

      message.success("Buku berhasil ditambahkan!");
      fetchBooks(); 
    } catch (error) {
      message.error(error.message);
    }
  };

  // --- UPDATE EDIT BOOK ---
  const editBook = async (id, values) => {
    try {
      let imageUrl = values.image; // Pakai URL lama dulu

      // Jika ada file baru dipilih, upload file baru
      if (values.imageFile) {
         message.loading({ content: "Mengupload gambar baru...", key: "uploading" });
         imageUrl = await uploadImage(values.imageFile);
         message.success({ content: "Gambar baru terupload!", key: "uploading" });
      }

      const payload = {
        title: values.title,
        author: values.author,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        category: values.category,
        description: values.description,
        image: imageUrl
      };

      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Gagal mengupdate buku");

      message.success("Data buku diperbarui!");
      fetchBooks();
    } catch (error) {
      message.error(error.message);
    }
  };

  // HAPUS BUKU (DELETE)
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Gagal menghapus buku");

      message.success("Buku telah dihapus dari database.");
      fetchBooks(); // Refresh tabel
    } catch (error) {
      message.error(error.message);
    }
  };

  // --- 5. LOGIC UPDATE STATUS TRANSAKSI (PUT) ---
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/transactions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Gagal update status");

      message.success("Status berhasil diperbarui!");
      fetchTransactions(); // Refresh tabel
    } catch (error) {
      message.error(error.message);
    }
  };

  // --- 6. HITUNG STATISTIK (Memoized) ---
  const stats = useMemo(() => {
    const uniqueBuyers = new Set(transactions.map(t => t.customer_name)).size;
    const totalRevenue = transactions
      .filter(t => t.status !== 104)
      .reduce((total, t) => total + t.total_amount, 0);

    return {
      totalBooks: books.length,
      totalTransactions: transactions.length,
      totalUser: uniqueBuyers,
      omset: totalRevenue
    };
  }, [books, transactions]);

  // Helper Tag Status (UI Only)
  const getStatusTag = (statusId) => {
    switch (statusId) {
      case 100: return <Tag color="orange">Belum Proses</Tag>;
      case 101: return <Tag color="blue">Diproses</Tag>;
      case 102: return <Tag color="cyan">Dikirim</Tag>;
      case 103: return <Tag color="green">Selesai</Tag>;
      case 104: return <Tag color="red">Batal</Tag>;
      default: return <Tag>Unknown</Tag>;
    }
  };

  return {
    selectedKey,
    setSelectedKey,
    handleLogout: () => {
      localStorage.removeItem('bookthree_token');
      navigate('/login');
    },
    getStatusTag,
    books,        // Data Buku Realtime
    addBook,      // Fungsi API Add
    editBook,     // Fungsi API Edit
    deleteBook,   // Fungsi API Delete
    transactions, // Data Transaksi Realtime
    updateStatus, // Fungsi API Status
    stats,        // Statistik Realtime
    loading
  };
};