export interface IUser {
  id: string;
  age: number;
  hobbies: string[] | [];
  username: string;
}

class UserDatabase {
  users: IUser[];

  constructor() {
    this.users = [];
  }

  get getUsers(): IUser[] {
    return this.users;
  }

  set setUsers(usersArray: IUser[]) {
    this.users = usersArray;
  }

  updateUser(index: number, user: IUser) {
    this.users[index] = user;
  }

  deleteUser(userUuid: string): void {
    this.setUsers = this.getUsers.filter(({ id }: IUser) => id !== userUuid);
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }

  getUserByIndex(index: number): IUser {
    return this.users[index];
  }

  findUserIndex(userUuid: string): number {
    return this.users.findIndex(({ id }: IUser) => id === userUuid);
  }

  findUser(userUuid: string): IUser | undefined {
    return this.users.find(({ id }: IUser) => id === userUuid);
  }
}

const userDataBase = new UserDatabase();

export default userDataBase;
