import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCategory } from '../admin-category';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UUID } from 'node:crypto';
import { AdminProduct } from '../admin-product';
import { json } from 'node:stream/consumers';
import { Cart } from '../admin-cart';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = "http://localhost:2025/api/admin"

  constructor(private http: HttpClient) { }

  addCat(category: AdminCategory): Observable<AdminCategory> {
    return this.http.post<AdminCategory>(`${this.adminUrl}/addcat`, category);
  }

  viewCat(): Observable<any> {
    return new Observable(observer => {
      this.http.get(`${this.adminUrl}/viewcat`, { responseType: 'text' })
        .subscribe({
          next: (responseText) => {
            try {
              const parseData = JSON.parse(responseText);
              observer.next(parseData); // ✅ Send parsed JSON to subscribers
              observer.complete();
            } catch (error) {
              console.error("Invalid JSON received:", responseText);
              observer.error("Invalid JSON format");
            }
          },
          error: (error) => {
            console.error("Error fetching categories:", error);
            observer.error(error);
          }
        })
    })
  }

  deleteCat(id: UUID): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/deletecat/${id}`)
  }

  getCategoryById(id: UUID): Observable<AdminCategory> {
    return this.http.get<AdminCategory>(`${this.adminUrl}/getCategoryById/${id}`);
  }

  updateCategory(id: UUID, category: AdminCategory,): Observable<AdminCategory> {
    return this.http.put<AdminCategory>(`${this.adminUrl}/updateCategory/${id}`, category);
  }

  addProduct(formData: FormData): Observable<AdminProduct> {
    return this.http.post<AdminProduct>(`${this.adminUrl}/addproduct`, formData);
  }

  viewProduct(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(`${this.adminUrl}/viewproduct`);
  }

  deleteProduct(id: UUID): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/deleteproduct/${id}`);
  }

  getProductById(id: UUID): Observable<AdminProduct> {
    return this.http.get<AdminProduct>(`${this.adminUrl}/getProductById/${id}`)
  }

  updateProduct(id: UUID, formData: FormData): Observable<AdminProduct> {
    return this.http.put<AdminProduct>(`${this.adminUrl}/updateproduct/${id}`, formData)
  }
}
