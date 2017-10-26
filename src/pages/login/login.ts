import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {UserLogin} from "../../model/userLogin.model";
import {AuthProvider} from "../../providers/auth/auth";
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: UserLogin;
  private alert: any;

  constructor(public navCtrl: NavController,
              private auth: AuthProvider,
              private userLogin: UserLoginProvider,
              public alertCtrl: AlertController) {
    this.user = {
      username: '',
      password: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.auth.login(this.user.username, this.user.password).then((isValid) => {
      if (isValid) {
        this.userLogin.setUser(this.user.username, this.user.password);
        this.navCtrl.setRoot(HomePage);
      } else {
        this.presentAlert();
      }
    })
  }

  presentAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Unauthenticated',
      subTitle: 'Incorrect username or password',
      buttons: ['Close']
    });
    this.alert.present();
  }

}
