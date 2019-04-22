import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { CartItem } from './cart-item';
import { PostCartItem } from './post-cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>('http://localhost:8080/product');
  }

  addToCart(cartItem: PostCartItem): Observable<PostCartItem>
  {
    return this.http.post<PostCartItem>('http://localhost:8080/cart', cartItem,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getCart(userId: number): Observable<CartItem[]>
  {
    return this.http.get<CartItem[]>('http://localhost:8080/cart?userId='+userId)
  }

  deleteCartItem(cartItemId: number){
    return this.http.delete('http://localhost:8080/cart?cartItemId='+cartItemId);
  }

}
