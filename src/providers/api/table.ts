import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../environment/environment";

@Injectable()
export class TableProvider {
    public url: string;
    public environment = new environment();

    constructor(public http: Http) {
        this.url = this.environment.URL_API;
    }

    getTables(){
        return this.http.get(this.url + 'tables').map(res => res.json()).toPromise();
    }
}