import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GoldVelvet} from "../../model/gold.model";
import * as moment from 'moment-timezone';
import {GoldvelvetProvider} from "../../providers/goldvelvet/goldvelvet";

@IonicPage()
@Component({
    selector: 'page-goldvelvet',
    templateUrl: 'goldvelvet.html',
})
export class GoldvelvetPage {
    public goldVelvet: GoldVelvet;
    public confirmBox: any;

    constructor(public navCtrl: NavController,
                public goldVelvetService: GoldvelvetProvider,
                public navParams: NavParams,
                public alertCtrl: AlertController,) {
        this.goldVelvet = {
            id: '',
            adult: 0,
            child: 0,
            day: '',
            month: '',
            year: '',
            total: 0,
            adultPrice: 150000,
            childPrice: 75000,
            discount: 0
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GoldvelvetPage');
    }

    paymentDone() {

        this.confirmBox = this.alertCtrl.create({
            title: 'Xác nhận lại thực đơn ',
            cssClass: 'customConfirm',
            buttons: [
                {
                    text: 'Huỷ bỏ '
                },
                {
                    text: 'Đặt ',
                    handler: () => {
                        if (this.goldVelvet.adult && this.goldVelvet.child) {
                            this.goldVelvet.id = moment().format('DDMMYYYYHHmmss');
                            this.goldVelvet.day = moment().format('DD');
                            this.goldVelvet.month = moment().format('MM');
                            this.goldVelvet.year = moment().format('YYYY');
                            this.goldVelvet.total =  (this.goldVelvet.adult * this.goldVelvet.adultPrice
                                + this.goldVelvet.child * this.goldVelvet.childPrice) * ((100 - this.goldVelvet.discount)/100);
                            this.goldVelvetService.saveGoldVelvet(this.goldVelvet);
                        } else {
                            this.presentAlert();
                        }
                    }
                }
            ]
        });


        this.confirmBox.addInput({
            type: 'checkbox',
            label: "adult" + ' : ' + this.goldVelvet.adult,
            checked: true,
            cursor: false,
            disabled: true
        });

        this.confirmBox.addInput({
            type: 'checkbox',
            label: "child" + ' : ' + this.goldVelvet.child,
            checked: true,
            cursor: false,
            disabled: true
        });

        this.confirmBox.addInput({
            type: 'checkbox',
            label: "Total" + ' : ' +
            (this.goldVelvet.adult * this.goldVelvet.adultPrice
                + this.goldVelvet.child * this.goldVelvet.childPrice) * ((100 - this.goldVelvet.discount)/100),
            checked: true,
            cursor: false,
            disabled: true
        });


        this.confirmBox.present();
    }

    presentAlert() {
        this.confirmBox = this.alertCtrl.create({
            title: 'Lỗi',
            subTitle: 'Thiếu thông tin ',
            buttons: ['Đóng ']
        });
        this.confirmBox.present();
    }

}
