import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, ActionSheetController, NavParams, LoadingController, ToastController, AlertController, Platform } from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { imageUrlupload } from "./../../services/global";
import { OneService } from "./../../services/one.service";
import { TwoService } from "./../../services/two.service";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { LoginPage } from '../login/login';
import * as globalVariable from "./../../services/global";
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
declare var google: any;
declare var cordova: any;

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  driver: any;
  ImgURL: any = globalVariable.url1+ "uploads/";
  /*ImgURL: 'http://mealdaay.com:4014/uploads/';*/
  lat: any;
  lng: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    if (JSON.parse(localStorage.getItem("driver"))) {
      this.driver = JSON.parse(localStorage.getItem("driver"));
    //  this.driver.paymentmethod =  'ByBank';
      console.log(this.driver);
    }
  }

  ionViewDidLoad() {}

  ionViewDidEnter() {
    if (JSON.parse(localStorage.getItem("driver"))) {
      this.driver = JSON.parse(localStorage.getItem("driver"));
      console.log(this.driver, 'Profile k nadr driver');
    }

    setTimeout(() => {
      this.loadMap();
    }, 1000);
  }

  driverImage(img){
    let path : any;
    if (typeof img == 'undefined' || img == null) {
      path = 'assets/imgs/profile.jpg'
    }else{
      path = this.ImgURL + img;
    }
    return path;
  }
  carNumberPlate(img){
    let path : any;
    if(typeof img == 'undefined' || img == null){
        path = 'assets/imgs/numberplate.png'
    }else{
      path = this.ImgURL + img;
    }
    return path;
  }
  policeCertificate(img){
    let path : any;
    if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/policeCert.png'
    }else{
      path = this.ImgURL + img;
    }
    return path;
  }
  carInsurance(img){
    let path : any;
    if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/carInsurance.png'
    }else{
      path = this.ImgURL + img;
    }
    return path;
  }

  loadMap() {
    var options = {
      center: new google.maps.LatLng(this.driver.lat, this.driver.lng),
      zoom: 12
    };
    if(this.driver.address){
    var map = new google.maps.Map(document.getElementById("map"),options);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.driver.lat, this.driver.lng),
      map: map
    });
  }
  }
  goToPassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
  
  goToEdit() {
    this.navCtrl.push(ProfileEditPage);
  }

}

