import { IBook } from '../../../core/types/Book';

export interface IBorrow {
  id: number;
  book_id: number;
  user_id: number;
  checkout_date: string;
  return_date: string;
}

export type IBorrowedBook = IBook & {
  checkout_date: string;
  return_date: string;
  borrow_id: number;
};
