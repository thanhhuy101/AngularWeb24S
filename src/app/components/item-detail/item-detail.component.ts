import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss',
})
export class ItemDetailComponent implements OnInit {
  constructor(
    public cartService: CartService,
    private activatedRoutes: ActivatedRoute
  ) {}

  product: any;

  ngOnInit(): void {
    let id = this.activatedRoutes.snapshot.params['id'];
    this.product = this.cartService.getItemById(id);
  }
}
