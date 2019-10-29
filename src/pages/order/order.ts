// import { OrderPage } from './order';
import { Action } from 'rxjs/scheduler/Action';
import { Component } from '@angular/core';
import { SlicePipe, DatePipe } from '@angular/common';
import { NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ThreeService } from './../../services/three.service';
import { FourService } from '../../services/four.service';
import { OneService } from '../../services/one.service';

declare var google: any;
import moment from 'moment';
import * as globalVariable from "../../services/global";




import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/
import 'rxjs/add/operator/map';

import firebase from 'firebase';

declare var FCMPlugin : any;

/*import { AngularFirestore } from 'angularfire2/firestore';*/
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orders: any;
  loading: any;
  driver: any;
  compOrders: any = [];
  pendorders: any = [];
  toacceptorders:any=[];

  totalCash: Number = 0;

  orderStatus: String = "pending";


  /*items: Observable<any[]>;*/

  /*itemRef: AngularFireObject<any>;
  item: Observable<any>;*/

  firestore = firebase.database().ref('/drivers');
  /*firemsg = firebase.database().ref('/messages');*/

  pushtokens: any = [];
  /*cashArray: any = [];*/



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private threeService: ThreeService,
    private oneService: OneService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public afd: AngularFireDatabase
  ) {
    if (localStorage.getItem('driver')) {
      this.driver = JSON.parse(localStorage.getItem('driver'));
      if (typeof this.driver.kitchensallow == 'undefined') {
        this.driver.kitchensallow = [];
      }
    }
   let allowedResturants= [] ;
    this.oneService.getRestaurants().subscribe(async (resturants)=>{
        console.log(resturants,'Resturants');
        console.log(this.driver,"Driver");
        let zipCodes = this.driver.zip.split(',');
        for(let j = 0 ; j < zipCodes.length ; j++){
        for(let i = 0 ; i < resturants.message.length ; i ++ ){
          if(zipCodes[j] && resturants.message[i].zipcode && resturants.message[i].zipcode.toLowerCase() === zipCodes[j].toLowerCase() ){
              allowedResturants.push({
                resId:resturants.message[i]._id,
                status:true
              });
          }
        }
      }
        if(allowedResturants != this.driver.kitchensallow){
          console.log(allowedResturants, 'Allowed Resturant');
          this.driver.kitchensallow  = allowedResturants;
         await this.oneService.editDriver({
            _id:this.driver._id,
            kitchensallow:allowedResturants
          }).subscribe((res)=>{
            console.log(res);
            this.driver  = res.message;
            localStorage.setItem('driver',JSON.stringify(res.message));
          },(err)=>{
            console.log(err);
          });
        }
    });


  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getDriver();
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.getDriver();
  }

  getDriver(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.oneService.getDriver(this.driver._id).subscribe((data)=>{
      if (!data.error) {
        this.driver = data.message;
        this.getOrders();
        localStorage.removeItem('driver');
        localStorage.setItem('driver', JSON.stringify(data.message));
      }else{
        this.getOrders();
      }
    },(err)=>{
      this.getOrders();
    })
  }
  formatDate(obj) {
    return obj.toString().replace(/\s/g, "T");
}
  getOrders() {
    var allowids = { rids: [] };

    if (this.driver['kitchensallow'].length > 0) {
      this.driver['kitchensallow'].forEach(element => {
        if (element.status) {
          allowids.rids.push(element.resId)
        }
      });
    }
    this.threeService.getOrders(allowids).subscribe((data) => {
      console.log(data.message,"this is me");
      if (!data.error) {
        if (data.message.length > 0) {

          this.totalCash = 0;
          
          data.message.forEach((order) => {
            console.log(order['paymenttype'] == 'cash',"condition one");
            if (order['paymenttype'] == 'Cash' && ((order.status == 'driveraccepted' || order.status == 'delivered') && order.driverDetail != undefined && order.driverDetail['_id'] == this.driver['_id'])) {
              this.totalCash += order['total'];
              console.log(this.totalCash,"testtt");
            }
          })
          console.log(data.message,'GET ALL ORDERS');
          this.pendorders = data.message.filter((index) => {
            return ((index.status == 'accepted'   ) && typeof index.driverDetail == 'undefined' ) || (index.driverDetail && (index.status == 'driveraccepted' || index.status == 'ontheway') && index.driverDetail['_id'] == this.driver['_id'] );
          });
          console.log('Showing Detail of Order',this.pendorders );
          this.compOrders = data.message.filter((index) => {
 
            if (typeof index.driverDetail != 'undefined') {
       
              return (index.status == 'delivered' && index.driverDetail['_id'] == this.driver['_id']);
            }
          });
        
        }
      }
      this.loading.dismiss();
    },(err)=>{
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Unable to load orders! Please check your Internet connection.',
        duration: 3000,
        position:'top' //top,middle,bottom
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    this.getToken();
  }


  getToken(){
    let itemRef = this.afd.object('drivers');

    itemRef.snapshotChanges().subscribe(action => {
      let arr = action.payload.val();
      let pushArr = [];
      for (var k in arr){
          if (arr.hasOwnProperty(k)) {
            pushArr.push({'key':k,'driverId':arr[k].driverId})
          }
      }
      this.pushtokens = pushArr;
    });

    setTimeout(()=>{
      this.tokensetup().then((token) => {
        if (this.pushtokens && this.pushtokens.length > 0) {
          let indx = this.pushtokens.findIndex((mn)=> mn.driverId == this.driver['_id'])
          if (indx > -1) {
            this.updateToken(this.pushtokens[indx]['key'],token);
          }else{
            this.addToken(token)
          }
        }else{
          this.addToken(token)
        }
      })
    },5000)
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

  addToken(t){
 
    this.afd.list(this.firestore).push({
      driverId: this.driver['_id'],
      resID:this.driver.kitchensallow,
      devtoken: t
    }).then(() => {
      console.log('Token stored');
    })
  }

  updateToken(key,t){
    this.afd.list(this.firestore).update(key, { devtoken: t, resID:this.driver.kitchensallow }).then(() => {
      console.log('Token Updated');
    });
  }

  openDetail(index, type) {
    if (type == 'pending') {
      this.navCtrl.push(OrderDetailPage, {
        orderDetail: this.pendorders[index]
      });
    }
    if (type == 'completed') {
      this.navCtrl.push(OrderDetailPage, {
        orderDetail: this.compOrders[index]
      });
    }

  }
}




@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  fromNoti: any;
  orderDetail: any;
  driver: any;
  locations: any;
  imageURL : string = globalVariable.imageUrl;

  /*items: Observable<any[]>;*/

  requestDriver: Boolean;

  firebaseOrders = [];

  taxAmmount : any;

  firestore = firebase.database().ref('/orders');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private fourService: FourService,
    private oneService: OneService,
    private threeService: ThreeService,
    public afd: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    if (localStorage.getItem('driver')) {
      this.driver = JSON.parse(localStorage.getItem('driver'));
    }
    this.orderDetail = navParams.get("orderDetail");

    this.getTaxAmmount();

    this.fromNoti = navParams.get("noti");
    oneService.getRestaurant(this.orderDetail['restaurantid']).subscribe((data) => {
      if (!data.error && data.message != null) {
        this.orderDetail.restaurantData = data.message;


        if (this.orderDetail['ordertiming']['type'] == 'now') {
          if (typeof data.message['mindeliveryime'] != 'undefined' && data.message['mindeliveryime'] != null && data.message['mindeliveryime'] != '' && parseInt(data.message['mindeliveryime']) > 0) {
              this.orderDetail['ordertiming']['datetime'] = this.addMinTime(data.message['mindeliveryime']);
          }
        }



      }
    },(err)=>{
      this.presentToast('Unable to load Chef detail. Please check your Internet connection');
    });
    fourService.getCustomers(this.orderDetail['customerid']).subscribe((data) => {
      if (!data.error && data.message != null) {
        this.orderDetail.customerData = data.message;
      }
    },(err)=>{
      this.presentToast('Unable to load Customer detail. Please check your Internet connection');
    });
    setTimeout(() => {
      if(typeof this.orderDetail.customerData != 'undefined'){
        this.loadMap();
      }
    }, 1000);
  }

  
  addMinTime(time){
    let date = new Date(this.orderDetail['ordertiming']['datetime']);
    date.setMinutes(date.getMinutes()+parseInt(time));
    let returnDate = this.getFormattedDate(date);
    return returnDate;
  }

  getDateOfDailyMenu(){
    if(this.orderDetail && this.orderDetail.ordertiming && this.orderDetail.ordertiming.datetime){
      let DailyMenuDate = this.orderDetail.ordertiming.datetime.split(' ');
        if(DailyMenuDate.length > 0 ){
          return moment(DailyMenuDate[0], 'YYYY-MM-DD').format('MMMM  DD,YYYY');
        }
    } 
  }
  getTimeOfDailyMenuForDelivery(){
    if(this.orderDetail && this.orderDetail.ordertiming){
      let DailyMenuDate = this.orderDetail.ordertiming.datetime.split(' ');
   

        if(DailyMenuDate.length > 2 ){
           return  DailyMenuDate[1] +' '+DailyMenuDate[2] 
        }else{
         return this.tConvert(DailyMenuDate[1]);
        }

        
    } 
  }
  getDateOfWeekend(pkg){
   let packageStartDate = moment(pkg.startDate, 'YYYY-MM-DD').format('MMM  DD,YYYY') 
   return  moment.utc(packageStartDate).format('LL');
  }
  getTimeOfWeekendForDelivery(){
    let time  = this.orderDetail.delvierySlot.deliveryTime.split(":");

    return this.tConvert(this.orderDetail.delvierySlot.deliveryTime);
  }
  getDateOfFirstWeekly(pkg){
  let  packageStartDate =  this.getPackageStartDate(pkg.startdate ,this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime,'fixed','subtract').format('MMM DD,YYYY');
  return moment.utc(packageStartDate).format('LL');
  }
  getTimeOfFirstWeeklyDelivery(){
  return this.tConvert(this.orderDetail.delvierySlotsWeek.deliveryFirstTime);
  }
  getDateOfSecondWeekly(pkg){
    let  packageStartDate =   this.getPackageStartDate(pkg.startdate ,this.orderDetail.delvierySlotsWeek.Secondday, this.orderDetail.delvierySlotsWeek.deliverySecondTime,'fixed','add').format('MMM DD,YYYY');
    // let formatedDate = moment(packageStartDate, 'YYYY-MM-DD')
    
    return moment.utc(packageStartDate).format('LL');
  }
  getTimeOfSecondForDelivery(pkg){
    return this.tConvert(this.orderDetail.delvierySlotsWeek.deliverySecondTime);
  }
  getDateOfWeeklyOnce(pkg){
   let packageStartDate =  this.getPackageStartDate(pkg.startdate ,this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime,'fixed','subtract').format('MMM DD,YYYY');
    return moment.utc(packageStartDate).format('LL');
  }
  getTimeOfWeeklyForDeliveryOnce(){
    return this.tConvert(this.orderDetail.delvierySlotsWeek.deliveryFirstTime);
  }

  tConvert (time) {
    // Check correct time format and split into components
    let hour = (time.split(':'))[0]
  let min = (time.split(':'))[1]
  let part = hour > 12 ? 'PM' : 'AM';
  
  min = (min+'').length == 1 ? `0${min}` : min;
  hour = hour > 12 ? hour - 12 : hour;
  hour = (hour+'').length == 1 ? `0${hour}` : hour;

  return (`${hour}:${min} ${part}`)
  }







  getFormattedDate(date) {
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    let hr = date.getHours().toString();
    hr = hr.length > 1 ? hr : '0' + hr;

    let min = date.getMinutes().toString();
    min = min.length > 1 ? min : '0' + min;

    return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
  }


  formatDate(obj) {
 
    return obj.toString().replace(/\s/g, "T");
}
formatDateForDetailOrderTiming(obj){
  console.log(obj)
}
  getPkgStatus(detail){
    let date = new Date(detail.date);

    let currentDate = new Date();
    let dateDate = currentDate.getMonth()+1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

    if (detail.date == dateDate) {
      if (detail.status) {
        return 0;
      }else{
        return 1;
      }
    }else{
      var dateTime = date.getTime();
      var  currentDateTime = currentDate.getTime();

      let dayDiff : any;

      if (currentDateTime > dateTime) {
        if (detail.status) {
          return 0;
        }else{
          return 3;
        }
      }else{
        return 2;
      }
    }
  }



  getTaxAmmount(){
    if (typeof this.orderDetail['discount'] != 'undefined') {
      this.taxAmmount = (this.orderDetail['subtotal'] + this.orderDetail['deliveryCharges'] - this.orderDetail['discount'])*(this.orderDetail['tax']/100);
    }else{
      this.taxAmmount = (this.orderDetail['subtotal'] + this.orderDetail['deliveryCharges']) * (this.orderDetail['tax']/100);
    }
  }

  startTracking(){
    let div = document.getElementById('map');
    if (div.style.height == '300px') {
      div.style.height = '0'
    }else{
      div.style.height = '300px';
    }
  }

  itemImage(img){
    let imgPath : any;
    if (img != null) {
      imgPath = this.imageURL + img;
    }
    if (img == null) {
      imgPath = "assets/imgs/res2.jpg";
    }
    return imgPath;
  }

  loadMap() {
    let mapOptions= {
      center: new google.maps.LatLng(this.orderDetail['fulladdress'].lat, this.orderDetail['fulladdress'].lng),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var infowindow = new google.maps.InfoWindow();

    // driver
    let latLng = new google.maps.LatLng(this.driver.lat, this.driver.lng);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: false,
    });
    infowindow = new google.maps.InfoWindow({
      content: 'Me'
    });
    infowindow.open(map, marker);

    // order
    latLng = new google.maps.LatLng(this.orderDetail.fulladdress.lat, this.orderDetail.fulladdress.lng);
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      draggable: false,
    });
    infowindow = new google.maps.InfoWindow({
      content: this.orderDetail.customerData.firstname
    });
    infowindow.open(map, marker);

    this.showRoute(map);
  }

  showRoute(map) {
    let directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    let directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    let origin = { location: new google.maps.LatLng(this.driver.lat, this.driver.lng), stopover: true };
    directionsService.route({
      origin: origin['location'],
      destination: new google.maps.LatLng(this.orderDetail.fulladdress.lat, this.orderDetail.fulladdress.lng),
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Unable to display Route on Map!');
      }
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top' //top,middle,bottom
    });
    toast.present();
  }

