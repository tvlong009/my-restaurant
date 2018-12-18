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
import {UserProvider} from "../providers/api/user";
import {TableProvider} from "../providers/api/table";
import {PipesModule} from "../pipes/pipes.module";
import {GoldvelvetPageModule} from "../pages/goldvelvet/goldvelvet.module";
import { GoldvelvetProvider } from '../providers/goldvelvet/goldvelvet';
@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        PipesModule,
        HttpModule,
        CommonModule,
        LoginPageModule,
        MenuBookPageModule,
        SummaryPageModule,
        GoldvelvetPageModule,
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
        UserProvider,
        TableProvider,
        MenuProvider,
        SummaryProvider,
        FoodProvider,
    GoldvelvetProvider
    ]
})
export class AppModule {
}
