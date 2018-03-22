import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

  public constructor(
    private http: HttpClient,
  ) { }

  public async getAll(): Promise<User[]> {
    return this.http.get<User[]>('users/')
      .toPromise()
      .then((users: User[]) => users)
      .catch();
  }

  public async getById(id: number): Promise<User> {
    return this.http.get<User>('users/' + id + '/')
      .toPromise()
      .then((user: User) => user)
      .catch();
  }

  public async store(user: User): Promise<void> {
    return this.http.post('users/', user)
      .toPromise()
      .then((users: any) => {
        return users;
      })
      .catch();
  }

  public async modify(user: User): Promise<void> {
    return this.http.put('users/', user)
      .toPromise()
      .then((users: any) => {
        return users;
      })
      .catch();
  }

  public async destoy(): Promise<void> { }

  public async login(username: string, password: string): Promise<any> {
    return this.http.post('authenticate/', { username: username, password: password })
      .toPromise()
      .then((users: any) => {
        return users;
      })
      .catch();
  }


  public async forgot(): Promise<void> { }

  public async logout(): Promise<void> { }

  public isLoggedIn(): boolean {
    return true;
  }
}
