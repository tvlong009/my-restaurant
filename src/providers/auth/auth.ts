import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  login(username, password) {
    return new Promise((resolve => {
      setTimeout(()=>{
        if(username === 'admin' && password === 'admin'){
          resolve(true);
        }else if(username === 'staff' && password === 'staff') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 3000);
    }));
  }

}
