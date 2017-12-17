import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {UserLogin} from "../../model/userLogin.model";

@Injectable()
export class UserLoginProvider {
    private user: UserLogin;

    constructor(public http: Http) {
        this.user = {
            id: '',
            role: '',
            username: '',
            password: ''
        };
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

}
