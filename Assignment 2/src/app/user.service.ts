import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];

  registerUser(user: any) {
    this.users.push(user);
  }

  loginUser(username: string, password: string) {
    return this.users.find(
      (user) => user.username === username && user.password === password
    );
  }
}
