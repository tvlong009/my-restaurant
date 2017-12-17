import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {FoodOrder, Menu} from "../../model/menu.model";
import * as _ from 'lodash';
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {UserLogin} from "../../model/userLogin.model";
import {MenuProvider} from "../../providers/menu/menu";
import * as moment from 'moment-timezone';
import {FoodProvider} from "../../providers/food/food";
import {TableProvider} from "../../providers/api/table";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-menu-book',
    templateUrl: 'menu-book.html',
})
export class MenuBookPage {

    public Menu: Menu;
    public foodList: any[] = [];
    public foodOrder: any = {};
    public confirmOrder: any;
    public user: UserLogin;
    public tables: any[];

    constructor(public navCtrl: NavController,
                public menuProvider: MenuProvider,
                public alertCtrl: AlertController,
                public userLoginProvider: UserLoginProvider,
                public tableProvider: TableProvider,
                public foodProvider: FoodProvider) {
        this.user = this.userLoginProvider.getUser();
        this.tableProvider.getTables().then(res =>{
            this.tables = res;
        });
        this.Menu = {
            id: '',
            table: '',
            userId: '',
            timestamp: '',
            total: 0,
            show: true,
            icon: 'eye-off',
            foodList: []
        };

        // this.foodProvider.getFoodList().then((res) =>{
        //     this.Menu.foodList = res;
        //     _.each(this.Menu.foodList, (food)=>{
        //         food.num = 0;
        //     })
        // });

        this.Menu.userId = this.user.id;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuBookPage');
    }

    orderSend() {
        let MenuTemp: Menu = JSON.parse(JSON.stringify(this.Menu));
        // Get orders with number
        MenuTemp.foodList = _.remove(MenuTemp.foodList, (data: any) => {
          return data.num > 0;
        });
        // Set time
        MenuTemp.timestamp = moment().format();

        // Total calculate
        if (MenuTemp.foodList.length > 0) {
          MenuTemp.total = _.sumBy(MenuTemp.foodList, (data: any) => {
            return data.num * data.price;
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
            subTitle: `Bàn số : ` + Menu.table + ` - Người đặt : ` + Menu.userId,
            cssClass: 'customConfirm',
            buttons: [
                {
                    text: 'Huỷ bỏ '
                },
                {
                    text: 'Đặt ',
                    handler: () => {
                        if (Menu.userId && Menu.table) {
                            Menu.id = moment(new Date).format('DDMMYYYYHHmmss');

                            this.menuProvider.setListMenuApi(Menu).then(()=>{
                                this.navCtrl.setRoot(HomePage);
                            });
                        } else {
                            this.presentAlert();
                        }
                    }
                }
            ]
        });

        _.each(Menu.foodList, (order: any) => {
          this.confirmOrder.addInput({
            type: 'checkbox',
            label: order.name + ' : ' + order.num,
            checked: true,
            cursor: false,
            disabled: true
          });
        });

        this.confirmOrder.present();
    }
    searchFoodById(foodId){
       this.foodProvider.getFoodById(foodId).then(res =>{
           if(res){
               res.num = 0;
               this.foodOrder = res;
           }
       }).catch(err =>{
       });
    }
    createFood(){
        this.Menu.foodList.push(this.foodOrder);
        this.foodOrder = {};
    }
    deleteFood(foodOrder){
        _.remove(this.Menu.foodList, (food)=>{
            return food.id = foodOrder.id;
        })
    }
}
