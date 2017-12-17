import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FoodOrder, Menu} from "../../model/menu.model";
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../environment/environment";
import {NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";

@Injectable()
export class MenuProvider {
  public menuList: Menu[] = [];
  public environment = new environment();
  public url: string;
  constructor(public http: Http) {
    this.url = this.environment.URL_API;
  }

  setListMenuApi(menu: Menu) {
    return this.http.post(this.url + 'menu', menu).map(res => res.json()).toPromise();
  }

  getListMenuApi() {
    return this.http.get(this.url + 'menu').map(res => res.json()).toPromise();
  }

  getMenuById(id){
    return this.http.get(this.url + 'menu/' + id).map(res=>res.json()).toPromise();
  }

  updateMenuById(menu){
    return this.http.put(this.url + 'menu/' + menu.id, menu).map(res => res.json()).toPromise();
  }

  removeMenu(menu: Menu) {
    return this.http.delete(this.url + 'menu/'+ menu.id).map(res =>res.json()).toPromise();
  }

  removeFoodOrder(menu: Menu) {
    return this.getMenuById(menu.id);
  }
}
