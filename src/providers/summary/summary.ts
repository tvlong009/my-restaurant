import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Menu} from "../../model/menu.model";

@Injectable()
export class SummaryProvider {
  private menuSummary: Menu[] = [];
  constructor(public http: Http) {
    console.log('Hello SummaryProvider Provider');
  }

  getListMenuSummary(){
    return this.menuSummary;
  }
  addMenuSummary(menu: Menu){
    this.menuSummary.push(menu);
  }
}
