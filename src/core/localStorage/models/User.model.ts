export class User {
  id?: number;
  name: string;
  email: string;
  token: string;
  is_admin?: boolean;
  lastname?: string;
  phone?: string;

  constructor(
    name: string,
    email: string,
    token: string,
    is_admin?: boolean,
    id?: number,
    lastname?: string,
    phone?: string
  ) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.is_admin = is_admin;
    this.id = id;
    this.lastname = lastname;
    this.phone = phone;
  }
}
