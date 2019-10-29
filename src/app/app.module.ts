import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { OrderDetailPage } from '../pages/order/order';
import { ProfilePage, ChangePasswordPage, ProfileEditPage } from '../pages/profile/profile';
import { SignupPage, TermsOfUse } from '../pages/signup/signup';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { OneService } from '../services/one.service';
import { TwoService } from '../services/two.service';
import { ThreeService } from '../services/three.service';
import { FourService } from '../services/four.service';
import { LocationService } from '../services/location.service';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/*import { BackgroundGeolocation } from '@ionic-native/background-geolocation';*/
import { FileUploadModule, FileSelectDirective  } from 'ng2-file-upload';
import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

import { Diagnostic } from '@ionic-native/diagnostic';


import { AuthService } from '../services/auth.service'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';


import * as firebase from "firebase";

import { Badge } from '@ionic-native/badge';
/*import { BackgroundMode } from '@ionic-native/background-mode';*/

import { Network } from '@ionic-native/network';
import { SixService } from '../services/six.service';

var config = {
    apiKey: "AIzaSyB5oue6snCCcEKDTpoX8hRQkP0q2bl1Ojo",
    authDomain: "mealdaay-334ae.firebaseapp.com",
    databaseURL: "https://mealdaay-334ae.firebaseio.com",
    projectId: "mealdaay-334ae",
    storageBucket: "mealdaay-334ae.appspot.com",
    messagingSenderId: "202055895804"
  };


firebase.initializeApp(config);



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ForgetPasswordPage,
    OrderPage,
    ProfilePage,
    OrderDetailPage,
    SignupPage,
    ProfileEditPage,
    ChangePasswordPage,
    RestaurantsPage,
    TermsOfUse
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FileUploadModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TermsOfUse,
    MyApp,
    LoginPage,
    ForgetPasswordPage,
    OrderPage,
    ProfilePage,
    OrderDetailPage,
    SignupPage,
    ProfileEditPage,
    ChangePasswordPage,
    RestaurantsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneService,
    TwoService,
    ThreeService,
    FourService,
    LocationService,
    Geolocation,
    Badge,
    SixService,
    /*BackgroundMode,*/
    /*BackgroundGeolocation,*/
    File,
    Network,
    Transfer,
    Camera,
    FilePath,
    AuthService,
    /*Push,*/
    AngularFireDatabase,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
