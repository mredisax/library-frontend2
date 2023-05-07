import {
    AppBar,
    Toolbar,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    Tooltip,
    IconButton,
  } from '@mui/material';
  import {
    Search as SearchIcon,
    Refresh as RefreshIcon,
  } from '@mui/icons-material';
  import { Paperbase } from '../../core';
  import { BooksList }  from './components/BooksList';

export const BooksPage = () => {
    return (
        <>
        <Paperbase>
            <Paper sx={{ maxWidth: 936, padding:"0 2em", margin: 'auto', overflow: 'hidden' }}>
                <BooksList/>
            </Paper>
        </Paperbase>

        </>
    );
};
