import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {UserLogin} from "../../model/userLogin.model";
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {FoodOrder, Menu} from '../../model/menu.model'
import {MenuProvider} from "../../providers/menu/menu";
import {MenuBookPage} from "../menu-book/menu-book";
import * as _ from 'lodash';
import {SummaryPage} from "../summary/summary";
import {SummaryProvider} from "../../providers/summary/summary";
import {FoodProvider} from "../../providers/food/food";
import {FoodPage} from "../food/food";
import {TableProvider} from "../../providers/api/table";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    private user: UserLogin;
    public menuList: Menu[] = [];
    public alert: any;
    public tables: any[];
    public foodList: any[];

    constructor(public navCtrl: NavController,
                private userLogin: UserLoginProvider,
                private tableProvider: TableProvider,
                public alertCtrl: AlertController,
                private summaryProvider: SummaryProvider,
                private menuProvider: MenuProvider,
                private foodProvider: FoodProvider) {
        this.user = this.userLogin.getUser();

    }
    ngOnInit (){
        // setInterval(() => {
            this.menuProvider.getListMenuApi().then(res =>{
                this.menuList = res;
                console.log(this.menuList);
            });
        // }, 2000);
        this.tableProvider.getTables().then(res => {
            this.tables = res;
        });

        this.foodProvider.getFoodList().then(res => {
            this.foodList = res;
        });
    }

    loadMenuNew() {
        this.navCtrl.push(MenuBookPage);
    }

    loadSummaryPage() {
        this.navCtrl.push(SummaryPage);
    }

    loadFoodPage() {
        this.navCtrl.push(FoodPage);
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
            title: 'Đã trả tiền ',
            message: 'Đã trả đủ tiền chưa ?',
            buttons: [
                {
                    text: 'Chưa ',
                    role: 'cancel',
                },
                {
                    text: 'Xong ',
                    handler: () => {
                        this.summaryProvider.addMenuSummary(menu);
                        this.menuProvider.removeMenu(menu).then(()=>{
                            this.navCtrl.setRoot(HomePage);
                        });
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
        this.menuProvider.updateMenuById(menu).then(res =>{});
    }


    deleteFoodOrder(menu: Menu, foodOrder: FoodOrder) {
        this.alert = this.alertCtrl.create({
            title: 'Xoá ',
            message: 'Xoá thức ăn trên menu?',
            buttons: [
                {
                    text: 'Huỷ',
                    role: 'cancel',
                },
                {
                    text: 'Xoá',
                    handler: () => {
                        this.menuProvider.removeFoodOrder(menu).then(res=>{
                            let Menu = res;
                            _.remove(Menu.foodList, (food)=>{
                                return food.id === foodOrder.id;
                            });
                            this.menuProvider.updateMenuById(Menu).then(() =>{
                                this.navCtrl.setRoot(HomePage);
                            })

                        });
                    }
                }
            ]
        });
        this.alert.present();
    }

    calculateTotal(menu){
        console.log(menu);
      menu.total = _.sumBy(menu.foodList, (data: any) => {
        return parseInt(data.num) * parseInt(data.price);
      });
    }

    changeFood(order: FoodOrder, foodList: any[], menu: any) {
        console.log(order, foodList, menu);
        let food = _.find(foodList, (food: any) => {
            return food.id === order.id;
        });
        if (food) {
            order.price = parseInt(food.price);
            this.calculateTotal(menu);
        }

    }

    customTrackBy(index: number): any {
        return index;
    }

    doRefresh(refresher){
        setTimeout(() => {
            this.menuProvider.getListMenuApi().then(res =>{
                this.menuList = res;
            });
            refresher.complete();
        }, 2000);

    }
}
