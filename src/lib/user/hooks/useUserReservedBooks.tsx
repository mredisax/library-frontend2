import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverAddress } from '../../../core/config/server';
import { IBook } from '../../../core/types/Book';
import { IReservation, IReservedBook } from '../types/reservation';

export const useUserReservedBooks = (userId: string) => {
  const [reservedBooks, setReservedBooks] = useState<IReservedBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReservations = async (): Promise<IReservation[]> => {
    const res = await axios.get(`${serverAddress}/reservation/user/${userId}`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) return res.data;
    else {
      return [];
    }
  };

  const fetchReservedBooks = async (): Promise<IReservedBook[]> => {
    const reservations = await fetchReservations();

    const res = await axios.get(`${serverAddress}/books`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      const books = res.data as IBook[];
      const reservedBooks = books.filter((book) => {
        return reservations.some(
          (reservation) => reservation.book_id === book.id
        );
      });

      const reservedBooksData: IReservedBook[] = reservedBooks.map((book) => {
        const reservation = reservations.find(
          (reservation) => reservation.book_id === book.id
        ) as IReservation;

        return {
          ...book,
          reservation_span: reservation.reservation_span,
        };
      });

      //   setIsLoading(false);
      //   setReservedBooks(reservedBooksData);
      return reservedBooksData;
    } else {
      //   setReservedBooks([]);
      //   setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    if (userId === '') return;
    setIsLoading(true);

    fetchReservedBooks().then((res) => {
      setReservedBooks(res);
      setIsLoading(false);
    });
  }, [userId]);

  return { reservedBooks, isLoading };
};
