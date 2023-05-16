import { IAuthor } from '../../../core/types/Author';
import { BaseValidationField } from '../../authentication/register/Register.types';

export class BookFormValidation implements IBaseValidity {
  isValid = (): boolean => {
    return true;
  };

  title: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {},
  };

  isbn: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {},
  };

  author: BaseValidationField<IAuthor | null> = {
    value: null,
    isErr: false,
    errMsg: '',
    validate: () => {},
  };

  year: BaseValidationField<number> = {
    value: 0,
    isErr: false,
    errMsg: '',
    validate: () => {},
  };

  category: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {},
  };
}

interface IBaseValidity {
  isValid: () => boolean;
}
