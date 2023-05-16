import { SyntheticEvent } from 'react';

export const snackbarClose = (
  event?: SyntheticEvent | Event,
  reason?: string
): boolean => {
  if (reason === 'clickaway') {
    return false;
  }

  return true;
};
