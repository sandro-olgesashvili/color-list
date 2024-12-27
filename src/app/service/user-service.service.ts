import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  userApiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient, private share: ShareService) {}

  getUsers(): Observable<User[]> {
    this.share.setLaoder(true);
    return this.http.get<User[]>(this.userApiUrl);
  }
  deleteUser(id: number): Observable<any> {
    this.share.setLaoder(true);
    return this.http.delete(`${this.userApiUrl}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    this.share.setLaoder(true);
    return this.http.put<User>(`${this.userApiUrl}/${user.id}`, user);
  }
}
