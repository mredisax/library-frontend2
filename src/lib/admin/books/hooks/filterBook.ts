import { IAuthor } from '../../../../core/types/Author';
import { IBook } from '../../../../core/types/Book';

export const filterBook = (book: IBook, filter: string): boolean => {
  if (filter === '') return true;

  const filterLower = filter.toLowerCase();

  if (book.title.toLowerCase().includes(filterLower)) return true;
  if (book.isbn.toLowerCase().includes(filterLower)) return true;

  return false;
};
