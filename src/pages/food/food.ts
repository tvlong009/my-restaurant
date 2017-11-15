import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FoodOrder} from "../../model/menu.model";
import {FoodProvider} from "../../providers/food/food";

/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-food',
    templateUrl: 'food.html',
})
export class FoodPage {
    foodOrders: FoodOrder[] = [];
    foodModel: FoodOrder;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private foodProvider: FoodProvider) {
        this.foodOrders = this.foodProvider.getFoodList();
        this.foodModel = {
            name: '',
            price: null,
            id: null,
            orderNum: 0
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FoodPage');
    }

    createFood() {
        this.foodProvider.setFood(this.foodModel);
    }
}
