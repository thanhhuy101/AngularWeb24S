import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CartService } from '../../service/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Food } from '../../model/food.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public cartService: CartService) {}

  /*---------Form Add--------*/
  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  openDialog() {
    Animation;
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  form = new FormGroup({
    inStock: new FormControl(0),
    id: new FormControl(),
    name: new FormControl(''),
    des: new FormControl(''),
    price: new FormControl(0),
    quantity: new FormControl(0),
    image: new FormControl(''),
  });

  submit() {
    let newForm: Food = {
      id: Math.floor(Math.random() * 1000),
      inStock: this.form.value.inStock || 0,
      name: this.form.value.name || '',
      des: this.form.value.des || '',
      price: this.form.value.price || 0,
      image: this.form.value.image || '',
      quantity: this.form.value.quantity || 0,
    };
    this.addProduct(newForm);
    this.closeDialog();
  }
  addProduct(item: Food) {
    this.cartService.addItem(item);
  }

  /*---------Form Edit--------*/
  @ViewChild('formup', { static: true })
  editdialog!: ElementRef<HTMLDialogElement>;
  editcdr = inject(ChangeDetectorRef);
  openEditDialog(item: Food) {
    selectedItem: item;
    this.formupdate.patchValue(item);
    Animation;
    this.editdialog.nativeElement.showModal();
    this.editcdr.detectChanges();
  }

  closeEditDialog() {
    this.editdialog.nativeElement.close();
    this.editcdr.detectChanges();
  }

  formupdate = new FormGroup({
    id: new FormControl(0),
    inStock: new FormControl(0),
    name: new FormControl(''),
    des: new FormControl(''),
    price: new FormControl(0),
    quantity: new FormControl(0),
    image: new FormControl(''),
  });

  updateItem() {
    let newForm: Food = {
      inStock: this.formupdate.value.inStock || 0,
      id: this.formupdate.value.id || 0,
      name: this.formupdate.value.name || '',
      des: this.formupdate.value.des || '',
      price: this.formupdate.value.price || 0,
      image: this.formupdate.value.image || '',
      quantity: this.formupdate.value.quantity || 0,
    };
    const index = this.cartService.foods.findIndex(
      (item) => item.id === newForm.id
    );
    if (index != -1) {
      this.cartService.foods[index] = newForm;
    }
    this.updateProduct(newForm);
    this.closeEditDialog();
  }

  updateProduct(item: Food) {
    this.cartService.update(item);
  }

  deleteProduct(item: Food) {
    this.cartService.delete(item);
    console.log(item);
  }
}
