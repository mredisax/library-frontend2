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
  Divider,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon,
} from '@mui/icons-material';
import { Paperbase } from '../../../core';
import { useContext, useState } from 'react';
import { useBooksData } from './hooks';
import { IAuthor } from '../../../core/types/Author';
import { useAuthorsData } from '../../main/hooks/useAuthorsData.hook';
import { useReservedBooksData } from './hooks/useReservedBooksData';
import { useBorrowedBooksData } from './hooks/useBorrowedBooksData';
import { UserContext } from '../../../core/context/UserContext';

export const AdminBooksPage = () => {
  const { user } = useContext(UserContext);
  const [searchData, setSearchData] = useState('');
  const {
    booksData,
    isLoading: isBooksListLoading,
    refreshBooksData,
  } = useBooksData();
  const {
    reservedBooksData,
    isLoading: isReservedBooksLoading,
    removeReservation,
    refreshReservedBooksData,
  } = useReservedBooksData();
  const {
    borrowedBooksData,
    isLoading: isBorrowedBooksLoading,
    borrowBook,
    refreshBorrowedBooksData,
    removeBorrow,
  } = useBorrowedBooksData();
  const { authors } = useAuthorsData();

  return (
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
                  placeholder="Search books through id, title, author, category or ISBN"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                  onChange={(event) => {
                    setSearchData(event.target.value);
                  }}
                  value={searchData}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton
                    onClick={() => {
                      refreshBooksData();
                      refreshReservedBooksData();
                      refreshBorrowedBooksData();
                    }}
                  >
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              Borrowed books
            </Typography>
          </Grid>
          {isBorrowedBooksLoading ? (
            <CircularProgress />
          ) : (
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
                  {borrowedBooksData.map((book) => {
                    const author: IAuthor | undefined = authors.find(
                      (author) => author.id === book.author_id
                    );

                    return (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>
                          {author?.name} {author?.lastname}
                        </TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>
                          <Tooltip title="Return book">
                            <IconButton
                              onClick={() => removeBorrow(book.borrow_id)}
                            >
                              <RestoreIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              Reserved books
            </Typography>
          </Grid>
          {isReservedBooksLoading ? (
            <CircularProgress />
          ) : (
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
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservedBooksData.map((book) => {
                    const author: IAuthor | undefined = authors.find(
                      (author) => author.id === book.author_id
                    );
                    const isCurrentlyBorrowed = borrowedBooksData.some(
                      (borrowedBook) => borrowedBook.id === book.id
                    );

                    return (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>
                          {author?.name} {author?.lastname}
                        </TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>
                          <Tooltip title="Mark book as borrowed">
                            <Button
                              variant="contained"
                              disabled={isCurrentlyBorrowed}
                              onClick={() => {
                                borrowBook(
                                  book.id,
                                  book.reservation_user_id.toString()
                                ).then(() => refreshReservedBooksData());
                              }}
                            >
                              <Typography variant="button">BORROW</Typography>
                            </Button>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete reservation">
                            <IconButton
                              onClick={() =>
                                removeReservation(
                                  book.reservation_id.toString()
                                )
                              }
                              disabled={isCurrentlyBorrowed}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              All books
            </Typography>
          </Grid>
          {isBooksListLoading ? (
            <CircularProgress />
          ) : (
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {booksData.map((book) => {
                    const author: IAuthor | undefined = authors.find(
                      (author) => author.id === book.author_id
                    );

                    return (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>
                          {author?.name} {author?.lastname}
                        </TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Paper>
    </Paperbase>
  );
};
