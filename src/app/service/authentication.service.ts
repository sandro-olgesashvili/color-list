import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(auth: Auth): Observable<Auth[]> {
    return this.http.get<Auth[]>(
      `${this.authUrl}?username=${auth.username}&password=${auth.password}`
    );
  }

  createUser(newUser: Auth): Observable<Auth> {
    return this.http.post<Auth>(this.authUrl, newUser);
  }
}
