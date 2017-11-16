import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FoodOrder, Menu} from "../../model/menu.model";
import * as _ from 'lodash';

@Injectable()
export class MenuProvider {
  public menuList: Menu[] = [];

  constructor(public http: Http) {
    console.log('Hello MenuProvider Provider');
  }

  setListMenu(menu: Menu) {
    this.menuList.push(menu);
  }

  getListMenu() {
    return this.menuList;
  }

  removeListMenu(menu: Menu) {
    _.remove(this.menuList, (data: any) => {
      return menu.id === data.id
    });
    return this.menuList;
  }

  removeFoodOrder(menu: Menu, foodOrder: FoodOrder) {
    let index = _.findIndex(this.menuList, (data) => {
      return menu.id === data.id
    });
    if (index >= 0) {
      console.log(this.menuList[index], foodOrder);
      _.remove(this.menuList[index].orders, (order)=>{
        return order.id === foodOrder.id;
      })
    }
    return this.menuList;
  }
}
