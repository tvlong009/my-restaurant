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
            id: '',
            role: '',
            username: '',
            password: ''
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login() {
        if (this.auth.login(this.user.username, this.user.password)) {
            this.userLogin.setUser(this.auth.login(this.user.username, this.user.password));
            this.navCtrl.setRoot(HomePage);
        } else {
            this.presentAlert();
        }
    }

    presentAlert() {
        this.alert = this.alertCtrl.create({
            title: 'Sai mật khẩu',
            subTitle: 'Sai tên đăng nhập và mật khẩu ',
            buttons: ['Đóng']
        });
        this.alert.present();
    }

}
