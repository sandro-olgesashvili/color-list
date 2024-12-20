import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${id}`);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  addUser(user: any) {
    return this.http.post(this.usersUrl, user);
  }
}
