import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverAddress } from '../../../core/config/server';
import { IBook } from '../../../core/types/Book';

export const useBooksData = () => {
  const [books, setBooks] = useState<Array<IBook>>([]);

  useEffect(() => {
    axios.get(`${serverAddress}/books`).then((res) => {
      setBooks(res.data);
    });
  }, []);

  return { books };
};
