import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from "../../environment/environment";

@Injectable()
export class GoldvelvetProvider {
    public environment = new environment();
    public url: string;

    constructor(public http: Http) {
        this.url = this.environment.URL_API;
    }

    saveGoldVelvet(model) {
        return this.http.post(this.url + "goldvelvet", model).map(res => res.json()).toPromise();
    }

    getListGoldVelvet() {
        return this.http.get(this.url + 'goldvelvet').map(res => res.json()).toPromise();
    }

}
