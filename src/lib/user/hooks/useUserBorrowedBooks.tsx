import { useEffect, useState } from 'react';
import { IBorrow, IBorrowedBook } from '../types/borrow';
import axios from 'axios';
import { serverAddress } from '../../../core/config/server';
import { IBook } from '../../../core/types/Book';

export const useUserBorrowedBooks = (userId: string) => {
  const [borrowedBooks, setBorrowedBooks] = useState<IBorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBorrows = async (): Promise<IBorrow[]> => {
    const res = await axios.get(`${serverAddress}/borrow/user/${userId}`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) return res.data;
    else {
      return [];
    }
  };

  const fetchBorrowedBooks = async (): Promise<IBorrowedBook[]> => {
    const borrows = await fetchBorrows();

    const res = await axios.get(`${serverAddress}/books`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      const books = res.data as IBook[];
      const reservedBooks = books.filter((book) => {
        return borrows.some((borrow) => borrow.book_id === book.id);
      });

      const borrowedBooksData: IBorrowedBook[] = reservedBooks.map((book) => {
        const borrow = borrows.find(
          (borrow) => borrow.book_id === book.id
        ) as IBorrow;

        return {
          ...book,
          checkout_date: borrow.checkout_date,
          return_date: borrow.return_date,
        };
      });

      //   setIsLoading(false);
      //   setBorrowedBooks(borrowedBooksData);
      return borrowedBooksData;
    } else {
      //   setBorrowedBooks([]);
      //   setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    if (userId === '') return;
    setIsLoading(true);

    fetchBorrowedBooks().then((res) => {
      setBorrowedBooks(res);
      setIsLoading(false);
    });
  }, [userId]);

  return { borrowedBooks, isLoading };
};
