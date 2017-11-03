import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {Menu} from "../../model/menu.model";
import {SummaryProvider} from "../../providers/summary/summary";
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  public menuList: Menu[] = [];
  constructor(public navCtrl: NavController, public summaryProvider: SummaryProvider) {
    this.menuList = this.summaryProvider.getListMenuSummary();
    console.log(this.menuList);
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

}
