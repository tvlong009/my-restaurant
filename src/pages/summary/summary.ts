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
      this.menuArraySearch = [];
      let day = moment(this.dataSearch).format('DD');
      let month = moment(this.dataSearch).format('MM');
      let year = moment(this.dataSearch).format('YYYY');

    switch (this.chooseType){
        case 'day':
            this.summaryProvider.searchByDate(day, month , year).then(res=>{
                this.menuArraySearch = res;
                this.totalBySearch = _.sumBy(this.menuArraySearch, (menu) => { return menu.total; });
            });
          break;
        case 'month':
            this.summaryProvider.searchByMonthYear(month , year).then(res=>{
                this.menuArraySearch = res;
                this.totalBySearch = _.sumBy(this.menuArraySearch, (menu) => { return menu.total; });
            });
          break;
        case 'year':
            this.summaryProvider.searchByYear(year).then(res=>{
                this.menuArraySearch = res;
                this.totalBySearch = _.sumBy(this.menuArraySearch, (menu) => { return menu.total; });
            });
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
