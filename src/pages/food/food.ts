import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FoodOrder} from "../../model/menu.model";
import {FoodProvider} from "../../providers/food/food";
import * as _ from 'lodash';


@IonicPage()
@Component({
    selector: 'page-food',
    templateUrl: 'food.html',
})
export class FoodPage {
    foodOrders: FoodOrder[] = [];
    foodModel: FoodOrder;
    alert: any;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertCtrl: AlertController,
                private foodProvider: FoodProvider) {
       this.foodProvider.getFoodList().then(res =>{
            this.foodOrders = res;
        });
        this.foodModel = {
            name: '',
            price: null,
            id: null
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FoodPage');
    }

    createFood() {
        this.foodProvider.setFood(this.foodModel).then(res =>{
            this.foodOrders.push(res);
        });
    }
    deleteFood(food: FoodOrder){
        this.alert = this.alertCtrl.create({
            title: 'Xoá món ăn',
            message: 'Có chắc muốn xoá?',
            buttons: [
                {
                    text: 'Suy Nghĩ Thêm ',
                    role: 'cancel',
                },
                {
                    text: 'Xoá ',
                    handler: () => {
                      this.foodProvider.deleteFood(food).then(res =>{
                          _.remove(this.foodOrders, (f:FoodOrder)=>{
                              return f.id == food.id;
                          })
                      });
                    }
                }
            ]
        });
        this.alert.present();
    }
    
}
