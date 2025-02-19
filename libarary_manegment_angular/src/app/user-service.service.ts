import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { UUID } from 'crypto';
import { AdminProduct } from '../admin-product';
import { Cart } from '../admin-cart';

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

  viewproduct(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(`${this.apiUrl}/viewproduct`);
  }

  getUserId(uname: string): Observable<{ userId: UUID }> {
    return this.http.get<{ userId: UUID }>(`${this.apiUrl}/userid?uname=${uname}`);
  }

  addToCart(userId: UUID, productId: UUID): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/addcart?uid=${userId}&pid=${productId}`, {});
  }

  // addToCart(userId: UUID, productId: UUID): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/addcart`, { userId, productId })
  // }

  // getCartItem(userId : UUID):Observable<any>
  // {
  //   return this.http.get<any>(`${this.apiUrl}/viewcart/${userId}`)
  // }

  viewCart(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  viewCartAllProduct(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/viewallcart`);
  }

  logoutuser(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/logout`);
  }

  getProductByCategory(catname: string): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(`${this.apiUrl}/getcategoryname/${catname}`);
  }

  getProductById(productId: UUID): Observable<AdminProduct> {
    console.log("Id is : ", productId);
    return this.http.get<AdminProduct>(`${this.apiUrl}/${productId}`)
  }

  viewAllCart(userId: UUID): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/${userId}`);
  }

}



