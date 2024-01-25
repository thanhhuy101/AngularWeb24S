import { Injectable } from '@angular/core';
import { Food } from '../model/food.model';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private firestore: Firestore) {
    onSnapshot(collection(this.firestore, 'foods'), (snapshot) => {
      this.foods = [];
      snapshot.forEach((doc) => {
        this.foods.push(doc.data() as Food);
        console.log(doc.id, '=>', doc.data());
        console.log(this.foods);
      });
    });
  }

  total = 0;
  cart: Food[] = [];
  foods: Food[] = [
    // {
    //   id: 1,
    //   name: 'Hamburger',
    //   des: 'Ngon',
    //   quantity: 0,
    //   price: 10000,
    //   image:
    //     'https://anhquanbakery.com/uploads/product/full_v2ah7y94-1274-hamburger-thit-nuong.jpg',
    //   inStock: 5,
    // },
    // {
    //   id: 2,
    //   name: 'Gà rán',
    //   des: 'Ngon',
    //   quantity: 0,
    //   price: 20000,
    //   image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
    //   inStock: 10,
    // },
    // {
    //   id: 3,
    //   name: 'Cá viên chiên',
    //   des: 'Ngon',
    //   quantity: 0,
    //   price: 30000,
    //   image:
    //     'https://cdn.tgdd.vn/Files/2020/06/24/1265161/huong-dan-cach-lam-ca-vien-chien-gion-sach-ngon-tai-nha-202209091359141772.jpg',
    //   inStock: 9,
    // },
    // {
    //   id: 4,
    //   name: 'Bánh trán trộn',
    //   des: 'Ngon',
    //   quantity: 0,
    //   price: 40000,
    //   image:
    //     'https://static.vinwonders.com/production/banh-trang-tron-nha-trang-banner-1.jpg',
    //   inStock: 8,
    // },
    // {
    //   id: 5,
    //   name: 'Mì cay',
    //   des: 'Ngon',
    //   quantity: 0,
    //   price: 50000,
    //   image:
    //     'https://daynauan.info.vn/wp-content/uploads/2018/06/mi-cay-han-quoc.jpg',
    //   inStock: 15,
    // },
  ];

  // addItem(newItem: Food) {
  //   this.foods.push(newItem);
  // }

  async addItem(item: Food) {
    await setDoc(doc(this.firestore, 'foods', item.id.toString()), item);
  }

  //create function async update food
  async update(item: Food) {
    await setDoc(doc(this.firestore, 'foods', item.id.toString()), item);
  }

  async delete(item: Food) {
    await deleteDoc(doc(this.firestore, 'foods', item.id.toString()));
  }

  async addToCart(item: Food) {
    const docRef = doc(this.firestore, 'cart', item.id.toString());

    try {
      await setDoc(docRef, item);

      // Call the synchronous addToCart function after successful Firestore update
      this.addToLocalCart(item);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  addToLocalCart(food: Food) {
    if (food.inStock === 0) {
      alert('Out of stock');
      return;
    }

    let index = this.cart.findIndex((e) => e.id === food.id);

    if (index === -1) {
      food.quantity = 1;
      food.inStock--;
      this.cart.push(food);
    } else {
      this.cart[index].quantity++;
      food.inStock--;
    }

    alert('Add ' + food.name + ' to cart');
  }

  async deleteItemInCart(item: Food) {
    const docRef = doc(this.firestore, 'cart', item.id.toString());

    try {
      await deleteDoc(docRef);
      // alert(item.name + 'is deleted ' + ' from cart');
      // Call the synchronous delItemInCart function after successful Firestore deletion
      this.delItemInLocalCart(item.id);
    } catch (error) {
      console.error('Error deleting from cart:', error);
    }
  }

  delItemInLocalCart(id: number) {
    let index = this.cart.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  async getCartList() {
    onSnapshot(collection(this.firestore, 'cart'), (snapshot) => {
      this.cart = [];
      snapshot.forEach((doc) => {
        this.cart.push(doc.data() as Food);
        console.log(doc.id, '=>', doc.data());
        console.log(this.cart);
      });
    });
  }

  getProducts() {
    return this.foods;
  }

  //get item by id
  getItemById(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }

    const product = this.foods.find((product) => product.id === id);
    return product || {};
  }

  //delete item
  // delete(id: number) {
  //   this.foods = this.foods.filter((e) => e.id !== id);
  // }

  //delete item in cart
  // delItemInCart(id: number) {
  //   let index = this.cart.findIndex((e) => e.id === id);
  //   if (index !== -1) {
  //     this.cart.splice(index, 1);
  //   }
  // }

  //create function add to cart if quantity == 0 show alert "out of stock quantity"
  // addToCart(food: Food) {
  //   if (food.inStock === 0) {
  //     alert('Out of stock');
  //     return;
  //   }
  //   let index = this.cart.findIndex((e) => e.id === food.id);
  //   if (index === -1) {
  //     food.quantity = 1;
  //     food.inStock--;
  //     this.cart.push(food);
  //   } else {
  //     this.cart[index].quantity++;
  //     food.inStock--;
  //   }
  //   alert('Add' + ' ' + food.name + ' to cart');
  // }

  //create function descrease quantity if instock <= 0 then delete food in cart
  decrease(food: Food) {
    let index = this.cart.findIndex((e) => e.id === food.id);
    if (index !== -1) {
      if (this.cart[index].quantity === 1) {
        this.cart.splice(index, 1);
        return;
      } else {
        this.cart[index].quantity--;
        this.cart[index].inStock++;
        return;
      }
    }
  }

  //create function increase quantity if quantity == instock then quantity not increase
  increase(food: Food) {
    let index = this.cart.findIndex((e) => e.id === food.id);
    if (index !== -1) {
      this.cart[index].quantity++;
      this.cart[index].inStock--;
    }
  }

  //creat function payment to calculate all food quantity and price
  payment() {
    this.total = 0;
    this.cart.forEach((e) => {
      this.total += e.quantity * e.price;
    });
    return this.total;
  }
}
