import axios from 'axios';
import { useEffect, useState } from 'react';
import { IBook } from '../../../../core/types/Book';
import { serverAddress } from '../../../../core/config/server';

export const useBooksData = () => {
  const [books, setBooks] = useState<Array<IBook>>([]);

  useEffect(() => {
    axios.get(`${serverAddress}/books`).then((res) => {
      setBooks(res.data);
    });
  }, []);

  return { books };
};
