import {
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Paperbase } from '../../core';
import { useContext } from 'react';
import { UserContext } from '../../core/context/UserContext';
import { LoginComponent } from '../authentication';
import { useUserBorrowedBooks, useUserReservedBooks } from './hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAuthorsData } from '../main/hooks/useAuthorsData.hook';
import { IAuthor } from '../../core/types/Author';
import { format } from 'date-fns';

export const UserPage = () => {
  const { user } = useContext(UserContext);
  const { reservedBooks, isLoading } = useUserReservedBooks(
    user?.id?.toString() ?? ''
  );
  const { borrowedBooks, isLoading: isBorrowedBooksLoading } =
    useUserBorrowedBooks(user?.id?.toString() ?? '');
  const { authors } = useAuthorsData();

  return (
    <Paperbase>
      {user ? (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
          <Grid
            container
            spacing={2}
            sx={{ py: 2, px: 4, alignItems: 'center' }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h5">
                Welcome, {user.name} {user.lastname}!
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="subtitle1" align="right">
                {user.email}
              </Typography>
              <Typography variant="subtitle1" align="right">
                {user.phone ?? 'No phone number'}
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight={700}>
                Your reserved books
              </Typography>
            </Grid>
            {isLoading ? (
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
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Reservation expiration date
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reservedBooks.map((book) => {
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
                          <TableCell align="right">
                            {format(
                              new Date(book.reservation_span),
                              'dd MMM yyyy'
                            )}
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
                Your borrowed books
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
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Borrow checkout date
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Borrow return date
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {borrowedBooks.map((book) => {
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
                          <TableCell align="right">
                            {format(
                              new Date(book.checkout_date),
                              'dd MMM yyyy'
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {format(new Date(book.return_date), 'dd MMM yyyy')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Paper>
      ) : (
        <LoginComponent />
      )}
    </Paperbase>
  );
};
