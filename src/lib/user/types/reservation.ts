import { IBook } from '../../../core/types/Book';

export interface IReservation {
  id: number;
  book_id: number;
  user_id: number;
  reservation_span: string;
}

export type IReservedBook = IBook & {
  reservation_user_id: number;
  reservation_span: string;
  reservation_id: number;
};
