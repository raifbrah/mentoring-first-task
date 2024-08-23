import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: IUser[] = [];

  addEditUsers(users: IUser[]) {
    if (users.length > 1) {
      this.users = users;
    } else {
      if (users[0].id) {
        this.users = this.users.map((mapUser: IUser) => {
          return mapUser.id === users[0].id
            ? { ...mapUser, ...users[0] }
            : mapUser;
        });
      } else {
        this.users = [
          ...this.users,
          {
            ...users[0],
            id: Date.now(),
          },
        ];
      }
    }
  }
}
