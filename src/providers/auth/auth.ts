import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import {UserProvider} from "../api/user";
@Injectable()
export class AuthProvider {
    public url: string;
    private users: any;
    constructor(public http: Http, private userProvider: UserProvider) {
         this.userProvider.getUsers().then(users =>{
             this.users = users;
        });
    }

    login(username, password) {
        return _.find(this.users, (user)=>{
            return username === user.username && password === user.password;
        });
    }

}
