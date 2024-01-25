import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  handleClick() {
    // Iterate through the items in the cart and delete them from Firestore
    for (const item of this.cartService.cart) {
      this.cartService.deleteItemInCart(item);
    }

    alert(
      'Payment successful! \nYour bill is total ' +
        this.cartService.payment() +
        ' VNĐ'
    );

    // Reset the local cart after deleting items from Firestore
    this.cartService.cart = [];
  }
}
