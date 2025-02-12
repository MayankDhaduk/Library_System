import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCategory } from '../admin-category';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UUID } from 'node:crypto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = "http://localhost:2025/api/admin"

  constructor(private http: HttpClient) { }

  addCat(category: AdminCategory): Observable<AdminCategory> {
    return this.http.post<AdminCategory>(`${this.adminUrl}/addcat`, category);
  }

  viewCat(): Observable<AdminCategory[]> {
    return this.http.get<AdminCategory[]>(`${this.adminUrl}/viewcat`);
  }

  deleteCat(catId: UUID): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/deletecat/${catId}`)
  }
}
