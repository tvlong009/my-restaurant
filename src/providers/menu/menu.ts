import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Menu} from "../../model/menu.model";


@Injectable()
export class MenuProvider {
  public menuList: Menu[] = [];
  constructor(public http: Http) {
    console.log('Hello MenuProvider Provider');
  }
  setListMenu(menu: Menu){
    this.menuList.push(menu);
  }
  getListMenu(){
    return this.menuList;
  }
}
