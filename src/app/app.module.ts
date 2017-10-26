import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login'
import { AuthProvider } from '../providers/auth/auth';
import { UserLoginProvider } from '../providers/user-login/user-login';
import { MenuProvider } from '../providers/menu/menu';
import {MenuBookPage} from "../pages/menu-book/menu-book";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuBookPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuBookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserLoginProvider,
    MenuProvider
  ]
})
export class AppModule {}
