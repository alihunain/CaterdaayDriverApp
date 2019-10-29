import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { OneService } from './../../services/one.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  forgetForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public oneService: OneService,
    private lf: FormBuilder,
    public toastCtrl: ToastController
    ){
    this.forgetForm = this.lf.group({
      email: ['', [Validators.required, Validators.pattern(this.emailp)]]
    });
  }
  
  resetPassword(){
    this.oneService.forgetPasswordDriver(this.forgetForm.value).subscribe((data) => {
      if (!data.error) {
        this.navCtrl.pop();
        this.showAlert(data.message);
      }else{
        this.forgetForm.reset();
        this.showAlert(data.message);
      }
    },(err)=>{
      this.showAlert('Unable to load data. Please check your Internet connection');
    });
  }

  goToLoginPage(){
    this.navCtrl.pop();
  }

  showAlert(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top' //top,middle,bottom
    });
    toast.present();
  }
}
