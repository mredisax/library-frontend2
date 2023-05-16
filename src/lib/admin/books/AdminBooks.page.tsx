import {
  AppBar,
  Toolbar,
  Paper,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  Snackbar,
  TableCell,
  Typography,
  TableRow,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  AlertColor,
} from '@mui/material';

import { Search as SearchIcon } from '@mui/icons-material';
import { Paperbase } from '../../../core';
import { LoadingButton } from '@mui/lab';
import { useBooksData } from './hooks/useBooksData.hook';
import { useAuthorsData } from './hooks/useAuthorsData.hook';
import { filterBook } from './hooks/filterBook';
import { snackbarClose } from './hooks/snackbarClose';
import { IAuthor } from '../../../core/types/Author';
import { IBookAuthor } from '../../../core/types/BookAuthor';
import { useState } from 'react';
import { BookForm } from './components/BookForm.component';

export const AdminBooksPage = () => {
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error');
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState('');
  const [editBookAuthor, setEditBookAuthor] = useState<IBookAuthor | null>(
    null
  );
  const { books } = useBooksData();
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
                  placeholder="Search by title"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  onChange={(e) => {
                    setSearchData(e.target.value);
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    setDialogAddOpen(true);
                  }}
                >
                  Add book
                </Button>
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((_book) => {
                  const _author: IAuthor | undefined = authors.find(
                    (author) => author.id === _book.author_id
                  );

                  if (!filterBook(_book, searchData)) return null;
                  return (
                    <TableRow key={_book.id}>
                      <TableCell>{_book.id}</TableCell>
                      <TableCell>{_book.title}</TableCell>
                      <TableCell>{`${_author?.name} ${_author?.lastname}`}</TableCell>
                      <TableCell>{_book.year}</TableCell>
                      <TableCell>{_book.category}</TableCell>
                      <TableCell>{_book.isbn}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            if (!_author) return;
                            setEditBookAuthor({
                              book: _book,
                              author: _author,
                            });
                            setDialogEditOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            //TODO
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Dialog open={dialogEditOpen} onClose={() => setDialogEditOpen(false)}>
          <DialogTitle>Book edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit fields or leave for no action.
            </DialogContentText>
            <BookForm bookAuthor={editBookAuthor} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogEditOpen(false)}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={() => {
                setSnackbarOpen(true);
                setSnackbarSeverity('error');
                setSnackbarMsg('Edit not implemented!');
              }}
              loading={loading}
              variant="contained"
            >
              Edit
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Dialog open={dialogAddOpen} onClose={() => setDialogAddOpen(false)}>
          <DialogTitle>New book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill the form below to add a new book
            </DialogContentText>
            <BookForm bookAuthor={null} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogAddOpen(false)}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={() => {
                setSnackbarOpen(true);
                setSnackbarSeverity('error');
                setSnackbarMsg('Add not implemented!');
              }}
              loading={loading}
              variant="contained"
            >
              Add
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            if (snackbarClose()) {
              setSnackbarOpen(false);
            }
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => {
              if (snackbarClose()) {
                setSnackbarOpen(false);
              }
            }}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Paper>
    </Paperbase>
  );
};
