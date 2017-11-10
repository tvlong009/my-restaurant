import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {UserLogin} from "../../model/userLogin.model";
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {FoodOrder, Menu} from '../../model/menu.model'
import {MenuProvider} from "../../providers/menu/menu";
import {MenuBookPage} from "../menu-book/menu-book";
import * as _ from 'lodash';
import {SummaryPage} from "../summary/summary";
import {SummaryProvider} from "../../providers/summary/summary";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private user: UserLogin;
  public menuList: Menu[];
  public alert: any;
  public tables: any[];
  public foodList: any[];
  constructor(public navCtrl: NavController,
              private userLogin: UserLoginProvider,
              public alertCtrl: AlertController,
              private summaryProvider: SummaryProvider,
              private menuProvider: MenuProvider) {
    this.user = this.userLogin.getUser();
    this.menuList = this.menuProvider.getListMenu();
    this.menuList = this.addDataDump(this.menuList);

    this.tables = [
      {value: '001'},
      {value: '002'},
      {value: '003'},
      {value: '004'},
      {value: '005'},
      {value: '006'},
      {value: '007'},
      {value: '008'},
      {value: '009'},
      {value: '010'}
    ];

    this.foodList = [
      {
        name: 'chicken',
        foodId: '001',
        price: 15000
      },
      {
        name: 'beef',
        foodId: '002',
        price: 25000
      },
      {
        name: 'fish',
        foodId: '003',
        price: 45000
      }
    ];
  }

  loadMenuNew() {
    this.navCtrl.push(MenuBookPage);
  }

  loadSummaryPage() {
    this.navCtrl.push(SummaryPage);
  }

  addDataDump(list: Menu[]) {
    _.each(list, (menu: any) => {
      menu.showDetails = false;
      menu.icon = 'eye';
    });
    return list;
  }

  finishOrder(menu: Menu) {
    this.alert = this.alertCtrl.create({
      title: 'Finish',
      message: 'Do you want to finish menu ordered?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.summaryProvider.addMenuSummary(menu);
            this.menuList = this.menuProvider.removeListMenu(menu);
          }
        }
      ]
    });
    this.alert.present();
  }

  showMenuDetails(menu: any) {
    if (menu.showDetails) {
      menu.showDetails = false;
      menu.icon = 'eye';
    } else {
      menu.showDetails = true;
      menu.icon = 'eye-off';
    }
  }



  deleteFoodOrder(menu: Menu, foodOrder: FoodOrder) {
    this.alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete food ordered?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.menuList =  this.menuProvider.removeFoodOrder(menu, foodOrder);
          }
        }
      ]
    });
    this.alert.present();
  }
  calculateTotal(menu){
    menu.totalPrice = _.sumBy(menu.orders, (data: FoodOrder) => {
      return data.orderNum * data.price;
    });
  }

  changePrice(order: FoodOrder, foodList: any[]){
    let food = _.find(foodList, (food: any) => {
      return food.name === order.name;
    });
    if(food){
      order.price = food.price;
    }
  }

  customTrackBy(index: number): any {
    return index;
  }
}
