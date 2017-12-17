import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FoodOrder} from "../../model/menu.model";
import 'rxjs/add/operator/toPromise';
import {environment} from "../../environment/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class FoodProvider {
  foodOrders: FoodOrder[] = [];

    public url: string;
    public environment = new environment();

    constructor(public http: Http) {
        this.url = this.environment.URL_API;
    }
    getFoodList(){
        return this.http.get(this.url + 'food').map(res => res.json()).toPromise();
    }
    getFoodById(id){
        return this.http.get(this.url + 'food/' + id).map(res=>res.json()).toPromise();
    }

    setFood(food: FoodOrder){
        return this.http.post(this.url + 'food', {
            id: food.id,
            name: food.name,
            price: food.price
        }).map(res => res.json()).toPromise();
    }

    deleteFood(food: FoodOrder){
        return this.http.delete(this.url + 'food/' + food.id).map(res => res.json()).toPromise();
    }

}
