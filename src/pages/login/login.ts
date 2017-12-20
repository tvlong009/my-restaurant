import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {UserLogin} from "../../model/userLogin.model";
import {AuthProvider} from "../../providers/auth/auth";
import {UserLoginProvider} from "../../providers/user-login/user-login";
import {HomePage} from "../home/home";
import * as moment from 'moment-timezone';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private user: UserLogin;
    private alert: any;
    public canvas: any;
    public context: any;
    public dataList = [
        { id: '', name:'HOÁ ĐƠN TÍNH TIỀN ', price: '' },
        { id: '', name:' GOLD VELVET ', price: '' },
        {
            id: 1,
            name: 'github',
            price: '200$',
        },
        {
            id: 2,
            name: 'google',
            price: '300$',
        }
    ];

    constructor(public navCtrl: NavController,
                private auth: AuthProvider,
                private userLogin: UserLoginProvider,
                public alertCtrl: AlertController) {
        this.user = {
            id: '',
            role: '',
            username: '',
            password: ''
        };

    }

    ionViewDidLoad() {
        this.canvas = document.getElementById('canvas');
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

    canvasPrint(event){

        this.context = this.canvas.getContext('2d');
        this.doCanvas();
        this.downloadCanvas(event.srcElement, 'canvas', moment().format('HH:mm:ss DD-MM-YYYY')+'.png');
    }
     doCanvas() {
        /* draw something */
        console.log(2);

        //  var img1 = new Image();
        //
        //  //drawing of the test image - img1
        //  img1.onload =  () =>{
        //      //draw background image
        //      this.context.drawImage(img1, 0, 0);
        //      //draw a box over the top
        //      this.context.fillStyle = "rgba(200, 0, 0, 0.5)";
        //      this.context.fillRect(0, 0, 500, 500);
        //  };
        //  img1.src = 'assets/imgs/logo.png';
        //
        // this.context.fillStyle = '#f90';
        // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // this.context.fillStyle = '#fff';
        // this.context.font = '60px sans-serif';
        // this.context.fillText('Code Project', 10, this.canvas.height / 2 - 15);
        // this.context.font = '26px sans-serif';
        // this.context.fillText('Click link below to save this as image', 15, this.canvas.height / 2 + 35);
         // draw a rectangular white frame for our content
         this.context.beginPath();
         this.context.fillStyle = "white";
         this.context.rect(1, 1, 398, 600);
         this.context.fill();
         this.context.stroke();
         // draw some text, leaving space for the avatar image
         this.context.fillStyle = "black";
         this.context.font = "28px Arial";
         this.context.fillText("GOLD VELVET - Jjim Jil Bang", 120, 40, 190);
         this.context.font = "18px Arial";
         this.context.fillText("Hoá đơn tính tiền", 140, 70, 190);
         this.context.font = "24px Arial";
         let space = 100;
         for(let i = 0; i< 3;i++){
             space += 30;
             this.context.font = "12px Arial";
             this.context.fillStyle = "red";
             this.context.fillText("Mỳ tương đen sốt cay: ", 10, space, 190);
             this.context.fillStyle = "red";
             this.context.fillText("x 2", 250, space, 190);

             this.context.fillStyle = "green";
             this.context.fillText("= 1.000.000Đ", 310, space, 190);
         }
         // draw avatar image on the left

    }

    downloadCanvas(link, canvasId, filename) {
        let customURL = <HTMLCanvasElement> document.getElementById(canvasId);
        link.setAttribute('href',customURL.toDataURL());
        //link.setAttribute('download', filename);
    }

}