// edit profile component
@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage {
  zipRE: any = /^\S+[a-z\d\-_\s]+$/i;
  driver: any;
  editlat: any;
  editlng: any;
  loading: any;
  lastImage: string = null;
  lastVoidChequeImage: string = null;
  lastDriverLicenseImage: string = null;
  editForm: FormGroup;
  URL: any = globalVariable.url1 + "upload/";
  ImgURL: any = globalVariable.url1+ "uploads/";
  firestore = firebase.database().ref('/drivers');

  public uploader: FileUploader = new FileUploader({
    url: this.URL,
    itemAlias: "file"
  });
  public phoneRegex = /^[+]?\d+(\.\d+)?$/;
  formErrors = {
    firstname: "",
    lastname: "",
    phoneNo: "",
    vehicleType: "",
    vehicleName: "",
    vehicleNo: ""
  };
  validationMessages = {
    firstname: {
      required: "Please fill this field."
    },
    lastname: {
      required: "Please fill this field."
    },
    phoneNo: {
      required: "Phone no. is required.",
      pattern: "Phone no. should contain numbers only."
    },
    vehicleType: {
      required: "Vehicle type is required."
    },
    vehicleName: {
      required: "Vehicle name is required."
    },
    vehicleNo: {
      required: "Vehicle no. is required."
    }
  };
  lastCarNumberPlate: string  = null;
  lastpoliceCertificate: string  = null;
  lastcarInsurance: string  = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lf: FormBuilder,
    private oneService: OneService,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform,
    public afd: AngularFireDatabase,
  ) {
    this.uploader.onAfterAddingFile = file => {
      console.log("here it is calling");
      this.loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loading.present();
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.editForm.controls["image"].setValue(JSON.parse(response).filename);

      this.loading.dismiss();
    };
    this.editForm = this.lf.group({
      _id: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: [{value : '' , disabled : true}],
      phoneNo: ["", [Validators.required, Validators.pattern(this.phoneRegex)]],
      vehicleType: ["", Validators.required],
      vehicleName: ["", Validators.required],
      vehicleNo: ["", Validators.required],
      image: ["",Validators.required],
      address: ["",Validators.required],
      license: ["",Validators.required],
      voidcheque: ["",Validators.required],
      AccountName:["", Validators.required],
      AccountNumber:["",Validators.required],
      paymentmethod:['',Validators.required],
      BankName:["",Validators.required],
      policecertificate:["",Validators.required],
      carinsurance:["",Validators.required],
      carnumberplate:["",Validators.required],
      ByCheque:[false],
      ByBank:[false],
      isactivated:[2,Validators.required],
      zip:["", [Validators.required, Validators.pattern(this.zipRE)]],
    });

    setTimeout(() => {
      this.placeAutocomplete();
    }, 1000);

    if (JSON.parse(localStorage.getItem("driver"))) {
      this.driver = JSON.parse(localStorage.getItem("driver"));
      this.editForm.patchValue(this.driver);
    }

    this.editForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }


  driverImage(img){
    let path : any;
    if (typeof this.lastImage == 'undefined' || this.lastImage == null) {
      if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/profile.jpg'
      }else{
        path = this.ImgURL + img;
      }
    }else{
      path = cordova.file.dataDirectory + this.lastImage;
     
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  drivingLicense(img){
    let path : any;
    if (typeof this.lastDriverLicenseImage == 'undefined' || this.lastDriverLicenseImage == null) {
      if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/Driverlicense-512.png'
      }else{
        path = this.ImgURL + img;
      }
    }else{
      path = cordova.file.dataDirectory + this.lastDriverLicenseImage;
  
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  
  drivingVoid(Cheque){
    let path : any;
    if (typeof this.lastVoidChequeImage == 'undefined' || this.lastVoidChequeImage == null) {
      if (typeof Cheque == 'undefined' || Cheque == null) {
        path = 'assets/imgs/voidcheque.png'
      }else{
        path = this.ImgURL + Cheque;
      }
    }else{
      
      path = cordova.file.dataDirectory + this.lastVoidChequeImage;
    
      
      console.log(path,'path')
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }

  carNumberPlate(img){
    let path : any;
    if (typeof this.lastCarNumberPlate == 'undefined' || this.lastCarNumberPlate == null) {
      if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/numberplate.png'
      }else{
        path = this.ImgURL + img;
      }
    }else{
      
      path = cordova.file.dataDirectory + this.lastCarNumberPlate;
   
      
      console.log(path,'path')
    }
    if(this.platform.is('ios')){
      path = path.replace(/^file:\/\//, '');
    }
    return path;
  }
  policeCertificate(img){
    let path : any;
    if (typeof this.lastpoliceCertificate == 'undefined' || this.lastpoliceCertificate == null) {
      if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/policeCert.png'
      }else{
        path = this.ImgURL + img;
      }
    }else{
      
      path = cordova.file.dataDirectory + this.lastpoliceCertificate;
      if(this.platform.is('ios')){
        path = path.replace(/^file:\/\//, '');
      }
      
      console.log(path,'path')
    }

    return path;
  }
  carInsurance(img){
    let path : any;
    if (typeof this.lastcarInsurance == 'undefined' || this.lastcarInsurance == null) {
      if (typeof img == 'undefined' || img == null) {
        path = 'assets/imgs/carInsurance.png'
      }else{
        path = this.ImgURL + img;
      }
    }else{
      
      path = cordova.file.dataDirectory + this.lastcarInsurance;
      if(this.platform.is('ios')){
        path = path.replace(/^file:\/\//, '');
      }
      
      console.log(path,'path')
    }

    return path;
  }


  placeAutocomplete() {
    let input = <HTMLInputElement>document.getElementById("addressautocomplete");
    if (typeof input != 'undefined' && input != null) {
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        var place = autocomplete.getPlace();
        this.editForm.controls["address"].setValue(place.formatted_address);
      });
    }
  }

  ionViewDidLoad() {}

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
        console.log(type,'type');
        console.log(imagePath,'iamge Path');
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
          console.log(currentName,'currentName',correctPath,'correntPath');
          this.copyFileToLocalDir(correctPath,currentName,this.createFileName(),type);
        }
      },
      err => {
        this.presentToast("Error while selecting image.");
      }
    );
  }
  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName,type) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          console.log("sucess");
          if(type == 'profilePic'){
            this.lastImage = newFileName;
            this.uploadImage('profilePic');
          }else if (type == 'license'){
            this.lastDriverLicenseImage = newFileName;
              this.uploadImage('driverLicenseImage');
          }else if (type == 'voidCheque'){
            this.lastVoidChequeImage = newFileName;
            this.uploadImage('voidChequeImage');
          }else if (type == 'carNumberPlate'){
            this.lastCarNumberPlate = newFileName;
            this.uploadImage('carNumberPlateImage');
          }
          else if (type == 'carInsurance'){
            this.lastcarInsurance = newFileName;
            this.uploadImage('carInsuranceImage');
          }
          else if (type == 'policeCertificate'){
            this.lastpoliceCertificate = newFileName;
            this.uploadImage('policeCertificateImage');
          }
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  profileUpdate() {
    let accountDeactivated = false;
    if( this.lastcarInsurance ||this.lastpoliceCertificate || this.lastCarNumberPlate ||this.lastDriverLicenseImage){
      accountDeactivated = true;
      this.editForm.controls["isactivated"].setValue(1);
    }
    this.oneService.getRestaurants().subscribe( (resturants)=>{
      let allowedResturants= [] ;
      console.log(resturants,'Resturants');
      console.log(this.driver,"Driver");
      let driverZip  = this.editForm.get('zip').value ; 
      let zipCodes = driverZip.split(',');
      console.log(zipCodes[0]);
      for(let j = 0 ; j < zipCodes.length ; j++){
      for(let i = 0 ; i < resturants.message.length ; i ++ ){
        console.log(this.driver.zip , resturants.message[i].zipcode , driverZip)
      if(zipCodes[j] && resturants.message[i].zipcode && resturants.message[i].zipcode.toLowerCase() == zipCodes[j].toLowerCase() ){
        console.log("PUSHED");
        allowedResturants.push({
          resId:resturants.message[i]._id,
          status:true
        });
      }
    }
      }
      console.log(allowedResturants,this.driver.kitchensallow)
      if(allowedResturants != this.driver.kitchensallow){
      console.log(allowedResturants, 'Allowed Resturant');
      this.driver.kitchensallow  = allowedResturants;
        this.oneService.editDriver({
        _id:this.driver._id,
        kitchensallow:allowedResturants
      }).subscribe((res)=>{
        console.log(res);
        this.driver  = res.message;
        console.log("set Driver");
        localStorage.setItem('driver',JSON.stringify(res.message));
        console.log("navCtrl");
      //  this.navCtrl.setRoot(OrderPage);
      this.EditInfo(accountDeactivated);
      },(err)=>{
        console.log(err);
     //   console.log("navCtrl");
      //  this.navCtrl.setRoot(OrderPage);
      this.EditInfo(accountDeactivated);
      });
      }else{
      console.log("navCtrl");
  //    this.navCtrl.setRoot(OrderPage);
  this.EditInfo(accountDeactivated);
      }
    },(err)=>{
      console.log(err);
      console.log("navCtrl");
     // this.navCtrl.setRoot(OrderPage);
     this.EditInfo(accountDeactivated);
    });
   
  //  let PromiseArray = [];
  //   if (typeof this.lastImage != 'undefined' && this.lastImage != null) {
  //     // this.uploadImage('profilePic');     
  //     PromiseArray.push(this.uploadImage('profilePic'));
  //   }  if  (typeof this.lastDriverLicenseImage != 'undefined' && this.lastDriverLicenseImage != null)
  //   {
  //     //this.uploadImage('driverLicenseImage'); 
  //     console.log("driverLicense");
  //     PromiseArray.push(this.uploadImage('driverLicenseImage'));
  //   }  if (typeof this.lastVoidChequeImage != 'undefined' && this.lastVoidChequeImage != null){
  //     //this.uploadImage('voidChequeImage');
  //     console.log("void"); 
  //     PromiseArray.push(this.uploadImage('voidChequeImage'));
  //   }
  //   if(PromiseArray.length > 0){
  //     this.loading = this.loadingCtrl.create({
  //       content: "Images is Uploading..."
  //     });
  //     Promise.all(PromiseArray).then(values =>{
  //       this.loading.dismiss();
  //       //   this.driver.image = JSON.parse(data.response).filename;
  //          this.EditInfo();
  //     });
  //   }
  //   else {
  //     this.EditInfo();
  //   }
  }
  checkDisbaled(){
    console.log(this.editForm.value);
  }
  EditInfo(accountDeactivated) {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
   
    this.oneService.editDriver(this.editForm.value).subscribe(data => {
      if (!data.error) {
        this.oneService.getDriver(JSON.parse(localStorage.getItem("driver"))._id).subscribe(data => {
          if (!data.error) {
            if(!accountDeactivated){
            localStorage.removeItem("driver");
            localStorage.setItem("driver", JSON.stringify(data.message));
            loading.dismiss();
            this.getToast("Profile updated successfully.");
            this.navCtrl.pop();
            }else{
              localStorage.removeItem("driver");
             // localStorage.setItem("driver", JSON.stringify(data.message));
              loading.dismiss();
              this.getToast("Profile updated Successful. Please wait for admin approval");
              this.afd.list(this.firestore).remove(this.driver._id);
              this.navCtrl.setRoot(LoginPage);
              this.navCtrl.popAll();
            }
          } else {
            this.getToast(data.message);
          }
        
        });
        
      }else{
        loading.dismiss();
        this.getToast('Something went wrong! Please try again');
      }
    },(err)=>{
      loading.dismiss();
      this.getToast('Unable to Update data! Please check your Internet connection.');
    });
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
    } else if (type == 'voidChequeImage'){
      var targetPath = this.pathForImage(this.lastVoidChequeImage);
      var filename = this.lastVoidChequeImage;
    }else if (type == 'carNumberPlateImage'){
      var targetPath = this.pathForImage(this.lastCarNumberPlate);
      var filename = this.lastCarNumberPlate;
    }else if (type == 'carInsuranceImage'){
      var targetPath = this.pathForImage(this.lastcarInsurance);
      var filename = this.lastcarInsurance;
    }else if (type == 'policeCertificateImage'){
      var targetPath = this.pathForImage(this.lastpoliceCertificate);
      var filename = this.lastpoliceCertificate;
    }

    // File name only
    var filename = this.lastImage;

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
          this.editForm.controls["image"].setValue(
          JSON.parse(data.response).filename
        );
      
    //    this.loading.dismiss();
     //   this.driver.image = JSON.parse(data.response).filename;
     //   this.EditInfo();
        }
        if (Imagetype == 'driverLicenseImage')
        {
          console.log(Imagetype,'450');
          this.driver.license = JSON.parse(data.response).filename;
          this.editForm.controls["license"].setValue(
            JSON.parse(data.response).filename
          );
        }
        if(Imagetype == 'voidChequeImage'){
          console.log(Imagetype,'457');
          this.driver.voidcheque = JSON.parse(data.response).filename;
          this.editForm.controls["voidcheque"].setValue(
            JSON.parse(data.response).filename
          );
          
        }
        if(Imagetype == 'carNumberPlateImage'){
          console.log(Imagetype,'457');
          this.driver.voidcheque = JSON.parse(data.response).filename;
          this.editForm.controls["voidcheque"].setValue(
            JSON.parse(data.response).filename
          );
          
        }
        if(Imagetype == 'carInsuranceImage'){
          console.log(Imagetype,'457');
          this.driver.voidcheque = JSON.parse(data.response).filename;
          this.editForm.controls["voidcheque"].setValue(
            JSON.parse(data.response).filename
          );
          
        }
        if(Imagetype == 'policeCertificateImage'){
          console.log(Imagetype,'457');
          this.driver.policecertificate = JSON.parse(data.response).filename;
          this.editForm.controls["policecertificate"].setValue(
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

  onValueChanged(data?: any) {
    if (!this.editForm) {
      return;
    }
    const form = this.editForm;
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

  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top' //top,middle,bottom
    });
    toast.present();
  }
}

