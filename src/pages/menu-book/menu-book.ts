import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FoodOrders} from "../../model/menu.model";

@IonicPage()
@Component({
  selector: 'page-menu-book',
  templateUrl: 'menu-book.html',
})
export class MenuBookPage {
  private foodList: FoodOrders[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.foodList = [
      {
        name: 'chicken',
        orderNum: 0,
        price: 15000,
        foodNum: 1,
      },
      {
        name: 'susi',
        price: 20000,
        orderNum: 0,
        foodNum: 2,
      },
      {
        name: 'fish',
        price: 30000,
        orderNum: 0,
        foodNum: 3,
      },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuBookPage');
  }

}
