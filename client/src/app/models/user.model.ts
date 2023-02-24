export interface User {
  _id: string | null;
  name: string;
  email: string;
  password: string | null;
  token: string | null;
}
