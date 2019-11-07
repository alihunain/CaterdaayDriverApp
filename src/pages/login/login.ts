import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { OrderPage } from '../order/order';
import { SignupPage } from '../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OneService } from './../../services/one.service';


@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username: any;
	password: any;
	driver:any;
	loginForm: FormGroup;
	public type = "password";
	public showPass = false;
	emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	passwordp: any;
	formErrors = {
		username: "",
		password: ""
	};
	validationMessages = {
		username: {
			required: "Email is required.",
			pattern : "Enter a valid Email ID"
		},
		password: {
			required: "Password is required."
		}
	};

	constructor(
	    private oneService: OneService,
	    public loadingCtrl: LoadingController,
	    private lf: FormBuilder,
	    public toastCtrl: ToastController,
	    public events: Events,
		public navCtrl: NavController,
		public navParams: NavParams
		) {

		this.loginForm = this.lf.group({
		    username: ["", [Validators.required, Validators.pattern(this.emailp)]],
	    	password: ["", [Validators.required]]
	    });
	    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
	    this.onValueChanged();
	}


	showPassword() {
		this.showPass = !this.showPass;
		if (this.showPass) {
			this.type = "text";
		} else {
			this.type = "password";
		}
	}
	onValueChanged(data?: any) {
		if (!this.loginForm) {
			return;
		}
		const form = this.loginForm;
		for (const field in this.formErrors) {
			this.formErrors[field] = "";
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + " ";
				}
			}
		}
	}

	goToFogetPage() {
		this.navCtrl.push(ForgetPasswordPage);
	}
	goToSignupPage() {
		this.navCtrl.push(SignupPage);
	}
	doLogin() {
		let loading = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loading.present();
		this.oneService.login(this.loginForm.value).subscribe(	data => {
				loading.dismiss();
				if (!data.error) {
					localStorage.setItem("driver", JSON.stringify(data.data));
					this.driver = data.data;
					if (localStorage.getItem('driver')) {
						this.driver = JSON.parse(localStorage.getItem('driver'));
						if (typeof this.driver.kitchensallow == 'undefined') {
						  this.driver.kitchensallow = [];
						}
					  }
					 let allowedResturants=   this.driver.kitchensallow ;
					 console.log("navCtrl");
					 this.navCtrl.setRoot(OrderPage);
	//  this.oneService.getRestaurants().subscribe( (resturants)=>{
						//   console.log(resturants,'Resturants');
						// 	console.log(this.driver,"Driver");
						// 	let zipCodes = this.driver.zip.split(',');
						// 	console.log(zipCodes[0]);
						// 	for(let j = 0 ; j < zipCodes.length ; j++){
						//   for(let i = 0 ; i < resturants.message.length ; i ++ ){
						// 		console.log(this.driver.zip , resturants.message[i].zipcode , this.driver.zip)
						// 	if(zipCodes[j] && resturants.message[i].zipcode && resturants.message[i].zipcode.toLowerCase() == zipCodes[j].toLowerCase() ){
						// 		console.log("PUSHED");
						// 		allowedResturants.push({
						// 		  resId:resturants.message[i]._id,
						// 		  status:true
						// 		});
						// 	}
						// }
						// 	}
							// console.log(allowedResturants,this.driver.kitchensallow)
						  // if(allowedResturants != this.driver.kitchensallow){
							// console.log(allowedResturants, 'Allowed Resturant');
							// this.driver.kitchensallow  = allowedResturants;
						  //   this.oneService.editDriver({
							//   _id:this.driver._id,
							//   kitchensallow:allowedResturants
							// }).subscribe((res)=>{
							//   console.log(res);
							//   this.driver  = res.message;
							//   console.log("set Driver");
							//   localStorage.setItem('driver',JSON.stringify(res.message));
							//   console.log("navCtrl");
							//   this.navCtrl.setRoot(OrderPage);
							// },(err)=>{
							//   console.log(err);
							//   console.log("navCtrl");
							//   this.navCtrl.setRoot(OrderPage);
							// });
							// }
				

					
					  // },(err)=>{
						//   console.log(err);
						//   console.log("navCtrl");
						//   this.navCtrl.setRoot(OrderPage);
					  // });
					//   console.log("navCtrl");
					// this.navCtrl.setRoot(OrderPage);

					this.events.publish("user:created");
				} else {
					this.getToast(data.data);
				}
			},
			err => {
				loading.dismiss();
				this.getToast("Something went Wrong");
			}
			);
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
