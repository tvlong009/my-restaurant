import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AuthProvider} from '../providers/auth/auth';
import {UserLoginProvider} from '../providers/user-login/user-login';
import {MenuProvider} from '../providers/menu/menu';
import {LoginPageModule} from "../pages/login/login.module";
import {MenuBookPageModule} from "../pages/menu-book/menu-book.module";
import {SummaryPageModule} from "../pages/summary/summary.module";
import {SummaryProvider} from '../providers/summary/summary';
import {CommonModule} from "@angular/common";
import {FoodPageModule} from "../pages/food/food.module";
import { FoodProvider } from '../providers/food/food';

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        CommonModule,
        LoginPageModule,
        MenuBookPageModule,
        SummaryPageModule,
        FoodPageModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        UserLoginProvider,
        MenuProvider,
        SummaryProvider,
        FoodProvider
    ]
})
export class AppModule {
}
