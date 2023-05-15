import axios from 'axios';
import { serverAddress } from '../../../core/config/server';

export const getCanBookBeReserved = async (
  bookId: number,
  startDate: Date
): Promise<{ canBeReserved: boolean; reservationDueDate: Date }> => {
  const res = await axios.get(`${serverAddress}/reservation/book/${bookId}`, {
    validateStatus: (status) => status >= 200 && status < 500,
  });

  if (res.data === '' || !res.data || !res.data.reservation_span)
    return {
      canBeReserved: true,
      reservationDueDate: new Date(),
    };
  else {
    const { reservation_span } = res.data;
    let reservationEndDate = new Date(reservation_span);
    let reservationStartDate = new Date(
      reservationEndDate.getFullYear(),
      reservationEndDate.getMonth() - 1,
      reservationEndDate.getDate()
    );
    let endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate()
    );
    let _startDate = new Date(startDate);

    endDate = resetTime(endDate);
    reservationStartDate = resetTime(reservationStartDate);
    reservationEndDate = resetTime(reservationEndDate);
    _startDate = resetTime(_startDate);

    if (
      (reservationStartDate.getTime() <= endDate.getTime() &&
        reservationStartDate.getTime() >= _startDate.getTime()) ||
      (reservationEndDate.getTime() >= _startDate.getTime() &&
        reservationEndDate.getTime() <= endDate.getTime())
    )
      return {
        canBeReserved: false,
        reservationDueDate: reservationEndDate,
      };
    else
      return {
        canBeReserved: true,
        reservationDueDate: reservationEndDate,
      };
  }
};

const resetTime = (date: Date): Date => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setHours(0);
  date.setMinutes(0);

  return date;
};
