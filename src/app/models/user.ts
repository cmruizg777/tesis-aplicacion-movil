export class User{
  username: string;
  password: string;
  token: string;
  constructor(username , password = null ){
    this.username = username;
    this.password = password;
  }
}
