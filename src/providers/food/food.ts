import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FoodOrder} from "../../model/menu.model";

@Injectable()
export class FoodProvider {
  foodOrders: FoodOrder[] = [];
  constructor(public http: Http) {
      this.foodOrders = [
          {
              name: 'chicken',
              price: 15000,
              orderNum: 0,
              id: '001'
          },
          {
              name: 'beef',
              price: 25000,
              orderNum: 0,
              id: '002'
          },
          {
              name: 'fish',
              price: 45000,
              orderNum: 0,
              id: '003'
          }
      ];
  }

    getFoodList(){
      return this.foodOrders ;
    }

    setFood(food: FoodOrder){
        this.foodOrders.push(food);
    }

}
