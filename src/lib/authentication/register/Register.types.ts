export class RegisterFormValidation implements IBaseValidity {
  isValid = (): boolean => {
    this.email.validate();
    this.name.validate();
    this.pass.validate();
    this.passRepeat.validate();
    this.lastname.validate();
    this.phone.validate();

    return (
      !this.email.isErr &&
      !this.name.isErr &&
      !this.pass.isErr &&
      !this.passRepeat.isErr &&
      !this.lastname.isErr &&
      !this.phone.isErr
    );
  };

  email: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      let _email = this.email.value;

      if (re.test(_email)) {
        // check email with regex
        this.email.isErr = false;
        this.email.errMsg = '';
      } else {
        this.email.isErr = true;
        this.email.errMsg = 'Not a valid mail';
      }
    },
  };

  name: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {
      let _name = this.name.value;
      if (_name.length < 3) {
        this.name.isErr = true;
        this.name.errMsg = 'Atleast 3 characters';
      } else {
        this.name.isErr = false;
        this.name.errMsg = '';
      }
    },
  };

  pass: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {
      let _pass = this.pass.value;
      let _passRepeat = this.passRepeat.value;

      if (_pass != _passRepeat) {
        this.passRepeat.isErr = true;
        this.passRepeat.errMsg = "Passwords don't match";
        return;
      } else {
        this.passRepeat.isErr = false;
        this.passRepeat.errMsg = '';
      }

      if (_pass.length < 3) {
        this.passRepeat.isErr = true;
        this.passRepeat.errMsg = 'Password too short';
      } else {
        this.passRepeat.isErr = false;
        this.passRepeat.errMsg = '';
      }
    },
  };

  passRepeat: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: this.pass.validate,
  };

  lastname: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {
      let _lastName = this.lastname.value;
      if (_lastName.length < 3) {
        this.lastname.isErr = true;
        this.lastname.errMsg = 'Atleast 3 characters';
      } else {
        this.lastname.isErr = false;
        this.lastname.errMsg = '';
      }
    },
  };

  phone: BaseValidationField<string> = {
    value: '',
    isErr: false,
    errMsg: '',
    validate: () => {
      let _phone = this.phone.value;
      if (_phone.length < 12) {
        this.phone.isErr = true;
        this.phone.errMsg = 'Wrong phone number';
      } else {
        this.phone.isErr = false;
        this.phone.errMsg = '';
      }
    },
  };
}

interface IBaseValidity {
  isValid: () => boolean;
}

export type BaseValidationField<T> = {
  isErr: boolean;
  errMsg: string;
  validate: Function;
  value: T;
};
