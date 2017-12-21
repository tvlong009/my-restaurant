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
        console.log(event);
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        this.canvas.width = 400;
        this.canvas.height = 400;
        //this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.doCanvas(menu);
        this.downloadCanvas(event.srcElement,moment().format('HH:mm:ss DD-MM-YYYY')+'.');
    }

    doCanvas(menu) {
        let height = 100;
        this.context.beginPath();
        // this.context.rect(1, 1, 398, 100);
        this.context.fill();
       // draw some text, leaving space for the avatar image
        this.context.fillStyle = "black";
        this.context.font = "28px Arial";
        this.context.fillText("GOLD VELVET - Jjim Jil Bang", 80, 40, 250);
        this.context.font = "18px Arial";
        this.context.fillText("Hoá đơn tính tiền", 140, 70, 190);
        this.context.font = "12px Arial";
        this.context.fillText("Bàn Số: " + menu.table, 10, 90, 190);
        this.context.font = "12px Arial";
        this.context.fillText("Hoá Đơn Sô: " + moment().format('HHmmssDDMMYYY'), 100, 90, 190);
        this.context.font = "12px Arial";
        this.context.fillText("NVPV: " + menu.userId, 290, 90, 350);
        this.context.rect(1, 1, 398, 100);
        this.context.font = "24px Arial";
        let rowHeight = 120;
        let total = 0;
        this.context.font = "12px Arial";
        _.each(menu.foodList, (food: any, )=>{
            this.context.fillStyle = "red";
            this.context.fillText(food.id + ' - ' + food.name + ": ", 10, rowHeight, 190);
            this.context.fillStyle = "red";
            this.context.fillText(food.price +" x " + food.num, 200, rowHeight, 190);
            this.context.fillStyle = "green";
            this.context.fillText("= " + food.price * parseInt(food.num) + ' Đ' , 310, rowHeight, 190);
            total += food.price * parseInt(food.num);
            height += 20;
            rowHeight += 20;
        });
        height += 10;
        this.context.rect(1, 1, 398, height);
        height += 20;
        this.context.fillStyle = "black";
        this.context.font = "15px Arial";
        this.context.fillStyle = "red";
        this.context.fillText("Thành Tiền: ", 200, height , 190);
        this.context.fillStyle = "green";
        this.context.fillText(total + ' Đ' , 310, height, 190);
        height += 10;
        this.context.fillStyle = "white";
        this.context.rect(1, 1, 398, height);
        this.context.fillStyle = "black";
        this.context.font = "15px Arial";
        height += 30;
        this.context.fillText("^_^ Xin Cám Ơn Và Hẹn Gặp Lại ^_^", 70,  height, 300);
        height += 20;
        this.context.fillStyle = "white";
        this.context.rect(1, 1, 398, height);
        this.context.stroke();
        // draw avatar image on the left

    }

    downloadCanvas(link, filename) {
        link.parentElement.setAttribute('href',this.canvas.toDataURL());
        link.parentElement.download = filename;
    }
}
