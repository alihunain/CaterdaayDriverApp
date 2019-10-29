import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrderPage, OrderDetailPage } from '../pages/order/order';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
/*import { LocationPage } from '../pages/location/location';*/
import { RestaurantsPage } from '../pages/restaurants/restaurants';

import { LocationService } from '../services/location.service';

import { ThreeService } from '../services/three.service';

import {App} from 'ionic-angular';

import { Badge } from '@ionic-native/badge';
/*import { BackgroundMode } from '@ionic-native/background-mode';*/

declare var FCMPlugin : any;
declare var cordova : any;

import { Network } from '@ionic-native/network';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Action } from 'rxjs/scheduler/Action';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any;
  loading: any;

  noConnection : boolean = false;

  currentComponentPage: any;
  firestore = firebase.database().ref('/drivers');
  pages: Array<{title: string, component: any}>;
  totalbudgeCount: any;
  pushtokens: any[];
  constructor(
    public platform: Platform,
    public events: Events,
    public locationTracker: LocationService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private threeService: ThreeService,
    private app: App,
    private badge: Badge,
    public afd: AngularFireDatabase,
    
    /*private backgroundMode: BackgroundMode,*/
    private network: Network
    ) {
      
    this.events.subscribe('user:created', () => {
      console.log("i am clicking");
      this.locationTracker.startTracking();
    });
   
    this.initializeApp();
    this.pages = [
      { title: 'Profile', component: ProfilePage },
      { title: 'Orders', component: OrderPage },
      { title: 'Chefs', component: RestaurantsPage },
      { title: 'Logout', component: 'Logout' }
    ];
  }

  noConnectionToast(){
    let toast = this.toastCtrl.create({
      message: 'Lost Internet connection!',
      duration: 3000,
      position:'bottom' //top,middle,bottom
    });
    toast.present();
    this.noConnection = true;
  }

  retry(event){
    this.noConnection = false;
    /*this.loading = this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    this.loading.present();*/
    if (this.network['type'] == 'none') {

      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        duration : 3000
      });
      this.loading.present();

      this.noConnectionToast();
      /*this.loading.dismiss();*/
    }else{
      this.onConnectFunction();
    }

  }
  setBadge(budgeNumber: number) {
    
 
   // this.badge.set(budgeNumber);
   console.log("set Badge")
   
 }
  getBadge() {
   console.log('get Badge');
  //   this.badge.get().then(count => {
  //    this.totalbudgeCount = count;
  //  });
 }
  clearBadge() {
   console.log('clearBadge');
   // this.badge.clear();
 }
  increaseBadge() {
   console.log('increasing badge by 1');
  //  this.badge.increase(1);
 }
 async registerRequestPermission() {
  try {
    let isSupported = await this.badge.isSupported();
    console.log("isSupported",isSupported);
    let hasPermission = await this.badge.hasPermission();
    console.log('app188hasPermission',hasPermission);
    if (hasPermission) {
      let permission = await this.badge.requestPermission();
      console.log(permission);
    }
  } catch (e) {
    console.error(e);
  }
}

  public loadScript() {
    let node = document.createElement('script');
    node.src = 'http://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=places&key=AIzaSyB1IsrsMN22HB_fgAxG0i3Twes60dPF2EA';
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  onConnectFunction(){
    this.loadScript();

    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration : 3000
    });
    this.loading.present();

    setTimeout(()=>{
      if (localStorage.getItem('driver')) {
        if (this.currentComponentPage == 'RestaurantsPage') {
          this.nav.setRoot(RestaurantsPage);
        }else if (this.currentComponentPage == 'ProfilePage') {
          this.nav.setRoot(ProfilePage);
        }else if (this.currentComponentPage == 'OrderPage') {
          this.nav.setRoot(OrderPage);
        }else{
          this.nav.setRoot(OrderPage);
        }

        this.getCurrentPage();

        this.noConnection = false;

      }else{
        this.nav.setRoot(LoginPage);
        this.getCurrentPage();

        this.noConnection = false;
      }
      /*this.loading.dismiss();*/
    },2000);
  }

  initializeApp() {
    var _that = this;
    this.clearBadge();
 
    this.platform.ready().then(() => {
      this.registerRequestPermission();
      if (typeof cordova != 'undefined') {
        cordova.plugins.notification.badge.hasPermission(function (granted) {
          /*alert('has Permission '+JSON.stringify(granted));*/
          if (!granted) {
            cordova.plugins.notification.badge.requestPermission(function (granted) {
                /*alert('req permission');*/
            });
          }
        });
      }

      /*this.backgroundMode.enable();*/

      if (this.network['type'] == 'none') {
        this.noConnection = true;
        this.noConnectionToast();
      }else{
        this.noConnection = false;
      }

      if(localStorage.getItem('driver')){
        this.rootPage = OrderPage;
        setTimeout(()=>{
          this.splashScreen.hide();
          this.events.publish('user:created');
          this.getCurrentPage();

        },500);
      }else{
        this.rootPage = LoginPage;
        setTimeout(()=>{
          this.splashScreen.hide();
          this.getCurrentPage();

        })
      }

      if (typeof FCMPlugin != 'undefined') {
        FCMPlugin.onNotification((data)=>{
          
          if (typeof cordova != 'undefined') {
            // cordova.plugins.notification.badge.increase(1, function (badge) {
            //   console.log("badge => " ,badge);
            // });
          }

          if(data.wasTapped){
            if (typeof cordova != 'undefined') {
              this.increaseBadge();
              // cordova.plugins.notification.badge.decrease(1, function (badge) {
              //   console.log("badge => " ,badge);
              // });
            }
            _that.getOrder(data.orderId);
          }else{
            if (typeof cordova != 'undefined') {
              this.clearBadge();
            }
            console.log("data.message",data.message);
            let prompt = _that.alertCtrl.create({
              message: data.message,
              buttons: [
                {
                  text: 'oK',
                  handler: dataa => {
                    _that.getOrder(data.orderId);
                  }
                }
              ]
            });
            prompt.present();
          }
        });

        FCMPlugin.onTokenRefresh(function(token){
          console.log( token );
        });
      }

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.retry('abc');
      });

      let connectSubscription = this.network.onConnect().subscribe(() => {
        /*this.noConnection = false;
        this.loading = this.loadingCtrl.create({
          spinner: 'bubbles'
        });
        this.loading.present();*/

        this.onConnectFunction();
      });

      this.statusBar.styleDefault();
    });
  }

  getCurrentPage(){
    setTimeout(()=>{
      let page = this.app.getActiveNavs();
      if (page.length > 0) {
        console.log(page);
        this.currentComponentPage = page[0].getViews()[0].name;
      }
    },1500)
  }

  openPage(page) {
    if (page.component == 'Logout') {
      this.doLogout();
    }else{
      this.nav.setRoot(page.component);

      this.getCurrentPage();
    }
  }
  // tokensetup() {
  //   var promise = new Promise((resolve, reject) => {
  //     FCMPlugin.getToken(function(token){
  //       resolve(token);
  //     }, (err) => {
  //       reject(err);
  //     });
  //   })
  //   return promise;
  // }
  removeToken(){
    // this.tokensetup();
  let  driver:any = localStorage.getItem('driver')
    this.afd.list(this.firestore).remove(driver._id);
  // let itemRef = this.afd.object('drivers');
  //   // cons
  // //  console.log(itemRef);
  //   this.afd.list(this.firestore).snapshotChanges().subscribe(action =>{
  //     let arr:any = action;
  //     // let itemRef = this.afd.object('drivers');
  //   });
  //   itemRef.snapshotChanges().subscribe(action => {
  //     let arr = action.payload.val();
  //     let pushArr = [];
  //     console.log(action);
  //     for (var k in arr){
  //         if (arr.hasOwnProperty(k)) {
  //           pushArr.push({'key':k,'driverId':arr[k].driverId})
  //         }
  //         // if(arr[k].driverId === this.driver['_id']){
  //         //   // itemRef.remove('k');
  //         // }
  //     }
  //     this.pushtokens = pushArr;
  //   });

   
      // this.tokensetup().then((token) => {
      //   if (this.pushtokens && this.pushtokens.length > 0) {
      //     let indx = this.pushtokens.findIndex((mn)=> mn.driverId == this.driver['_id'])
      //     if (indx > -1) {
      //       this.updateToken(this.pushtokens[indx]['key'],token);
            
      //     }
      //   }
      // })
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }
  doLogout() {
    let prompt = this.alertCtrl.create({
      title: 'Logout',
      message: "Are you sure ?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'oK',
          handler: data => {
            this.removeToken();
           // localStorage.clear();
        //    localStorage.removeItem('driver');
            this.nav.setRoot(LoginPage);

            this.getCurrentPage();
          }
        }
      ]
    });
    prompt.present();
  }
  


  getOrder(id){
    this.threeService.getOrderById(id).subscribe((data)=>{
      if (!data.error) {
        this.nav.setRoot(OrderDetailPage, {
          orderDetail: data.message, noti:'noti'
        });
      }
    });
  }


}
