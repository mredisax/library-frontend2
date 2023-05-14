import { RegisterFormValidation } from '../lib/authentication/register/Register.types';

export const handleMailValidation = (
  value: string,
  validation: RegisterFormValidation
) => {
  validation.email.value = value;
  validation.email.validate();
};

export const handlePassValidation = (
  value: string,
  validation: RegisterFormValidation
) => {
  validation.pass.value = value;
  validation.pass.validate();
};

export const handlePassRptValidation = (
  value: string,
  validation: RegisterFormValidation
) => {
  validation.passRepeat.value = value;
  validation.passRepeat.validate();
};

export const handleNameValidation = (
  value: string,
  validation: RegisterFormValidation
) => {
  validation.name.value = value;
  validation.name.validate();
};

export const handleLastnameValidation = (
  value: string,
  validation: RegisterFormValidation
) => {
  validation.lastname.value = value;
  validation.lastname.validate();
};

export const handlePhoneValidation = (
  value: string,
  validation: RegisterFormValidation
) => {
  validation.phone.value = value;
  validation.phone.validate();
};
