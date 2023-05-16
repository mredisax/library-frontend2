import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useAuthorsData } from '../hooks/useAuthorsData.hook';
import { IBookAuthor } from '../../../../core/types/BookAuthor';
import { useState } from 'react';
import { BookFormValidation } from '../AdminBooks.types';

export interface IBookFormProps {
  bookAuthor: IBookAuthor | null;
}

export const BookForm = (props: IBookFormProps) => {
  const { authors } = useAuthorsData();
  const [validation, setValidation] = useState<BookFormValidation>(
    new BookFormValidation()
  );

  return (
    <Stack spacing={1}>
      <TextField
        label="Title"
        variant="outlined"
        value={validation.title.value}
        onChange={() => {
          //edit title
          setValidation({ ...validation });
        }}
        error={validation.title.isErr}
        helperText={validation.title.errMsg}
      />
      <TextField
        label="ISBN"
        variant="outlined"
        value={validation.isbn.value}
        onChange={() => {
          //edit title
          setValidation({ ...validation });
        }}
        error={validation.isbn.isErr}
        helperText={validation.isbn.errMsg}
      />
      <FormControl fullWidth>
        <InputLabel id="author-label">Author</InputLabel>
        <Select
          labelId="author-label"
          label="Author"
          onChange={() => {
            //edit title
            setValidation({ ...validation });
          }}
          value={validation.author.value?.id}
          error={validation.author.isErr}
        >
          {authors.map((author) => {
            return (
              <MenuItem value={author.id} key={author.id}>
                {author.name} {author.lastname}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{validation.author.errMsg}</FormHelperText>
      </FormControl>
      <TextField label="Year" type="number" variant="outlined" />
      <TextField
        label="Category"
        variant="outlined"
        value={validation.category.value}
        onChange={() => {
          //edit title
          setValidation({ ...validation });
        }}
        error={validation.category.isErr}
        helperText={validation.category.errMsg}
      />
    </Stack>
  );
};