changeDailyMenuStatus(status,orderid){
  console.log(orderid,'ORder ID' ,this.orderDetail, 'Order Details' );
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  for(let i =0 ; i < this.orderDetail.items.length ; i++){
    this.orderDetail.items[i].orderStatus = status;
    
  }
  let obj :any = {
    id:orderid,
    items: this.orderDetail.items
  }
  let deliverdAllPackages = true;
  
  for(let i =0 ; i < this.orderDetail.package.length ; i++){
    if(this.orderDetail.package[i].orderStatus == 'delivered'){

    }else{
      deliverdAllPackages = false;
      break;
    }
  }
  if(this.orderDetail.items.length > 0 ){
    if( this.orderDetail.items[0].orderStatus == 'delivered'){

    }else{
      deliverdAllPackages = false;
    }
  }
  if(deliverdAllPackages){
    obj.status = 'delivered';
    this.changeFirebaseOrderStatus('delivered');
  }  
 
this.threeService.getOrderById(this.orderDetail._id).subscribe((data) =>{
  if(data.message && data.message.driverDetail &&  this.orderDetail.driverDetail && data.message.driverDetail._id == this.orderDetail.driverDetail._id){
  console.log("603 , Change MEnu Status")
    this.threeService.updateOrdersStatus(obj).subscribe((data) => {
    loading.dismiss();
    if (!data.error) {
    }
    this.getOrder();
  });
}else{
  loading.dismiss();
  this.presentToast('Unable to update. Please refresh and try again!');
}
});



}
changePackageStatus(status,orderid,pkg){
    pkg.orderStatus = status;
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let obj :any = {
      id:orderid,
      package: this.orderDetail.package
    }
    let deliverdAllPackages = true;
    for(let i =0 ; i < this.orderDetail.package.length ; i++){
      if(this.orderDetail.package[i].orderStatus == 'delivered'){

      }else{
        deliverdAllPackages = false;
        break;
      }
    }
    if(this.orderDetail.items.length > 0  ){
      if(this.orderDetail.items[0].orderStatus == 'delivered'){

      }else{
        deliverdAllPackages = false;
      }
    }
    if(deliverdAllPackages){
      obj.status = 'delivered';
      this.changeFirebaseOrderStatus('delivered');
    }  
    this.threeService.getOrderById(this.orderDetail._id).subscribe((data) =>{
      if(data.message && data.message.driverDetail &&  this.orderDetail.driverDetail && data.message.driverDetail._id == this.orderDetail.driverDetail._id){
        console.log("changePackageStatus,6522")
        this.threeService.updateOrdersStatus(obj).subscribe((data) => {
      loading.dismiss();
      if (!data.error) {
      }
      this.getOrder();
    });
  }else{
      loading.dismiss();
      this.presentToast('Unable to update. Please refresh and try again!');
    }
    });

  }
  changeStatus(status, id) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    var obj = {
      id: id,
      status: status
    }
   
    if (status == 'driveraccepted') {
      for(let i = 0 ; i < this.orderDetail.package.length ; i++ ){
        if(this.orderDetail.package[i].orderStatus != 'delivered'){
        this.orderDetail.package[i].orderStatus = 'driveraccepted';
        }
      }
      for(let i = 0 ; i < this.orderDetail.items.length ; i++ ){
        if(this.orderDetail.items[i].orderStatus != 'delivered'){
        this.orderDetail.items[i].orderStatus = 'driveraccepted';
        }
      }
      obj['package'] = this.orderDetail.package;
      obj['items'] = this.orderDetail.items;
      obj['driverDetail'] = {
        _id: this.driver._id,
        name: this.driver.firstname + ' ' + this.driver.lastname,
        phone: this.driver.phoneNo,
        photo: this.driver.image,
        vehicleType: this.driver.vehicleType,
        vehicleName: this.driver.vehicleName,
        vehicleNo: this.driver.vehicleNo,
      }
    }

    if (this.orderDetail['items'].length == 0 && this.orderDetail['combo'].length == 0 ) {
      obj['menuStatus'] = true;
    }

    this.threeService.getOrderById(id).subscribe((order) => {

      if (!order.error) {
        this.orderDetail = order.message;
        if (this.orderDetail.status != 'driveraccepted') {
          this.threeService.updateOrdersStatus(obj).subscribe((data) => {
            loading.dismiss();
            if (!data.error) {

              this.getOrder();

              if (status == 'driveraccepted') {
                this.presentToast('Order Accepted Successfully')
              } else {
                this.presentToast('Order Rejected Successfully. But you can still accept it untill another driver accept this order');
              }
              this.changeFirebaseOrderStatus(status);
              if (typeof this.fromNoti == 'undefined' || this.fromNoti != 'noti') {
                this.navCtrl.pop();
              }
            }else {
              this.presentToast('Unable to update. Please try again!');
            }
          },(err)=>{
            this.presentToast('Unable to Update status. Please check your Internet connection!');
          });
        } else {
          loading.dismiss();
          this.presentToast('Order is already accepted by another driver');
          if (typeof this.fromNoti == 'undefined' || this.fromNoti != 'noti') {
            this.navCtrl.pop();
          }
        }
      } else {
        loading.dismiss();
        this.presentToast('Unable to fetch data. Please try again!');
      }
    },(err)=>{
      this.presentToast('Unable to Update status. Please check your Internet connection!');
    })
  }

  getOrder() {
    this.threeService.getOrderById(this.orderDetail._id).subscribe((order) => {

      if (!order.error) {
        this.orderDetail = order.message;

      //  this.checkIfAllDelivered(this.orderDetail['package']);

        this.oneService.getRestaurant(this.orderDetail['restaurantid']).subscribe((data) => {
          if (!data.error) {
            this.orderDetail.restaurantData = data.message;
          }
        });
        this.fourService.getCustomers(this.orderDetail['customerid']).subscribe((data) => {
          if (!data.error && data.message != null) {
            this.orderDetail.customerData = data.message;
          }
        });
      }
    },(err)=>{
      this.presentToast('Unable to load data. Please check your Internet connection!');
    });
  }

  changeFirebaseOrderStatus(type) {

    let itemRef = this.afd.object('orders');

    itemRef.snapshotChanges().subscribe(action => {

      let arr = action.payload.val();

      let pushArr = [];

      for (var k in arr) {
        if (arr.hasOwnProperty(k)) {
          pushArr.push({ 'key': k, 'orderDetail': arr[k] })
        }
      }
      this.firebaseOrders = pushArr;
    });

    setTimeout(() => {
      if (this.firebaseOrders && this.firebaseOrders.length > 0) {
        let indx = this.firebaseOrders.findIndex((mn) => mn.orderDetail['orderID'] == this.orderDetail['_id'])
        if (indx > -1) {
          this.updateFirebaseOrderStatus(this.firebaseOrders[indx]['key'], type);
        }
      }
    }, 5000)
  }

  updateFirebaseOrderStatus(key, type) {
    if (type == 'driveraccepted') {
      this.afd.list(this.firestore).update(key, { orderStatus: type, driverid: this.driver._id, type : 'item' }).then(() => {
        console.log('Order Updated');
      });
    } else {
      this.afd.list(this.firestore).update(key, { orderStatus: type, type: 'item',ordertype:'home' }).then(() => {
        console.log('Order Updated');
      });
    }
  }

  completeStatus() {

    let prompt = this.alertCtrl.create({
      message: 'Confirm Items Delivery?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            var obj = {
              id: this.orderDetail['_id'],
              menuStatus: true
            }

            /*if (this.orderDetail['package'].length == 0) {
              obj['status'] = 'delivered';
            }*/
            this.threeService.updateOrdersStatus(obj).subscribe((data) => {
              if (!data.error) {
                this.getOrder();
                this.changeFirebaseOrderStatus('delivered');

                this.presentToast('Items Marked Delivered!');
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }

  checkIfAllDelivered(pkg){

    if (this.orderDetail['status'] != 'delivered') {
      if(pkg.length > 0){
        let tmp_list = pkg.filter(function (a) {
          return a.dayandmenus.some(function (b) {
            return b.status == false;
          });
        });

        if (tmp_list.length == 0 && this.orderDetail['menuStatus']) {
          //update delivered
          this.updateDeliver();
        }

      }else{
        if (this.orderDetail['menuStatus'] == true) {
          this.updateDeliver();
        }
      }
    }
  }

  updateDeliver(){
    console.log("Update Deliver 866" )
    var obj = {id : this.orderDetail['_id'] , status : 'delivered'}
    this.threeService.updateOrdersStatus(obj).subscribe((data) => {
      if (!data.error) {
        this.getOrder();
      }
    });
  }

  getPackageStartDate(date,day,deliveryTime,type,behaviour){
    // console.log(date,deliveryTime);
    let notificationDate ;
    if(type == 'flexible'){
    notificationDate = moment(date+' '+deliveryTime,'yyyy-mm-dd hh:mm');
    } else{
    notificationDate = moment(date+' '+deliveryTime);
    }
    // console.log(notificationDate,day );
    while(true){
      // console.log(notificationDate.day() );
      if(notificationDate.day()  == day ){
        // console.log(notificationDate);
        break ;
      }
      if(behaviour == 'subtract'){
      notificationDate.subtract(1, 'd');
      }else{
        notificationDate.add(1, 'd');
      }     
    }
    return notificationDate;
  }



  checkOnAlter(status,orderid,pkg){
   
    let mealPkg = {};
    let mealPkgDate = pkg['dayandmenus'][0]['date'];

    // let date = new Date();

   // let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  //  let today2 = new Date(mealPkgDate);
  // console.log("this function works",pkg);
      let packageStartDate ;
      let today ;
    if(pkg.type == 'flexible'){
      console.log("Weekend Packages",pkg,pkg.startDate +' '+this.orderDetail.delvierySlot.deliveryTime);
       packageStartDate =  moment(pkg.startDate +' '+this.orderDetail.delvierySlot.deliveryTime) ;
       today =  moment(new Date());
    }else{

      if(this.orderDetail.delvierySlotsWeek.deliverySecondTime){
        console.log("deliverySecondTime",pkg);
        if(pkg.orderStatus == 'driveraccepted' || pkg.orderStatus == 'OnTheWayForFirstWeek'){
          packageStartDate =  this.getPackageStartDate(pkg.startdate ,this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime,'fixed','subtract');
          today =  moment(new Date());
          console.log(packageStartDate,"i am HERE")
        }else{
          packageStartDate =  this.getPackageStartDate(pkg.startdate ,this.orderDetail.delvierySlotsWeek.Secondday, this.orderDetail.delvierySlotsWeek.deliverySecondTime,'fixed','add');
          today =  moment(new Date());
        }
      }else{
        console.log("HERE ONCE TIME")
        packageStartDate =  this.getPackageStartDate(pkg.startdate ,this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime,'fixed','subtract');
        today =  moment(new Date());
      }
      
    }

    if (pkg.status == 'delivered') {
      this.presentToast('Already marked Delivered');
    }else{
      console.log(packageStartDate,"packageStartDate");
      console.log(today,"today");
       let differenceBetweenDays :any = moment.duration(packageStartDate.diff(today));
       console.log(differenceBetweenDays);
      if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1 && differenceBetweenDays._data.hours < 6) {
        let title = '';
        let message = '';
        if(status == 'ontheway'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }else if (status == 'OnTheWayForFirstWeek'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }
        else
        {
          title = 'Delivered ';
          message = 'Have you delivered ?'
        }

        let prompt = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.changePackageStatus(status, orderid,pkg);
              }
            }
          ]
        });
        prompt.present();




      }else{
        if(status == 'ontheway'){
        this.presentToast(`You Cannot On the way items it is for future dates!`);
        }else{
          this.presentToast(`You Cannot Delivered  items it is for future dates!`);  
        }
      }
    }
  }
  checkOnStatus(status,orderid){
  
    if(this.orderDetail.ordertiming){
    let DateSplite = this.orderDetail.ordertiming.datetime.split(" ");
    let  DailyDate  = DateSplite[0]
    
    let date = new Date();

    let today1 = new Date();
    let today2 = new Date(DailyDate);

    if (this.orderDetail.items.length  > 0 && this.orderDetail.items[0].orderStatus == 'delivered') {
      this.presentToast('Already marked Delivered');
    }else{
      let packageStartDate ;
      let today ;
    
      
       packageStartDate =  moment(this.orderDetail.ordertiming.datetime) ;
       today =  moment(new Date());
      let differenceBetweenDays :any = moment.duration(packageStartDate.diff(today));
      console.log(differenceBetweenDays);
     if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1 && differenceBetweenDays._data.hours < 6) {
        let title = '';
        let message = '';
        if(status == 'ontheway'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }else if (status == 'OnTheWayForFirstWeek'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }
        else
        {
          title = 'Delivered ';
          message = 'Have you delivered ?'
        }

        let prompt = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.changeDailyMenuStatus(status, orderid);
              }
            }
          ]
        });
        prompt.present();




      }else{
        if(status == 'ontheway'){
          console.log(today1,today2);
        this.presentToast(`You Cannot On the way items it is for future dates!`);
        }else{
          this.presentToast(`You Cannot Delivered  items it is for future dates!`);  
        }
      }
    }
  }

  }
  checkOnAlterDaily(status,orderid){
   
    let mealPkg = {};
    if(this.orderDetail.ordertiming){
    let DateSplite = this.orderDetail.ordertiming.datetime.split(" ");
    let  DailyDate  = DateSplite[0]
    
    let date = new Date();

    let today1 = new Date();
    let today2 = new Date(DailyDate);

    if (this.orderDetail.items.length  > 0 && this.orderDetail.items[0].orderStatus == 'delivered') {
      this.presentToast('Already marked Delivered');
    }else{
      let packageStartDate ;
      let today ;
    
      
       packageStartDate =  moment(this.orderDetail.ordertiming.datetime) ;
       today =  moment(new Date());
      let differenceBetweenDays :any = moment.duration(packageStartDate.diff(today));
      console.log(differenceBetweenDays);
     if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1 && differenceBetweenDays._data.hours < 6) {
        let title = '';
        let message = '';
        if(status == 'ontheway'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }else if (status == 'OnTheWayForFirstWeek'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }
        else
        {
          title = 'Delivered ';
          message = 'Have you delivered ?'
        }

        let prompt = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.changeDailyMenuStatus(status, orderid);
              }
            }
          ]
        });
        prompt.present();




      }else{
        if(status == 'ontheway'){
          console.log(today1,today2);
        this.presentToast(`You Cannot On the way items it is for future dates!`);
        }else{
          this.presentToast(`You Cannot Delivered  items it is for future dates!`);  
        }
      }
    }
  }
  }



  markDeliver(pkgIndex,dayandmenusIndex){
    let pkg = this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex];
    let mealPkg = {};
    let mealPkgDate = this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['date'];

    let date = new Date();

    let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let today2 = new Date(mealPkgDate);

    if (pkg.status) {
      this.presentToast('Already marked Delivered');
    }else{
      if (today1 >= today2) {
        let prompt = this.alertCtrl.create({
          title: 'Delivered',
          message: "Have you delivered MenuItems of " + mealPkgDate + " ?",
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {

                let obj = {};

                this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['status'] = true;

                mealPkg['date'] = this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['date'];
                mealPkg['status'] = this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['status'];

                obj['id'] = this.orderDetail['_id'];
                obj['package'] = this.orderDetail['package'];

                this.threeService.updateOrdersStatus(obj).subscribe((data) => {
                  if (!data.error) {
                    this.getOrder();
                    this.sendPkgNoti(mealPkg);
                    this.presentToast('Items Marked Delivered!');
                  }
                });
              }
            }
          ]
        });
        prompt.present();
      }else{
        this.presentToast('You Cannot delive2123r menu items of future dates!');
      }
    }
  }
  

  sendPkgNoti(mealPkg){
    let itemRef = this.afd.object('orders');

    itemRef.snapshotChanges().subscribe(action => {

      let arr = action.payload.val();

      let pushArr = [];

      for (var k in arr) {
        if (arr.hasOwnProperty(k)) {
          pushArr.push({ 'key': k, 'orderDetail': arr[k] })
        }
      }
      this.firebaseOrders = pushArr;
    });

    setTimeout(() => {
      if (this.firebaseOrders && this.firebaseOrders.length > 0) {
        let indx = this.firebaseOrders.findIndex((mn) => mn.orderDetail['orderID'] == this.orderDetail['_id']);
        if (indx > -1) {
          let mealP = [];

          if (typeof this.firebaseOrders[indx]['orderDetail'].mealPackage == 'undefined') {
            mealP.push(mealPkg);
          }else{
            mealP = this.firebaseOrders[indx]['orderDetail'].mealPackage;
            mealP.push(mealPkg);
          }


          this.afd.list(this.firestore).update(this.firebaseOrders[indx]['key'], { date: mealPkg['date'], mealPackage : mealP, type : 'pkg' }).then(() => {
            console.log('Order Updated');
          });
        }
      }
    }, 5000)
  }























    //Ali Working On This
    ComboOnStatus(status,orderid){
  
      // this.orderDetail.status = status;
      // if(status == 'driveraccepted'){
      //   this.orderDetail.driverDetail = this.driver;
      // }
      // console.log(this.orderDetail,"recheck")
      // return;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      let question = "";
      if(status == 'driveraccepted'){
        question = 'Are you sure you want to accept this order';
      }else if(status == 'ontheway'){
        question = 'Are you on the way to resturant?';
      }else if(status == 'delivered'){
        question = 'have to delivered the order?';
      }
      let prompt = this.alertCtrl.create({
        message: question,
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
            }
          },
          {
            text: 'Confirm',
            handler: data => {
              this.orderDetail.status = status;
              if(status == 'driveraccepted'){
                this.orderDetail.driverDetail = this.driver;
              }
        
              this.threeService.statusUpdate(this.orderDetail,this.orderDetail._id).subscribe(res=>{
                if(!res.error){
        
                }
                console.log(res);
              })
            }
          }
        ]
      });
      loading.dismiss();
      prompt.present();
    
    }

    
}

