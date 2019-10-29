import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "./global";


@Injectable()
export class SixService {

    constructor(private http: Http) { }

    getAllCuisines() {
        return this.http.get(globalVariable.url2+'cuisines/')
        .map(
            (response: Response) => response.json()
        );
    }

    getIdByCountry(data){
        return this.http.post(globalVariable.url2+'getcountryid',data)
        .map(
            (response: Response) => response.json()
        );
    }

    getCountryName(){
        return this.http.get("http://freegeoip.net/json/").map((response: Response) => response.json());
    }

    getCountrylist(){
        return this.http.get(globalVariable.url2+'countrylist')
        .map(
            (response: Response) => response.json()
        );
    }

    getDeliveryCharges(){
        return this.http.get(globalVariable.url2+'deliverycharges')
        .map(
            (response: Response) => response.json()
        );
    }

    
    getcitylist(data){
        return this.http.post(globalVariable.url2+'getcitylist',data)
        .map(
            (response: Response) => response.json()
            );
    }

    getComplexity() {
        return this.http.get(globalVariable.url2 + 'users/complexity')
            .map((response: Response) => response.json());
    }

    getOneUrl(url){
        return this.http.get(globalVariable.url2+'pages/'+url)
        .map(
            (response: Response) => response.json()
        );
    }

}