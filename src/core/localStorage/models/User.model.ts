export class User {
  name: string;
  email: string;
  token: string;
  is_admin?: boolean;

  constructor(name: string, email: string, token: string, is_admin?: boolean) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.is_admin = is_admin;
  }
}
