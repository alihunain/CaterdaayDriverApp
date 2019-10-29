import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OneService } from './../../services/one.service';
import { OrderPage } from './../order/order';
import {SixService} from '../../services/six.service';
declare var google: any;
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage {
  driver: any;
  restaurants: any;
  allowresids: any;
  kitchenIds:any = [];
  location:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private oneService: OneService,
    public ms6Service: SixService
    )
    {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (JSON.parse(localStorage.getItem('driver'))) {
      console.log("GETING DRIVER")
      this.driver = JSON.parse(localStorage.getItem('driver'));  
    }
    console.log(this.driver);
    this.getDriverLocation();

    this.kitchenIds = this.driver.kitchensallow;

    this.oneService.getRestaurants().subscribe((data)=> {
      if(!data.error){
        var allrestaurants = data.message.filter((item) => {
          return item.activestatus == true;
        });
        console.log("Tresturant", data);
        var trestaurants =  data.message.filter((item) => {
           
       // let country = await this.getgeo(item.lat,item.lng);
         // item.country = country;
          console.log(item.activestatus === true && (item.country.toLowerCase() == this.driver.country.toLowerCase()))
          if(item.activestatus === true && (item.country.toLowerCase() == this.driver.country.toLowerCase())){
            console.log("here");
            return item;
          }
        });
        console.log("Tresturant", trestaurants);



        var allowrestrodetail = [];
        this.driver.kitchensallow.forEach((item)=>{
        var index = trestaurants.findIndex((it) => {return it._id == item.resId;})
          if(index != -1){
            trestaurants.splice(index, 1);
          }
        });

        this.driver.kitchensallow.forEach((item)=>{
          var index = allrestaurants.findIndex((it) => {return it._id == item.resId;})
          if(index != -1){
            var deta = { restaurantname: allrestaurants[index].restaurantname, status: item.status };
            allowrestrodetail.push(deta);
          }
        });
        console.log(trestaurants);
        this.restaurants = trestaurants;
        this.allowresids = allowrestrodetail;
        this.getDriverInfo();
        loading.dismiss();
      }else{
        this.getToast('Unable to load data')
        loading.dismiss();
      }
    },(err)=>{
      loading.dismiss();
      this.getToast('Unable to load Chefs Detail! Please check your Internet connection.')
    });
  }
  async getDriverLocation(){
        
  let countryDriver = await  this.getgeo(this.driver.lat,this.driver.lng);
    this.driver.country = countryDriver;
  }
  getDriverInfo(){
    this.oneService.getDriver(this.driver._id).subscribe((data) => {
      if (!data.error) {
        localStorage.removeItem('driver');
        localStorage.setItem('driver', JSON.stringify(data.message));
        this.driver = data.message;
        this.kitchenIds = [];
        this.kitchenIds = data.message.kitchensallow;
      }
    });
  }

  submitRestaurant(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
     var obj = {
      id: this.driver._id,
      kitchensallow: this.kitchenIds
    }
    this.oneService.updateRestaurantId(obj).subscribe((data) => {
      if (!data.error) {
        this.getDriverInfo();
        loading.dismiss();
        this.getToast('Chefs requested successfully! Please wait for admin approval');
        this.navCtrl.setRoot(OrderPage);
      }else{
        loading.dismiss();
        this.getToast('Unable to request Chefs. Please try again Later!');
      }
    },(err)=>{
      loading.dismiss();
      this.getToast('Unable to Request Chefs! Please check your Internet connection.')
    });
  }

  updataRestaurant(id){
    let obj ={resId:id,status:false};

    var index = this.kitchenIds.findIndex(x => x.resId == id);
    if (index == -1){
      this.kitchenIds.push(obj);
    }else{
      this.kitchenIds.splice(index, 1);
    }
    
  }

  public getgeo(lat, long) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, long);
    return new  Promise((resolve,reject) =>{
     geocoder.geocode({ latLng: latlng }, (results, status) => {
      console.log("geocoder");
      
    //   /*this.subscription.unsubscribe();*/
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          console.log(results);
           let obj = {};
          if (results[0].address_components.length > 0) {
             results[0].address_components.forEach(comp => {
               if (comp.types.length > 0) {
                for (var i = 0; i < comp.types.length; i++) {
                 if (comp.types[0] == "country") {
                     obj = { countryname: comp.long_name };
                     console.log(comp.long_name);
                     resolve(comp.long_name);
                  //  this.ms6Service.getIdByCountry(obj).subscribe(item => {
                  //    location = item;
                  //    console.log(item)
                  //  },(err =>{
                  //   console.log(err,'Error in getting LOCation')
                  //  }));

                 }
                 }
              }
             });
           }
        } else {
          reject();
      }
     } else {
      reject();
     }
     });
  });
}




  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top' //top,middle,bottom
    });
    toast.present();
  }

}
 