import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ItemComponent } from './components/item/item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    component: ItemComponent,
  },
  {
    path: 'product/:id',
    component: ItemDetailComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];
