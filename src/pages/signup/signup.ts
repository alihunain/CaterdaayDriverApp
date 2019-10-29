import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController ,ToastController, ActionSheetController, Platform, AlertController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OneService } from './../../services/one.service';
import { TwoService } from './../../services/two.service';
import * as globalVariable from "./../../services/global";
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";

/*import { AuthService } from '../../services/auth.service';*/
declare var cordova: any;
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public driver:any;
  public type = 'password';
  public ctype = 'password';
  public showPass = false;
  public cshowPass = false;
  loading: any;
  URL: any = globalVariable.url1 + "upload/";
  ImgURL: any = globalVariable.url1+ "uploads/";
  matchPassword: any;
  signupForm: FormGroup;
  zipRE: any = /^\S+[a-z\d\-_\s]+$/i;
  emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  passwordp: any;
  formErrors = {
    'email': '',
    'password': '',
    'cpassword': '',
    'zip':''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'pattern': 'Invalid Email.'
    },
    'password': {
      'required': 'PLease enter Password.'
    },
    'cpassword': {
      'required': 'Please enter Confirm password.',
    },
    'zip':{
      'required':'Zip is required',
      'pattern':'Invalid Zip Code'
    }
  };
  lastDriverLicenseImage: any;
  lastVoidChequeImage: any;
  lastImage: any;
  lastCarNumberPlate: any;
  lastCarInsurance: any;
  lastPoliceCert: any;
  constructor(
    public modalCtrl: ModalController,
    private transfer: Transfer,
    private file: File,
    public platform: Platform,
    private filePath: FilePath,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private oneService: OneService,
    private twoService: TwoService,
    public loadingCtrl: LoadingController,
    private lf: FormBuilder,
    private alertCtrl: AlertController,
    
    /*private auth: AuthService,*/
    public toastCtrl: ToastController
  ) {
    this.signupForm = this.lf.group({
      username: [],
      email: ['', [Validators.required, Validators.pattern(this.emailp)]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      ByBank:[false],
      ByCheque:[false],
      paymentmethod:['',Validators.required],
      AccountName:['', Validators.required],
      AccountNumber:['',Validators.required],
      BankName:['',Validators.required],
      license: ["",Validators.required],
      policecertificate: ["",Validators.required],
      carinsurance: ["",Validators.required],
      carnumberplate: ["",Validators.required],
      voidcheque: ["",Validators.required],
      zip:["", [Validators.required, Validators.pattern(this.zipRE)]],
      termsAndCondition:[false,Validators.compose([Validators.pattern('true'), Validators.required])]
    });
    this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    this.twoService.getComplexity().subscribe(data => {
      if (!data.error) {
        this.passwordp = data.message[0].ownerpasscomplexity.regex;
        this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
      }
    });
  }
  public takePicture(sourceType,type) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      imagePath => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(correctPath,currentName,this.createFileName(),type);
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(correctPath,currentName,this.createFileName(),type);
        }
      },
      err => {
        this.presentToast("Error while selecting image.");
      }
    );
  }
  private copyFileToLocalDir(namePath, currentName, newFileName,type) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          if(type == 'profilePic'){
            this.lastImage = newFileName;
            this.uploadImage('profilePic');
          }else if (type == 'license'){
            this.lastDriverLicenseImage = newFileName;
            console.log(this.lastDriverLicenseImage,'139');
              this.uploadImage('driverLicenseImage');
          }else if (type == 'voidCheque'){
            this.lastVoidChequeImage = newFileName;
            console.log(this.lastVoidChequeImage);
            this.uploadImage('voidChequeImage');
          }else if (type == 'carNumberPlate'){
            this.lastCarNumberPlate = newFileName;
            console.log(this.lastCarNumberPlate,'157');
              this.uploadImage('carNumberPlateImage');
          }else if (type == 'carInsurance'){
            this.lastCarInsurance = newFileName;
            console.log(this.lastCarInsurance,'161');
              this.uploadImage('carInsuranceImage');
          }else if (type == 'policeCertificate'){
            this.lastPoliceCert = newFileName;
            console.log(this.lastPoliceCert,'165');
              this.uploadImage('policeCertificateImage');
          }
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(type) {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    return  new Promise((resolve,reject) =>{
      var url = this.URL;
  
      // File for Upload
      if(type == 'profilePic'){
        var targetPath = this.pathForImage(this.lastImage);
        var filename = this.lastImage;
      } else if (type == 'driverLicenseImage') {
        var targetPath = this.pathForImage(this.lastDriverLicenseImage);
        var filename = this.lastDriverLicenseImage;
        console.log(filename);
      } else if (type == 'voidChequeImage'){
        
        var targetPath = this.pathForImage(this.lastVoidChequeImage);
        var filename = this.lastVoidChequeImage;
        console.log(filename,this.lastVoidChequeImage);
      }else if (type == 'carNumberPlateImage'){
        var targetPath = this.pathForImage(this.lastCarNumberPlate);
        var filename = this.lastCarNumberPlate;
      }else if (type == 'carInsuranceImage'){
        var targetPath = this.pathForImage(this.lastCarInsurance);
        var filename = this.lastCarInsurance;
      }else if (type == 'policeCertificateImage'){
        var targetPath = this.pathForImage(this.lastPoliceCert);
        var filename = this.lastPoliceCert;
      }
  
      // File name only
     // var filename = this.lastImage;
  
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { fileName: filename }
      };
  
      const fileTransfer: TransferObject = this.transfer.create();
     
      // Use the FileTransfer to upload the image
      let Imagetype = type;
      console.log(Imagetype,'435');
      fileTransfer.upload(targetPath, url, options).then(
        data => {
          if(Imagetype == 'profilePic'){
            this.driver.image = JSON.parse(data.response).filename;
            this.signupForm.controls["image"].setValue(
            JSON.parse(data.response).filename
          );
        
      //    this.loading.dismiss();
       //   this.driver.image = JSON.parse(data.response).filename;
       //   this.EditInfo();
          }
          if (Imagetype == 'driverLicenseImage')
          {
            console.log(Imagetype,'450');
           // this.driver.license = JSON.parse(data.response).filename;
            
            this.signupForm.controls["license"].setValue(
              JSON.parse(data.response).filename
            );
          }
          if(Imagetype == 'voidChequeImage'){
            console.log(Imagetype,'457');
         //   this.driver.voidcheque = JSON.parse(data.response).filename;
            this.signupForm.controls["voidcheque"].setValue(
              JSON.parse(data.response).filename
            );
            
          }
          if(Imagetype == 'carNumberPlateImage'){
            console.log(Imagetype,'457');
         //   this.driver.voidcheque = JSON.parse(data.response).filename;
            this.signupForm.controls["carnumberplate"].setValue(
              JSON.parse(data.response).filename
            );
            
          }
          if(Imagetype == 'carInsuranceImage'){
            console.log(Imagetype,'457');
         //   this.driver.voidcheque = JSON.parse(data.response).filename;
            this.signupForm.controls["carinsurance"].setValue(
              JSON.parse(data.response).filename
            );
            
          }
          if(Imagetype == 'policeCertificateImage'){
            console.log(Imagetype,'457');
         //   this.driver.voidcheque = JSON.parse(data.response).filename;
            this.signupForm.controls["policecertificate"].setValue(
              JSON.parse(data.response).filename
            );
            
          }
          loading.dismiss();
          resolve(true);
        },
        err => {
          console.log(err);
          loading.dismiss();
          this.presentToast("Error while uploading file.");
          reject(false);
        }
      );
      });
      // Destination URL
    }
    private presentToast(text) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top' //top,middle,bottom
      });
      toast.present();
    }
  
  public presentActionSheet(type) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,type);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA,type);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }
  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  cshowPassword() {
    this.cshowPass = !this.cshowPass;
    if(this.cshowPass){
      this.ctype = 'text';
    } else {
      this.ctype = 'password';
    }
  }
  setpasswordmessage(name) {
    if (name == 'simplepassword') {
      this.validationMessages.password['pattern'] = 'Password must contain min 8 Digits alphanumeric only';
    }

    if (name == 'medium') {
      this.validationMessages.password['pattern'] = 'TBD';
    }

    if (name == 'complex') {
      this.validationMessages.password['pattern'] = 'TBD';
    }

    if (name == 'none') {
      this.validationMessages.password['pattern'] = '';
    }
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  goToLoginPage() {
    this.navCtrl.pop();
  }
  presentTermsAndConditionAlert(){
    let modal = this.modalCtrl.create(TermsOfUse,{},{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
   // alert.present();
  }
  
  doSignup() {
    this.signupForm.controls['username'].setValue(this.signupForm.controls['email'].value)

    if (this.signupForm.value.password != this.signupForm.value.cpassword) {
      this.matchPassword = true;
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      console.log(this.signupForm.value,'sign values',this.signupForm.value.zip,this.signupForm.value.firstname);
      this.oneService.signup(this.signupForm.value).subscribe(
        (data) => {
          loading.dismiss();
          if (!data.error) {
            this.getToast('Registration Successful. Please wait for admin approval');
            this.navCtrl.pop();
          }else {
            this.getToast('Email already exist');
          }
        },
        (err) => {
          loading.dismiss();
          this.getToast('Something went wrong!. Please Try Again Later');
        }
      );
    }
  }
  drivingLicense(){
    let path : any;
    if (typeof this.lastDriverLicenseImage == 'undefined' || this.lastDriverLicenseImage == null) {
        path = 'assets/imgs/Driverlicense-512.png'
    }else{
      path = cordova.file.dataDirectory + this.lastDriverLicenseImage;
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  carNumberPlate(){
    let path : any;
    if (typeof this.lastCarNumberPlate == 'undefined' || this.lastCarNumberPlate == null) {
        path = 'assets/imgs/numberplate.png'
    }else{
      path = cordova.file.dataDirectory + this.lastCarNumberPlate;
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  policeCertificate(){
    let path : any;
    if (typeof this.lastPoliceCert == 'undefined' || this.lastPoliceCert == null) {
        path = 'assets/imgs/policeCert.png'
    }else{
      path = cordova.file.dataDirectory + this.lastPoliceCert;
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  carInsurance(){
    let path : any;
    if (typeof this.lastCarInsurance == 'undefined' || this.lastCarInsurance == null) {
        path = 'assets/imgs/carInsurance.png'
    }else{
      console.log('car Insurance',this.lastCarInsurance);
      path = cordova.file.dataDirectory + this.lastCarInsurance;
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;





  }
  drivingVoid(){
    let path : any;
    if (typeof this.lastVoidChequeImage == 'undefined' || this.lastVoidChequeImage == null) {
     
        path = 'assets/imgs/voidcheque.png'

    }else{
      path = cordova.file.dataDirectory + this.lastVoidChequeImage;
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top' //top,middle,bottom
    });
    toast.present();
  }
}
@Component({
  selector: 'page-term',
  templateUrl: 'termofuse.html',
})
export class TermsOfUse {
  constructor(public viewCtrl: ViewController){}
  viewDismiss(){
    this.viewCtrl.dismiss();
  }

}