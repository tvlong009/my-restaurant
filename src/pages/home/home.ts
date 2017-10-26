import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserLogin} from "../../model/userLogin.model";
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {Menu} from '../../model/menu.model'
import {MenuProvider} from "../../providers/menu/menu";
import {MenuBookPage} from "../menu-book/menu-book";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private user: UserLogin;
  private MenuList: Menu[];
  constructor(public navCtrl: NavController,
              private userLogin: UserLoginProvider,
              private menuProvider: MenuProvider) {
    this.user = this.userLogin.getUser();
    this.MenuList = this.menuProvider.getListMenu();
  }
  loadMenuNew(){
    this.navCtrl.push(MenuBookPage);
  }

}
