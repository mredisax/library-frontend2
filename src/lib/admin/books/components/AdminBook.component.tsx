import { Book } from '../models/book.class';

export const AdminBook = (book: Book) => {
  return (
    <>
      <h2>{book.title}</h2>
      <p>Year: {book.year}</p>
      <p>Category: {book.category}</p>
      <p>ISBN: {book.isbn}</p>
    </>
  );
};
