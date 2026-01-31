import { useState, useMemo, useEffect } from 'react';
import { booksData } from '../data/booksData';

export const useBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://bookthree.api.miproduction.my.id/api/books');
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }

        const data = await response.json();
        
        setAllBooks(data || []); 
      } catch (err) {
        console.error(err);
        setError(err.message);
        message.error("Gagal memuat buku. Pastikan server backend nyala!");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    let result = [...allBooks];

    if (search) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortType) {
      case "termurah":
        result.sort((a, b) => a.price - b.price);
        break;
      case "termahal":
        result.sort((a, b) => b.price - a.price);
        break;
      case "terbaru":
        result.sort((a, b) => b.id - a.id); 
        break;
      case "terlama":
        result.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }

    return result;
  }, [allBooks, search, sortType]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage]);

  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1); 
  };

  const handleSort = (val) => {
    setSortType(val);
    setCurrentPage(1);
  };

  return {
    books: paginatedBooks,
    allBooks,
    totalItems: filteredBooks.length,
    currentPage,
    setCurrentPage,
    pageSize,
    search,
    setSearch: handleSearch,
    sortType,
    setSortType: handleSort,
    loading,
    error
  };
};