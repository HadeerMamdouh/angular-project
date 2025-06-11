export class User {
  id: string;
  username: string;
  email: string;
  role: string;

  constructor({ id = '', username = '', email = '', role = '' }: Partial<User>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }

  static fromObject(data: any): User {
    return new User({
      id: data['id'],
      username: data['userName'],
      email: data['email'],
      role: data['role']
    });
  }
}