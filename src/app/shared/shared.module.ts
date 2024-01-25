import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CartComponent } from '../components/cart/cart.component';
import { ItemComponent } from '../components/item/item.component';
import { ItemDetailComponent } from '../components/item-detail/item-detail.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { RouterModule, RouterOutlet } from '@angular/router';
import {TuiInputModule} from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    CartComponent,
    ItemComponent,
    ItemDetailComponent,
    DashboardComponent,
    ReactiveFormsModule,
    TuiTableModule,
    TuiInputModule,
  ],
  exports: [
    NavbarComponent,
    RouterOutlet,
    RouterModule,
    CartComponent,
    ItemComponent,
    ItemDetailComponent,
    DashboardComponent,
    ReactiveFormsModule,
    ReactiveFormsModule,
    TuiTableModule,
    TuiInputModule,
  ],
})
export class SharedModule {}
