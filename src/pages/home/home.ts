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
import * as moment from 'moment-timezone';
import * as jsPDF from 'jspdf'
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
    public canvas: any;
    public context: any;

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
            menu.show = false;
            menu.icon = 'eye';
        });
        return list;
    }

    finishOrder(menu: Menu, event) {
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
        if (menu.show) {
            menu.show = false;
            menu.icon = 'eye';
        } else {
            menu.show = true;
            menu.icon = 'eye-off';
        }
        this.menuProvider.updateMenuById(menu).then(res =>{});
    }
    editFoodOrder(menu:Menu, foodOrder: any){
            this.alert = this.alertCtrl.create({
                title: 'Chính sửa món ăn',
                inputs: [
                    {
                        name: 'id',
                        type: 'text',
                        disabled: true,
                        value: foodOrder.id
                    },
                    {
                        name: 'name',
                        placeholder: 'name',
                        type: 'text',
                        disabled: true,
                        value: foodOrder.name
                    },
                    {
                        name: 'price',
                        placeholder: 'price',
                        type: 'text',
                        disabled: true,
                        value: foodOrder.price + ' Đ'
                    },
                    {
                        name: 'num',
                        placeholder: 'price',
                        type: 'text',
                        disabled: true,
                        value: foodOrder.num
                    }
                ],
                buttons: [
                    {
                        text: 'Bỏ',
                        role: 'cancel',
                        handler: data => {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Sửa',
                        handler: data => {
                          foodOrder.num = data.num;
                          this.calculateTotal(menu);
                        }
                    }
                ]
            });
            this.alert.present();

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
            refresher.complete();},1000);

    }

    billPrint(menu, event){
        let height = 10;
        let doc = new jsPDF();
        let total = 0;
        doc.text('Gold Velvet - Jim Jil Bang', 1, height);
        height += 10;
        doc.text('Hoa Don Tinh Tien', 10, height);
        height += 10;
        doc.text("---------------------------------------------", 1, height);
        doc.setFontSize(8);
        _.each(menu.foodList, (food: any, )=>{
            height +=10;
            doc.text(food.id + '.' + food.name, 1, height);
            doc.text(food.price +"x" + food.num, 35, height);
            doc.text(": " + food.price * parseInt(food.num) + 'VND' ,52, height);
            total += food.price * parseInt(food.num);
        });
        height += 10;
        doc.text("-------------------------------------------------------------------------", 1, height);
        height += 10;
        doc.text("Thanh Tien",35, height );
        doc.text(": " + total + 'VND', 52, height );
        height += 10;
        doc.setFontSize(11);
        doc.text("-------------------------------------------------------------------------", 1, height);
        height += 10;
        doc.text("^~^ Xin Chao Va Hen Gap Lai ^~^", 5, height);
        doc.save(menu.id + '.pdf');
    }
}
