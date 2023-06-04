import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paperbase } from '../../core';
import axios from 'axios';
import { Button, Paper } from '@mui/material';
import { serverAddress } from '../../../core/config/server';

interface Book {
    id: number;
    title: string;
    author_id: string;
    year: number;
    category: string;
    isbn: string;
    isReserved: boolean;
    author: {
        id: number;
        name: string;
        lastname: string;
    }
}



export const BookPage = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`${serverAddress}/books/id/${id}`)
        .then((res) => setBook(res.data))
        .catch(err=>console.log(err))
  }, [id, isReserved]);




    const handleReservation = () => {
    console.log(book?.id)
    axios.post(`${serverAddress}/reservation/`,{
        book_id: book?.id,
        user_id: 3,
    })
        .then((res) => setIsReserved(true))
        .catch(err=>console.log(err))
    }


  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Paperbase>
        <Paper>
            <h2>{book.title}</h2>
            <p>Author: {book.author.name} {book.author.lastname}</p>
            <p>Year: {book.year}</p>
            <p>Category: {book.category}</p>
            <p>ISBN: {book.isbn}</p>
            {book.isReserved ? <Button variant="contained" disabled>Reserved</Button> : <Button onClick={()=>{handleReservation()}} variant="contained">Reserve</Button>}
        </Paper>


    </Paperbase>
  );
}
