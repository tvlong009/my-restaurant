import {Component} from '@angular/core';
import {HomePage} from '../pages/home/home';
import {AuthProvider} from "../providers/auth/auth";
import {LoginPage} from "../pages/login/login";
import {UserLoginProvider} from "../providers/user-login/user-login";
import {UserLogin} from "../model/userLogin.model";
import {LoadingController} from "ionic-angular";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    public rootPage: any = LoginPage;
    private user: UserLogin;
    public loader: any;

    constructor(private auth: AuthProvider,
                private userLogin: UserLoginProvider,
                public loadingCtrl: LoadingController) {
        this.user = this.userLogin.getUser();
        this.presentLoadingDefault();
        if (!this.userLogin.getUser()) {
            this.rootPage = HomePage;
        } else {
            this.rootPage = LoginPage;
        }
        this.loader.dismiss();
    }

    presentLoadingDefault() {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loader.present();
    }
}

