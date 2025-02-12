import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = "http://localhost:2025/api/user"

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user)
  }

  userLogin(uname: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { uname, pass })
  }

  userview(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/viewuser`);
  }

  userdelete(id: UUID): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }



}
