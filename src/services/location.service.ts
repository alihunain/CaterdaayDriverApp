import { Injectable, NgZone } from '@angular/core';
/*import { BackgroundGeolocation } from '@ionic-native/background-geolocation';*/
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { OneService } from './one.service'; 

import { Diagnostic } from '@ionic-native/diagnostic';
declare var google: any;
@Injectable()
export class LocationService {
    driver : any;
    public watch: any;
    public lat: number = 0;
    public lng: number = 0;

    constructor(
        public zone: NgZone,
        private oneService: OneService,
        /*private backgroundGeolocation: BackgroundGeolocation,*/
        private geolocation: Geolocation,
        private diagnostic: Diagnostic
        ) {
        if (localStorage.getItem('driver')) {
            this.driver = JSON.parse(localStorage.getItem('driver'));
        }
    }

    startTracking() {

        let successCallback = (isAvailable) => {if(!isAvailable){this.diagnostic.requestLocationAuthorization()} };
        let errorCallback = (e) => console.error(e);

        this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);

        if (localStorage.getItem('driver')) {
            this.driver = JSON.parse(localStorage.getItem('driver'));
        }
        
        // Background Tracking

        /*let config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 2000
        };*/

        /*this.backgroundGeolocation.configure(config).subscribe((location) => {

            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;

                console.log(this.lat,this.lng);
                var obj = {
                    _id: this.driver['_id'],
                    lat: this.lat,
                    lng: this.lng
                }
                this.oneService.editDriver(obj).subscribe((data) => {
                    if (!data.error) {
                        localStorage.removeItem('driver');
                        localStorage.setItem('driver', JSON.stringify(data.message));
                    }
                });
            });
        }, (err) => {
            console.log("err");
            console.log(err);
        });

        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();*/


        // Foreground Tracking
        console.log("i am one time")
        this.watch = this.geolocation.watchPosition({maximumAge: 60000}).filter((p: any) => p.code === undefined).subscribe(async (position: Geoposition) => {
            // Run update inside of Angular's zone
            /*this.zone.run(() => {*/
                this.watch.unsubscribe();
            if (typeof position['coords'] != 'undefined') {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                let obj:any = {
                    _id: this.driver['_id'],
                    lat: this.lat,
                    lng: this.lng
                }
              const cityAndCountry:any = await this.getgeo(this.lat,this.lng);
              console.log(cityAndCountry);
                if(cityAndCountry.city){
                    obj.city = cityAndCountry.city;
                }
                if(cityAndCountry.country){
                    obj.country = cityAndCountry.country;
                }
                console.log(obj);
                if (parseFloat(this.driver['lat']) != this.lat || parseFloat(this.driver['lng']) != this.lng) {
                    this.oneService.editDriver(obj).subscribe((data) => {
                        if (!data.error) {
                            this.oneService.getDriver(this.driver._id).subscribe((data2)=>{
                                if (!data2.error) {
                                    localStorage.removeItem('driver');
                                    localStorage.setItem('driver', JSON.stringify(data2.message));
                                }
                            })
                        }
                    });
                }
            }
            /*});*/
        });
        let options = {
            frequency: 1000,
        };
        setInterval(()=>{
            console.log("check");
            this.watch = this.geolocation.watchPosition({maximumAge: 60000}).filter((p: any) => p.code === undefined).subscribe(async (position: Geoposition) => {
                // Run update inside of Angular's zone
                /*this.zone.run(() => {*/
                    this.watch.unsubscribe();
                if (typeof position['coords'] != 'undefined') {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    let obj:any = {
                        _id: this.driver['_id'],
                        lat: this.lat,
                        lng: this.lng
                    }
                  const cityAndCountry:any = await this.getgeo(this.lat,this.lng);
                  console.log(cityAndCountry);
                    if(cityAndCountry.city){
                        obj.city = cityAndCountry.city;
                    }
                    if(cityAndCountry.country){
                        obj.country = cityAndCountry.country;
                    }
                    console.log(obj);
                    if (parseFloat(this.driver['lat']) != this.lat || parseFloat(this.driver['lng']) != this.lng) {
                        this.oneService.editDriver(obj).subscribe((data) => {
                            if (!data.error) {
                                this.oneService.getDriver(this.driver._id).subscribe((data2)=>{
                                    if (!data2.error) {
                                        localStorage.removeItem('driver');
                                        localStorage.setItem('driver', JSON.stringify(data2.message));
                                    }
                                })
                            }
                        });
                    }
                }
                /*});*/
            });

        },180000)
    }

    stopTracking() {
        /*this.backgroundGeolocation.finish();*/
        this.watch.unsubscribe();
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
               let obj :any={};
              if (results[0].address_components.length > 0) {
                 results[0].address_components.forEach(comp => {
                   if (comp.types.length > 0) {
                    for (var i = 0; i < comp.types.length; i++) {
                     if (comp.types[0] == "country") {
                         obj.country  = comp.long_name;
                     }
                     if(comp.types[0] == 'locality'){
                        obj.city = comp.long_name;
                     }
                     }
                  }
                 });
                 resolve(obj);
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
    





}