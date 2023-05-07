import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Book {
    id: number;
    title: string;
    author_id: number;
    year: number;
    category: string;
    isbn: string;
  }

export const BooksList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    
    useEffect(() => {
        fetch("http://localhost:2137/books")
        .then((res) => res.json())
        .then((data) => setBooks(data));
    }, []);


    console.log(books);
    return (
        <div>
        <h2>Books</h2>
        <Grid container spacing={2}>
            {books.map((book) => (
                <Grid item xs={3}>
                    <Link to={`/book/${book.id}`}>{book.title}</Link>
                </Grid>
            ))}
        </Grid>
        </div>
    );
}