// change password
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  passwordForm: FormGroup;
  passwordp: any;
  fulldetail: any;
  oldmatch: any;
  MutchPassword: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private twoService: TwoService,
    private oneService: OneService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private lf: FormBuilder
  ) {
    this.passwordForm = this.lf.group({
      _id: ["", Validators.required],
      oldpassword: ["", [Validators.required]],
      password: ["",Validators.required],
      confirmpassword: ["",Validators.required],
      matchpass: ["", Validators.required],
      oldmatch: ["", Validators.required]
    });
    this.fulldetail = JSON.parse(localStorage.getItem("driver"));
    this.passwordForm.controls["_id"].setValue(this.fulldetail._id);

    this.twoService.getComplexity().subscribe(data => {
      if (!data.error) {
        this.passwordp = data.message[0].ownerpasscomplexity.regex;
        this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);

        this.passwordForm.valueChanges.subscribe(data =>
          this.onValueChanged(data)
        );
        this.onValueChanged();
      }
    },(err)=>{
      this.getToast('Unable to proceed!. Please check your Internet connection')
    });
  }
  public oldpassword() {
    if (this.fulldetail.password == this.passwordForm.value.oldpassword) {
      this.passwordForm.controls["oldmatch"].setValue(true);
      this.oldmatch = false;
    } else {
      this.passwordForm.controls["oldmatch"].setValue("");
      this.oldmatch = true;
    }
  }
  public matchpassword() {
    if (
      this.passwordForm.value.password ==
      this.passwordForm.value.confirmpassword
    ) {
      this.passwordForm.controls["matchpass"].setValue(true);
      this.MutchPassword = false;
    } else {
      this.passwordForm.controls["matchpass"].setValue("");
      this.MutchPassword = true;
    }
  }
  setpasswordmessage(name) {
    if (name == "simplepassword") {
      this.validationMessages.password['pattern'] =
        "Password must contain min 8 Digits alphanumeric only";
    }

    if (name == "medium") {
      this.validationMessages.password['pattern'] = "TBD";
    }

    if (name == "complex") {
      this.validationMessages.password['pattern'] = "TBD";
    }

    if (name == "none") {
      this.validationMessages.password['pattern'] = "";
    }
  }
  formErrors = {
    oldpassword: "",
    password: ""
  };

  validationMessages = {
    oldpassword: {
      required: "Password is required."
    },
    password: {
      required: "Password is required."
    }
  };

  public onValueChanged(data?: any) {
    if (!this.passwordForm) {
      return;
    }
    const form = this.passwordForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
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

  
  passwordUpdate() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    var obj = {
      _id: this.fulldetail._id,
      newpassword: this.passwordForm.value.password,
      oldpassword: this.passwordForm.value.oldpassword
    };
    this.oneService.passwordEditDriver(obj).subscribe(data => {
      if (!data.error) {
        this.oneService
          .getDriver(JSON.parse(localStorage.getItem("driver"))._id)
          .subscribe(data => {
            if (!data.error) {
              localStorage.removeItem("driver");
              localStorage.setItem("driver", JSON.stringify(data.message));
              loading.dismiss();
              this.getToast("Password updated successfully.");
              this.navCtrl.pop();
            }
          });
      }else {
        this.getToast(data.message);
        loading.dismiss();
      }
    },(err)=>{
      loading.dismiss();
      this.getToast('Unable to proceed!. Please check your Internet connection')
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
