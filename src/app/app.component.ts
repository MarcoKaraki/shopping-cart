import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { CartItem } from './cart-item';
import { DataService } from './data-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PostCartItem } from './post-cart-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  addCartItemForm = new FormGroup({
    userId: new FormControl(''),
  });

  viewCartForm = new FormGroup({
    userId: new FormControl(''),
  });

  deleteCartItemForm = new FormGroup({
    cartItemId: new FormControl(''),
  });

  title = 'shopping-cart';
  displayedColumns: string[] = ['name', 'price', 'quantity', 'submit'];
  displayedCartColumns: string[] = ['productName', 'price', 'quantity', 'remove'];
  products: Product[];

  constructor(private dataService: DataService)
  {
    
  }


  cartItems: CartItem[];

  ngOnInit() {
    this.dataService.getAllProducts().subscribe(
      (data: Product[]) => this.products = data
    );
  }

  addCartItemSubmit(productId: number){
    let userId = this.addCartItemForm.get('userId').value;
    let quantity = +(document.getElementById('quantity'+productId) as HTMLInputElement).value;
    let newCartItem: PostCartItem = 
    {
      userId: userId,
      productId: productId,
      quantity: quantity
    }
    this.dataService.addToCart(newCartItem).subscribe();
  }

  viewCartSubmit()
  {
    let userId = this.viewCartForm.get('userId').value;
    this.dataService.getCart(userId).subscribe(
      (data: CartItem[]) => this.cartItems = data
    )
  }

  removeCartItem(cartItemId: number)
  {
    this.dataService.deleteCartItem(cartItemId).subscribe();
    this.cartItems = this.cartItems.filter(function( obj ) {
      return obj.id !== cartItemId;
  });
  }
}
