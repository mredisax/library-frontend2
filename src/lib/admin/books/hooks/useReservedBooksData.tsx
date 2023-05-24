import { useEffect, useState } from 'react';
import { serverAddress } from '../../../../core/config/server';
import axios from 'axios';
import { IReservation, IReservedBook } from '../../../user/types/reservation';

export const useReservedBooksData = () => {
  const [reservedBooksData, setReservedBooksData] = useState<IReservedBook[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReservationsData = async (): Promise<IReservation[]> => {
    const res = await axios.get(`${serverAddress}/reservation`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  };

  const fetchBooksData = async (): Promise<IReservedBook[]> => {
    const reservations = await fetchReservationsData();

    const res = await axios.get(`${serverAddress}/books`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      const books = res.data as IReservedBook[];
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
          reservation_id: reservation.id,
          reservation_user_id: reservation.user_id,
        };
      });

      return reservedBooksData;
    } else {
      return [];
    }
  };

  const removeReservation = async (reservationId: string) => {
    const res = await axios.post(
      `${serverAddress}/reservation/remove-reservation`,
      { reservation_id: reservationId },
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (res.status === 200) {
      refreshReservedBooksData();
    } else {
      console.log(res);
    }
  };

  const refreshReservedBooksData = () => {
    setIsLoading(true);

    fetchBooksData().then((res) => {
      setIsLoading(false);
      setReservedBooksData(res);
    });
  };

  useEffect(() => {
    refreshReservedBooksData();
  }, []);

  return {
    reservedBooksData,
    isLoading,
    refreshReservedBooksData,
    removeReservation,
  };
};
