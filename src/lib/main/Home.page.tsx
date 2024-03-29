import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  IconButton,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { Paperbase } from '../../core';
import { useBooksData } from './hooks/useBooksData.hook';
import { useAuthorsData } from './hooks/useAuthorsData.hook';
import { IAuthor } from '../../core/types/Author';
import { useContext, useState } from 'react';
import { filterBook } from './services/filterBook';
import { IBook } from '../../core/types/Book';
import { useCanBookBeReserved } from './hooks/useCanBookBeReserved.hook';
import { modalStyle } from './constants';
import axios from 'axios';
import { serverAddress } from '../../core/config/server';
import { format } from 'date-fns';
import { UserContext } from '../../core/context/UserContext';

export const HomePage = () => {
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [reservedBook, setReservedBook] = useState<IBook | null>(null);
  const [reservedAuthor, setReservedAuthor] = useState<IAuthor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchData, setSearchData] = useState('');
  const { books } = useBooksData();
  const { authors } = useAuthorsData();
  const { canBookBeReserved, isFetching, reservationDueDate } =
    useCanBookBeReserved(reservedBook, selectedDate);
  const { user } = useContext(UserContext);

  const reserveBook = async () => {
    if (reservedBook && user) {
      const res = await axios.post(
        `${serverAddress}/reservation/`,
        {
          book_id: reservedBook.id,
          user_id: user.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        setSnackbarMessage('Book reserved successfully!');
        setIsSnackbarOpen(true);
        setIsBorrowModalOpen(false);
        setReservedBook(null);
      } else {
        setSnackbarMessage('Something went wrong. Try again later.');
        setIsSnackbarOpen(true);
        setIsBorrowModalOpen(false);
        setReservedBook(null);
      }
    }
  };

  return (
    <>
      <Paperbase>
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <SearchIcon color="inherit" sx={{ display: 'block' }} />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search through books by title, author or ISBN"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: 'default' },
                    }}
                    variant="standard"
                    onChange={(e) => {
                      setSearchData(e.target.value);
                    }}
                    value={searchData}
                  />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={4} sx={{ p: 6 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Id
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Title
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Author
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Year
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Category
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        ISBN
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book) => {
                    const author: IAuthor | undefined = authors.find(
                      (author) => author.id === book.author_id
                    );

                    if (!filterBook(book, author, searchData)) return null;
                    return (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{`${author?.name} ${author?.lastname}`}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setReservedBook(book);
                              setReservedAuthor(author ?? null);
                              setIsBorrowModalOpen(true);
                            }}
                          >
                            <Typography variant="button">RESERVE</Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Paperbase>
      <Modal
        open={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <Grid container spacing={1} sx={{ width: 600 }}>
            <Grid item>
              <Typography variant="h5" fontWeight={600}>
                {reservedBook?.title}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight={300}>
                - {reservedAuthor?.name} {reservedAuthor?.lastname} (
                {reservedBook?.year})
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => setIsBorrowModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="subtitle1" fontWeight={300}>
                {reservedBook?.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="subtitle1" fontWeight={300}>
                ISBN: {reservedBook?.isbn}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            {/* <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  defaultValue={selectedDate}
                  onChange={(date) => setSelectedDate(date as Date)}
                />
              </LocalizationProvider>
            </Grid> */}
            <Grid item>
              {isFetching ? (
                <div>
                  <Typography>Loading...</Typography>
                </div>
              ) : canBookBeReserved ? (
                <Tooltip
                  title={!user ? 'You must login first.' : ''}
                  disableInteractive={user !== undefined}
                >
                  <span>
                    <Button
                      variant="contained"
                      onClick={() => reserveBook()}
                      disabled={user === null}
                    >
                      <Typography variant="button">RESERVE</Typography>
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    This book is already reserved due to{' '}
                    {format(
                      reservationDueDate ?? new Date(Date.now()),
                      'dd/MM/yyyy'
                    )}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};
