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
    alert(
      'Payment successful! \nYour bill is total ' +
        this.cartService.payment() +
        ' VNĐ'
    );
    this.cartService.cart = [];
  }
}
