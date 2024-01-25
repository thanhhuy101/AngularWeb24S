import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  constructor(public cartService: CartService, private router: Router) {}

  foods: any = [];

  ngOnInit() {
    this.foods = this.cartService.getProducts();
  }

  //create function getProducts by id with routerlink then navigate to product detail page
  getProductById(id: number) {
    this.cartService.getItemById(id);
  }
}
