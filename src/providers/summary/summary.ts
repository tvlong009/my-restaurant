import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Menu} from "../../model/menu.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../environment/environment";
@Injectable()
export class SummaryProvider {
  private menuSummary: Menu[] = [];
  public url: string;
  public environment = new environment();
  constructor(public http: Http) {
      this.url = this.environment.URL_API;
  }

  getListMenuSummary(){
    return this.http.get(this.url + 'summary').map(res => res.json()).toPromise();
  }
  addMenuSummary(menu: Menu){
    this.http.post(this.url + 'summary', menu).map(res => res.json()).toPromise().then(()=>{
        this.menuSummary.push(menu);
    });
  }
}
