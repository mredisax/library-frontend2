export class User {
  id?: number;
  name: string;
  email: string;
  token: string;
  is_admin?: boolean;

  constructor(
    name: string,
    email: string,
    token: string,
    is_admin?: boolean,
    id?: number
  ) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.is_admin = is_admin;
    this.id = id;
  }
}
