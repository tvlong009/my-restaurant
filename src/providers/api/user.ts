import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../environment/environment";

@Injectable()
export class UserProvider {
    public url: string;
    public environment = new environment();

    constructor(public http: Http) {
        this.url = this.environment.URL_API;
    }

    getUsers(){
        console.log("url"+ this.url);
        console.log(this.http.get(this.url+'users'));
        return this.http.get(this.url + 'users').map(res => res.json()).toPromise();
    }
}