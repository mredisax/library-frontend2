import { useEffect, useState } from 'react';
import { IBorrow, IBorrowedBook } from '../../../user/types/borrow';
import axios from 'axios';
import { serverAddress } from '../../../../core/config/server';
import { IBook } from '../../../../core/types/Book';

export const useBorrowedBooksData = () => {
  const [borrowedBooksData, setBorrowedBooksData] = useState<IBorrowedBook[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBorrowsData = async (): Promise<IBorrow[]> => {
    const res = await axios.get(`${serverAddress}/borrow`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  };

  const fetchBooksData = async (): Promise<IBorrowedBook[]> => {
    const borrows = await fetchBorrowsData();

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
          borrow_id: borrow.id,
        };
      });

      return borrowedBooksData;
    } else {
      return [];
    }
  };

  const removeBorrow = async (borrowId: number) => {
    const res = await axios.post(
      `${serverAddress}/borrow/delete-borrow`,
      { borrow_id: borrowId },
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (res.status === 200) {
      refreshBorrowedBooksData();
    } else {
      console.log(res);
    }
  };

  const refreshBorrowedBooksData = () => {
    setIsLoading(true);

    fetchBooksData().then((res) => {
      setIsLoading(false);
      setBorrowedBooksData(res);
    });
  };

  const borrowBook = async (bookId: number, userId: string) => {
    const res = await axios.post(
      `${serverAddress}/borrow`,
      {
        book_id: bookId,
        user_id: userId,
      },
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (res.status === 200) {
      refreshBorrowedBooksData();
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    refreshBorrowedBooksData();
  }, []);

  return {
    borrowedBooksData,
    isLoading,
    refreshBorrowedBooksData,
    borrowBook,
    removeBorrow,
  };
};
