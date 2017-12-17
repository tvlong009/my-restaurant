import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {Menu} from "../../model/menu.model";
import {SummaryProvider} from "../../providers/summary/summary";
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  public menuList: Menu[] = [];
  public dataSearch: string;
  public chooseType: string;
  public menuArraySearch: Menu[] = [];
  public totalBySearch: number;
  constructor(public navCtrl: NavController, public summaryProvider: SummaryProvider) {
    this.chooseType = 'day';
    this.dataSearch = moment().format();
    this.summaryProvider.getListMenuSummary().then(res =>{
      this.menuList = res;
      this.searchByData();
    });
  }

  searchByData(){
    switch (this.chooseType){
        case 'day':
          this.menuArraySearch = _.filter(this.menuList, (menu: any) =>{
            return moment(this.dataSearch).diff(moment(menu.timestamp).format(), 'days') === 0
              && moment(this.dataSearch).diff(moment(menu.timestamp).format(), 'month') === 0
                && moment(this.dataSearch).diff(moment(menu.timestamp).format(), 'years') === 0;
          });
            this.totalBySearch = _.sumBy(this.menuArraySearch, (menu) => { return menu.total; });
            console.log(this.menuArraySearch);
          break;
        case 'month':
            this.menuArraySearch = _.filter(this.menuList, (menu: any) =>{
                return moment(this.dataSearch).diff(moment(menu.timestamp).format(), 'month') === 0
                    && moment(this.dataSearch).diff(moment(menu.timestamp).format(), 'years') === 0;
            });
            this.totalBySearch = _.sumBy(this.menuArraySearch, (menu) => { return menu.total; });
            console.log(this.menuArraySearch);
          break;
        case 'year':
            this.menuArraySearch = _.filter(this.menuList, (menu: any) =>{
                return moment(this.dataSearch).diff(moment(menu.timestamp).format(), 'years') === 0;
            });
            this.totalBySearch = _.sumBy(this.menuArraySearch, (menu) => { return menu.total; });
            console.log(this.menuArraySearch);
            break;
    }
  }

  addDataDump(list: Menu[]) {
    _.each(list, (menu: any) => {
      menu.showDetails = false;
      menu.icon = 'eye';
    });
    return list;
  }

  toggleDetails(data: any) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'eye';
    } else {
      data.showDetails = true;
      data.icon = 'eye-off';
    }
  }
  formatDate(date, format){
      return moment(date).format(format);
  }

}
