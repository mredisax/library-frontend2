import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paperbase } from '../../core';

interface Book {
  id: number;
  title: string;
  author_id: string;
}

export const BookPage = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:2137/books/id/${id}`)
      .then(response => response.json())
      .then(data => setBook(data));
  }, [id]);

  console.log(book);
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Paperbase>
      <h2>{book.title}</h2>

    </Paperbase>
  );
}