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
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  DialogActions,
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
    addBook,
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
  const { authors, addAuthor } = useAuthorsData();
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState<IAuthor | null>(null);
  const [newBookCategory, setNewBookCategory] = useState('');
  const [newBookISBN, setNewBookISBN] = useState('');
  const [newBookYear, setNewBookYear] = useState('');
  const [isNewAuthorDialogOpen, setIsNewAuthorDialogOpen] = useState(false);
  const [newAuthorFirstName, setNewAuthorFirstName] = useState('');
  const [newAuthorLastName, setNewAuthorLastName] = useState('');

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
                  <Tooltip title="Add author">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setIsNewAuthorDialogOpen(true);
                      }}
                    >
                      Add author
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Add book">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setIsAddBookModalOpen(true);
                      }}
                    >
                      Add book
                    </Button>
                  </Tooltip>
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
                                    book.id!,
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
      <Dialog
        open={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
      >
        <DialogTitle>Add book</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1, minWidth: 400 }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={newBookTitle}
                onChange={(e) => setNewBookTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Year"
                variant="outlined"
                fullWidth
                value={newBookYear}
                onChange={(e) => setNewBookYear(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={newBookCategory}
                onChange={(e) => setNewBookCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="ISBN"
                variant="outlined"
                fullWidth
                value={newBookISBN}
                onChange={(e) => setNewBookISBN(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={authors}
                getOptionLabel={(option) => `${option.name} ${option.lastname}`}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Author"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={(e, value) => {
                  if (value) {
                    setNewBookAuthor(value);
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsNewAuthorDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              addBook({
                title: newBookTitle,
                year: parseInt(newBookYear),
                category: newBookCategory,
                isbn: newBookISBN,
                author_id: newBookAuthor!.id,
              }).then(() => {
                setIsAddBookModalOpen(false);
              });
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isNewAuthorDialogOpen}
        onClose={() => setIsNewAuthorDialogOpen(false)}
      >
        <DialogTitle>Add author</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1, minWidth: 400 }}>
            <Grid item xs={12}>
              <TextField
                label="First name"
                variant="outlined"
                fullWidth
                value={newAuthorFirstName}
                onChange={(e) => setNewAuthorFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last name"
                variant="outlined"
                fullWidth
                value={newAuthorLastName}
                onChange={(e) => setNewAuthorLastName(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsNewAuthorDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              addAuthor(newAuthorFirstName, newAuthorLastName).then(() => {
                setIsNewAuthorDialogOpen(false);
              });
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
