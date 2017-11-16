import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {FoodOrder, Menu} from "../../model/menu.model";
import * as _ from 'lodash';
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {UserLogin} from "../../model/userLogin.model";
import {MenuProvider} from "../../providers/menu/menu";
import * as moment from 'moment-timezone';
import {FoodProvider} from "../../providers/food/food";

@IonicPage()
@Component({
  selector: 'page-menu-book',
  templateUrl: 'menu-book.html',
})
export class MenuBookPage {

  public Menu: Menu;
  public confirmOrder: any;
  public User: UserLogin;
  public tables: any[];

  constructor(public navCtrl: NavController,
              public menuProvider: MenuProvider,
              public alertCtrl: AlertController,
              public userLoginProvider: UserLoginProvider,
              public foodProvider: FoodProvider) {
    this.User = this.userLoginProvider.getUser();
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
    this.Menu = {
      id: '',
      tableNum: '',
      orderPerson: '',
      timestamp: '',
      totalPrice: 0,
      orders: []
    };


    this.Menu.orderPerson = this.User.username;
    this.Menu.orders = this.foodProvider.getFoodList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuBookPage');
  }

  orderSend() {
    let MenuTemp: Menu = JSON.parse(JSON.stringify(this.Menu));
    // Get orders with number
    MenuTemp.orders = _.remove(MenuTemp.orders, (data: FoodOrder) => {
      return data.orderNum > 0;
    });
    // Set time
    MenuTemp.timestamp = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');

    // Total calculate
    if (MenuTemp.orders.length > 0) {
      MenuTemp.totalPrice = _.sumBy(MenuTemp.orders, (data: FoodOrder) => {
        return data.orderNum * data.price;
      });
      this.presentConfirm(MenuTemp);
    } else {
      this.presentAlert();
    }
  }

  customTrackBy(index: number): any {
    return index;
  }

  presentAlert() {
    this.confirmOrder = this.alertCtrl.create({
      title: 'Lỗi',
      subTitle: 'Thiếu thông tin ',
      buttons: ['Đóng ']
    });
    this.confirmOrder.present();
  }

  presentConfirm(Menu: Menu) {
    this.confirmOrder = this.alertCtrl.create({
      title: 'Xác nhận lại thực đơn ',
      subTitle: `Bàn số : ` + Menu.tableNum + ` - Người đặt : ` + Menu.orderPerson,
      cssClass: 'customConfirm',
      buttons: [
        {
          text: 'Huỷ bỏ '
        },
        {
          text: 'Đặt ',
          handler: () => {
            if(Menu.orderPerson && Menu.tableNum){
              Menu.id = moment(new Date).format('DDMMYYYYHHmmss');
              this.menuProvider.setListMenu(Menu);
              this.navCtrl.pop();
            }else {
              this.presentAlert();
            }
          }
        }
      ]
    });

    _.each(Menu.orders, (order: FoodOrder) => {
      this.confirmOrder.addInput({
        type: 'checkbox',
        label: order.name + ' : ' + order.orderNum,
        checked: true,
        cursor: false,
        disabled: true
      });
    });

    this.confirmOrder.present();
  }


}
