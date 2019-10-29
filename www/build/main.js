webpackJsonp([0],{

/***/ 1061:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(afAuth, afs) {
        var _this = this;
        this.afAuth = afAuth;
        this.afs = afs;
        this.user = this.afAuth.authState
            .switchMap(function (user) {
            if (user) {
                return _this.afs.doc("users/" + user.uid).valueChanges();
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(null);
            }
        });
    }
    ////// OAuth Methods /////
    /*googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);
    }*/
    /*githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      return this.oAuthLogin(provider);
    }*/
    /*facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      return this.oAuthLogin(provider);
    }*/
    /*twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      return this.oAuthLogin(provider);
    }*/
    /*private oAuthLogin(provider: firebase.auth.AuthProvider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.notify.update('Welcome to Firestarter!!!', 'success');
          return this.updateUserData(credential.user);
        })
        .catch((error) => this.handleError(error) );
    }*/
    //// Anonymous Auth ////
    /*anonymousLogin() {
      return this.afAuth.auth.signInAnonymously()
        .then((user) => {
          this.notify.update('Welcome to Firestarter!!!', 'success');
          return this.updateUserData(user); // if using firestore
        })
        .catch((error) => {
          console.error(error.code);
          console.error(error.message);
          this.handleError(error);
        });
    }*/
    //// Email/Password Auth ////
    AuthService.prototype.emailSignUp = function (email, password, username) {
        var _this = this;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
            return _this.updateUserData(user, username); // if using firestore
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.emailLogin = function (email, password, username) {
        var _this = this;
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            return _this.updateUserData(user, username); // if using firestore
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    // Sends email allowing user to reset password
    /*resetPassword(email: string) {
      const fbAuth = firebase.auth();
  
      return fbAuth.sendPasswordResetEmail(email)
        .then(() => this.notify.update('Password update email sent', 'info'))
        .catch((error) => this.handleError(error));
    }*/
    /*signOut() {
      this.afAuth.auth.signOut().then(() => {
          this.router.navigate(['/']);
      });
    }*/
    // If error, console log and notify user
    AuthService.prototype.handleError = function (error) {
        console.error(error);
    };
    // Sets user data to firestore after succesful login
    AuthService.prototype.updateUserData = function (user, username) {
        var userRef = this.afs.doc("users/" + user.uid);
        var data = {
            uid: user.uid,
            email: user.email || null,
            displayName: username || 'nameless user'
        };
        return userRef.set(data);
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ThreeService = /** @class */ (function () {
    function ThreeService(http) {
        this.http = http;
    }
    ThreeService.prototype.getOrders = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["d" /* url3 */] + 'driverorders/', data).map(function (response) { return response.json(); });
    };
    ThreeService.prototype.getCustomersOrdersList = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["d" /* url3 */] + 'customerorder/' + id).map(function (response) { return response.json(); });
    };
    ThreeService.prototype.updateOrdersStatus = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["d" /* url3 */] + 'order/' + data.id, data).map(function (response) { return response.json(); });
    };
    ThreeService.prototype.getOrderById = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["d" /* url3 */] + 'order/' + id).map(function (response) { return response.json(); });
    };
    ThreeService.prototype.statusUpdate = function (data, id) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["d" /* url3 */] + "orderStatus/" + id, data).map(function (response) { return response.json(); });
    };
    ThreeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ThreeService);
    return ThreeService;
}());

//# sourceMappingURL=three.service.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TwoService = /** @class */ (function () {
    function TwoService(http) {
        this.http = http;
    }
    TwoService.prototype.getComplexity = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["c" /* url2 */] + 'users/complexity')
            .map(function (response) { return response.json(); });
    };
    TwoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], TwoService);
    return TwoService;
}());

//# sourceMappingURL=two.service.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forget_password_forget_password__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_order__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_one_service__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(oneService, loadingCtrl, lf, toastCtrl, events, navCtrl, navParams) {
        var _this = this;
        this.oneService = oneService;
        this.loadingCtrl = loadingCtrl;
        this.lf = lf;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.type = "password";
        this.showPass = false;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.formErrors = {
            username: "",
            password: ""
        };
        this.validationMessages = {
            username: {
                required: "Email is required.",
                pattern: "Enter a valid Email ID"
            },
            password: {
                required: "Password is required."
            }
        };
        this.loginForm = this.lf.group({
            username: ["", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern(this.emailp)]],
            password: ["", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required]]
        });
        this.loginForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    }
    LoginPage.prototype.showPassword = function () {
        this.showPass = !this.showPass;
        if (this.showPass) {
            this.type = "text";
        }
        else {
            this.type = "password";
        }
    };
    LoginPage.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = "";
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + " ";
                }
            }
        }
    };
    LoginPage.prototype.goToFogetPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__forget_password_forget_password__["a" /* ForgetPasswordPage */]);
    };
    LoginPage.prototype.goToSignupPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        this.oneService.login(this.loginForm.value).subscribe(function (data) {
            loading.dismiss();
            if (!data.error) {
                localStorage.setItem("driver", JSON.stringify(data.data));
                _this.driver = data.data;
                if (localStorage.getItem('driver')) {
                    _this.driver = JSON.parse(localStorage.getItem('driver'));
                    if (typeof _this.driver.kitchensallow == 'undefined') {
                        _this.driver.kitchensallow = [];
                    }
                }
                var allowedResturants_1 = [];
                _this.oneService.getRestaurants().subscribe(function (resturants) {
                    console.log(resturants, 'Resturants');
                    console.log(_this.driver, "Driver");
                    var zipCodes = _this.driver.zip.split(',');
                    console.log(zipCodes[0]);
                    for (var j = 0; j < zipCodes.length; j++) {
                        for (var i = 0; i < resturants.message.length; i++) {
                            console.log(_this.driver.zip, resturants.message[i].zipcode, _this.driver.zip);
                            if (zipCodes[j] && resturants.message[i].zipcode && resturants.message[i].zipcode.toLowerCase() == zipCodes[j].toLowerCase()) {
                                console.log("PUSHED");
                                allowedResturants_1.push({
                                    resId: resturants.message[i]._id,
                                    status: true
                                });
                            }
                        }
                    }
                    console.log(allowedResturants_1, _this.driver.kitchensallow);
                    if (allowedResturants_1 != _this.driver.kitchensallow) {
                        console.log(allowedResturants_1, 'Allowed Resturant');
                        _this.driver.kitchensallow = allowedResturants_1;
                        _this.oneService.editDriver({
                            _id: _this.driver._id,
                            kitchensallow: allowedResturants_1
                        }).subscribe(function (res) {
                            console.log(res);
                            _this.driver = res.message;
                            console.log("set Driver");
                            localStorage.setItem('driver', JSON.stringify(res.message));
                            console.log("navCtrl");
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__order_order__["b" /* OrderPage */]);
                        }, function (err) {
                            console.log(err);
                            console.log("navCtrl");
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__order_order__["b" /* OrderPage */]);
                        });
                    }
                    else {
                        console.log("navCtrl");
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__order_order__["b" /* OrderPage */]);
                    }
                }, function (err) {
                    console.log(err);
                    console.log("navCtrl");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__order_order__["b" /* OrderPage */]);
                });
                //   console.log("navCtrl");
                // this.navCtrl.setRoot(OrderPage);
                _this.events.publish("user:created");
            }
            else {
                _this.getToast(data.data);
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast("Something went Wrong");
        });
    };
    LoginPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\login\login.html"*/'<ion-content padding style="background: url(\'assets/imgs/bg.png\') center fixed;background-size: cover;">\n    \n    <ion-row>\n      <ion-col col-12 class="padding5rem-2rem">\n        <img src="assets/imgs/MealDaay-small.png" class="logo h-center ">\n      </ion-col>\n    </ion-row>\n\n    <ion-list no-margin>\n      <form role="form" [formGroup]="loginForm" (ngSubmit)="doLogin()">\n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input autocapitalize="off" type="text" formControlName="username"></ion-input>\n        </ion-item>\n        <div *ngIf="formErrors.username" class="alert alert-danger mt-2">\n          {{ formErrors.username }}\n        </div>\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="{{type}}" formControlName="password"></ion-input>\n          <button class="hideshow" *ngIf="!showPass" ion-button clear type="button" color="light" item-right (click)="showPassword()">Show</button>\n          <button class="hideshow" *ngIf="showPass" ion-button clear type="button" color="light" item-right (click)="showPassword()">Hide</button>\n        </ion-item>\n        <div *ngIf="formErrors.password" class="alert alert-danger mt-2">\n          {{ formErrors.password }}\n        </div>\n        <button ion-button full class="mt-3" color="secondary" [disabled]="!loginForm.valid">Login</button>\n      </form>\n    </ion-list>\n\n    <ion-row>\n      <ion-col col-8 text-left>\n\n        <a class="colorWhite" no-padding padding-horizontal (click)="goToFogetPage()">Fogrot Password ?</a>\n      </ion-col>\n      <ion-col col-4 text-right>\n\n        <a class="colorWhite" no-padding padding-horizontal (click)="goToSignupPage()">Sign up</a>\n      </ion-col>\n    </ion-row>\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 272;

/***/ }),

/***/ 317:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 317;

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FourService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FourService = /** @class */ (function () {
    function FourService(http) {
        this.http = http;
    }
    FourService.prototype.getCustomers = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["e" /* url4 */] + 'customers/' + id).map(function (response) { return response.json(); });
    };
    FourService.prototype.getCustomersOrders = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["e" /* url4 */] + 'customers/multiple', data).map(function (response) { return response.json(); });
    };
    FourService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], FourService);
    return FourService;
}());

//# sourceMappingURL=four.service.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProfilePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProfileEditPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_two_service__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload_ng2_file_upload__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_file_upload_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_transfer__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ImgURL = __WEBPACK_IMPORTED_MODULE_11__services_global__["b" /* url1 */] + "uploads/";
        if (JSON.parse(localStorage.getItem("driver"))) {
            this.driver = JSON.parse(localStorage.getItem("driver"));
            //  this.driver.paymentmethod =  'ByBank';
            console.log(this.driver);
        }
    }
    ProfilePage.prototype.ionViewDidLoad = function () { };
    ProfilePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (JSON.parse(localStorage.getItem("driver"))) {
            this.driver = JSON.parse(localStorage.getItem("driver"));
            console.log(this.driver, 'Profile k nadr driver');
        }
        setTimeout(function () {
            _this.loadMap();
        }, 1000);
    };
    ProfilePage.prototype.driverImage = function (img) {
        var path;
        if (typeof img == 'undefined' || img == null) {
            path = 'assets/imgs/profile.jpg';
        }
        else {
            path = this.ImgURL + img;
        }
        return path;
    };
    ProfilePage.prototype.carNumberPlate = function (img) {
        var path;
        if (typeof img == 'undefined' || img == null) {
            path = 'assets/imgs/numberplate.png';
        }
        else {
            path = this.ImgURL + img;
        }
        return path;
    };
    ProfilePage.prototype.policeCertificate = function (img) {
        var path;
        if (typeof img == 'undefined' || img == null) {
            path = 'assets/imgs/policeCert.png';
        }
        else {
            path = this.ImgURL + img;
        }
        return path;
    };
    ProfilePage.prototype.carInsurance = function (img) {
        var path;
        if (typeof img == 'undefined' || img == null) {
            path = 'assets/imgs/carInsurance.png';
        }
        else {
            path = this.ImgURL + img;
        }
        return path;
    };
    ProfilePage.prototype.loadMap = function () {
        var options = {
            center: new google.maps.LatLng(this.driver.lat, this.driver.lng),
            zoom: 12
        };
        if (this.driver.address) {
            var map = new google.maps.Map(document.getElementById("map"), options);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.driver.lat, this.driver.lng),
                map: map
            });
        }
    };
    ProfilePage.prototype.goToPassword = function () {
        this.navCtrl.push(ChangePasswordPage);
    };
    ProfilePage.prototype.goToEdit = function () {
        this.navCtrl.push(ProfileEditPage);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-profile",template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Profile</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content no-padding>\n\n  <div *ngIf="driver">\n\n\n\n\n\n    <div class="jumbotron py-5 mb-0 h-90px bg-success rounded-0">\n\n    </div>\n\n    <ion-row class="profile-area borderb-1">\n\n      <ion-col col-12 text-center>\n\n        <img class="profile-img rounded-circle"  style="object-fit: cover;" [src]="driverImage(driver.image)">\n\n        <h3 class="text-capitalize" ion-text color="dark">{{driver.firstname}} {{driver.lastname}}</h3>\n\n      </ion-col>\n\n      <button ion-button color="light" class="edit-button" small outline (click)="goToEdit()">Edit</button>\n\n    </ion-row>\n\n\n\n\n\n    \n\n    <ion-grid>\n\n      <ion-row class="borderb-1 py-2">\n\n        <ion-col col-4>\n\n          <h5 ion-text color="dark" no-margin>\n\n            <ion-icon name="mail"></ion-icon> &nbsp; Email </h5>\n\n        </ion-col>\n\n        <ion-col col-8 text-right>\n\n          <h5 ion-text color="gray" no-margin>{{driver.email}}</h5>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="borderb-1 py-2">\n\n          <ion-col col-6>\n\n            <h5 ion-text color="dark" no-margin>\n\n              <ion-icon name="car"></ion-icon> &nbsp;Zip code</h5>\n\n          </ion-col>\n\n          <ion-col col-6 text-right>\n\n            <h5 ion-text color="gray" no-margin >{{driver.zip }}</h5>\n\n            <h5 ion-text color="gray" no-margin *ngIf="!driver.zip">----</h5>\n\n          </ion-col>\n\n        </ion-row>\n\n      <ion-row class="borderb-1 py-2">\n\n        <ion-col col-4>\n\n          <h5 ion-text color="dark" no-margin>\n\n            <ion-icon name="call"></ion-icon> &nbsp; Mobile No. </h5>\n\n        </ion-col>\n\n        <ion-col col-8 text-right>\n\n          <h5 ion-text color="gray" no-margin *ngIf="driver.phoneNo">{{driver.phoneNo}}</h5>\n\n          <h5 ion-text color="gray" no-margin *ngIf="!driver.phoneNo">----</h5>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="borderb-1 py-2">\n\n        <ion-col col-6>\n\n          <h5 ion-text color="dark" no-margin>\n\n            <ion-icon name="car"></ion-icon> &nbsp; Vehicle Type </h5>\n\n        </ion-col>\n\n        <ion-col col-6 text-right>\n\n          <h5 ion-text color="gray" no-margin *ngIf="driver.vehicleType">{{driver.vehicleType}}</h5>\n\n          <h5 ion-text color="gray" no-margin *ngIf="!driver.vehicleType">----</h5>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="borderb-1 py-2">\n\n        <ion-col col-6>\n\n          <h5 ion-text color="dark" no-margin>\n\n            <ion-icon name="car"></ion-icon> &nbsp; Vehicle Name </h5>\n\n        </ion-col>\n\n        <ion-col col-6 text-right>\n\n          <h5 ion-text color="gray" no-margin *ngIf="driver.vehicleName ">{{driver.vehicleName }}</h5>\n\n          <h5 ion-text color="gray" no-margin *ngIf="!driver.vehicleName ">----</h5>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="borderb-1 py-2">\n\n        <ion-col col-6>\n\n          <h5 ion-text color="dark" no-margin>\n\n            <ion-icon name="car"></ion-icon> &nbsp; Vehicle No. </h5>\n\n        </ion-col>\n\n        <ion-col col-6 text-right>\n\n          <h5 ion-text color="gray" no-margin *ngIf="driver.vehicleNo ">{{driver.vehicleNo }}</h5>\n\n          <h5 ion-text color="gray" no-margin *ngIf="!driver.vehicleNo ">----</h5>\n\n        </ion-col>\n\n      </ion-row>\n\n  \n\n      <ion-row class="borderb-1 py-2">\n\n        <ion-col col-4>\n\n          <h5 ion-text color="dark" no-margin>\n\n            <ion-icon name="pin"></ion-icon> &nbsp;Address </h5>\n\n        </ion-col>\n\n        <ion-col col-8 text-right>\n\n          <h5 ion-text color="gray" no-margin *ngIf="driver.address">{{driver.address}}</h5>\n\n          <h5 ion-text color="gray" no-margin *ngIf="!driver.address">----</h5>\n\n        </ion-col>\n\n        <ion-col *ngIf="driver.address">\n\n          <div id="map" style="width:100%;height:200px;background:gainsboro"></div>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n\n\n\n\n\n\n\n\n      <label  style="margin-top: 25%;">* Payout Information</label>\n\n            <ion-list radio-group >\n\n                <div style="width:40%;float:left">\n\n                  \n\n                    <ion-item  *ngIf="driver.paymentmethod == \'ByBank\'">\n\n                        <ion-label>By Bank </ion-label>\n\n                        <ion-radio value="ByBank" color="primary"  checked="true"></ion-radio >\n\n                        \n\n                    </ion-item>\n\n                    <ion-item  *ngIf="driver.paymentmethod != \'ByBank\'">\n\n                      <ion-label>By Bank </ion-label>\n\n                      <ion-radio value="ByBank" disabled="true" color="primary" checked="false"></ion-radio >\n\n                      \n\n                  </ion-item>\n\n                </div>\n\n                <div style="width:40%;float:right;margin-left: 10%">\n\n                    <ion-item *ngIf="driver.paymentmethod == \'ByCheque\'">\n\n                        <ion-label>By Cheque</ion-label>\n\n                        <ion-radio  value="ByCheque" color="primary" checked="true"></ion-radio >\n\n                    </ion-item>\n\n                    <ion-item  *ngIf="driver.paymentmethod != \'ByCheque\'">\n\n                      <ion-label>By Cheque</ion-label>\n\n                      <ion-radio disabled="true" value="ByCheque" color="primary" checked="false"></ion-radio >\n\n                  </ion-item>\n\n                </div> \n\n            </ion-list>\n\n            <ion-row class="borderb-1 py-2">\n\n              <ion-col col-7>\n\n                <h5 ion-text color="dark" no-margin>\n\n                  <ion-icon name="mail"></ion-icon> &nbsp; Account Holder Name:  </h5>\n\n              </ion-col>\n\n              <ion-col col-5 text-right>\n\n                <h5 ion-text color="gray" no-margin>{{driver.AccountName}}</h5>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row class="borderb-1 py-2">\n\n              <ion-col col-7>\n\n                <h5 ion-text color="dark" no-margin>\n\n                  <ion-icon name="mail"></ion-icon> &nbsp; Account Number: </h5>\n\n              </ion-col>\n\n              <ion-col col-5 text-right>\n\n                <h5 ion-text color="gray" no-margin>{{driver.AccountNumber}}</h5>\n\n              </ion-col>\n\n            </ion-row>\n\n\n\n\n\n            <ion-row class="borderb-1 py-2">\n\n              <ion-col col-4>\n\n                <h5 ion-text color="dark" no-margin>\n\n                  <ion-icon name="mail"></ion-icon> &nbsp; Bank  Name: </h5>\n\n              </ion-col>\n\n              <ion-col col-8 text-right>\n\n                <h5 ion-text color="gray" no-margin>{{driver.BankName}}</h5>\n\n              </ion-col>\n\n            </ion-row>\n\n\n\n\n\n            <ion-row class="profile-area borderb-1" style="margin-top:0px !important;">\n\n              <ion-col col-12 text-center>\n\n                <img class="profile-img rounded-circle"  style="object-fit: cover;" width="100px" height="100px" [src]="driverImage(driver.voidcheque)">\n\n                <h3 class="text-capitalize" ion-text color="dark">Void Cheque</h3>\n\n              </ion-col>\n\n      \n\n            </ion-row>\n\n            <ion-row class="profile-area borderb-1" style="margin-top:0px !important;">\n\n              <ion-col col-12 text-center>\n\n              <img class="profile-img rounded-circle"  style="object-fit: cover;" width="100px" height="100px" [src]="policeCertificate(driver.policecertificate)">\n\n                <h3 class="text-capitalize" ion-text color="dark">Police Certificate</h3>\n\n              </ion-col>\n\n            \n\n            </ion-row>\n\n            <ion-row class="profile-area borderb-1" style="margin-top:0px !important;">\n\n              <ion-col col-12 text-center>\n\n              <img class="profile-img rounded-circle"  style="object-fit: cover;" width="100px" height="100px" [src]="carInsurance(driver.carinsurance)">\n\n                <h3 class="text-capitalize" ion-text color="dark">Car Insurance</h3>\n\n              </ion-col>\n\n            \n\n            </ion-row>\n\n\n\n            <ion-row class="profile-area borderb-1" style="margin-top:0px !important;">\n\n              <ion-col col-12 text-center>\n\n              <img class="profile-img rounded-circle"  style="object-fit: cover;" width="100px" height="100px" [src]="carNumberPlate(driver.carnumberplate)">\n\n                <h3 class="text-capitalize" ion-text color="dark">Car NumberPlate</h3>\n\n              </ion-col>\n\n            \n\n            </ion-row>\n\n            <ion-row class="profile-area borderb-1" style="margin-top:0px !important;">\n\n              <ion-col col-12 text-center>\n\n              <img class="profile-img rounded-circle"  style="object-fit: cover;" width="100px" height="100px" [src]="driverImage(driver.license)">\n\n                <h3 class="text-capitalize" ion-text color="dark">Driving License</h3>\n\n              </ion-col>\n\n            \n\n            </ion-row>\n\n\n\n      <ion-row class="mt-3">\n\n        <ion-col col-12>\n\n          <button ion-button color="secondary" full (click)="goToPassword()">Change Password</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ProfilePage);
    return ProfilePage;
}());

// edit profile component
var ProfileEditPage = /** @class */ (function () {
    function ProfileEditPage(navCtrl, navParams, lf, oneService, loadingCtrl, actionSheetCtrl, toastCtrl, camera, transfer, file, filePath, platform, afd) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.lf = lf;
        this.oneService = oneService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.platform = platform;
        this.afd = afd;
        this.zipRE = /^\S+[a-z\d\-_\s]+$/i;
        this.lastImage = null;
        this.lastVoidChequeImage = null;
        this.lastDriverLicenseImage = null;
        this.URL = __WEBPACK_IMPORTED_MODULE_11__services_global__["b" /* url1 */] + "upload/";
        this.ImgURL = __WEBPACK_IMPORTED_MODULE_11__services_global__["b" /* url1 */] + "uploads/";
        this.firestore = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.database().ref('/drivers');
        this.uploader = new __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload_ng2_file_upload__["FileUploader"]({
            url: this.URL,
            itemAlias: "file"
        });
        this.phoneRegex = /^[+]?\d+(\.\d+)?$/;
        this.formErrors = {
            firstname: "",
            lastname: "",
            phoneNo: "",
            vehicleType: "",
            vehicleName: "",
            vehicleNo: ""
        };
        this.validationMessages = {
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
        this.lastCarNumberPlate = null;
        this.lastpoliceCertificate = null;
        this.lastcarInsurance = null;
        this.uploader.onAfterAddingFile = function (file) {
            console.log("here it is calling");
            _this.loading = _this.loadingCtrl.create({
                content: "Please wait..."
            });
            _this.loading.present();
            file.withCredentials = false;
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.editForm.controls["image"].setValue(JSON.parse(response).filename);
            _this.loading.dismiss();
        };
        this.editForm = this.lf.group({
            _id: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            firstname: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: [{ value: '', disabled: true }],
            phoneNo: ["", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(this.phoneRegex)]],
            vehicleType: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            vehicleName: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            vehicleNo: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            image: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            address: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            license: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            voidcheque: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            AccountName: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            AccountNumber: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            paymentmethod: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            BankName: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            policecertificate: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            carinsurance: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            carnumberplate: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            ByCheque: [false],
            ByBank: [false],
            isactivated: [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            zip: ["", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(this.zipRE)]],
        });
        setTimeout(function () {
            _this.placeAutocomplete();
        }, 1000);
        if (JSON.parse(localStorage.getItem("driver"))) {
            this.driver = JSON.parse(localStorage.getItem("driver"));
            this.editForm.patchValue(this.driver);
        }
        this.editForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    }
    ProfileEditPage.prototype.driverImage = function (img) {
        var path;
        if (typeof this.lastImage == 'undefined' || this.lastImage == null) {
            if (typeof img == 'undefined' || img == null) {
                path = 'assets/imgs/profile.jpg';
            }
            else {
                path = this.ImgURL + img;
            }
        }
        else {
            path = cordova.file.dataDirectory + this.lastImage;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    ProfileEditPage.prototype.drivingLicense = function (img) {
        var path;
        if (typeof this.lastDriverLicenseImage == 'undefined' || this.lastDriverLicenseImage == null) {
            if (typeof img == 'undefined' || img == null) {
                path = 'assets/imgs/Driverlicense-512.png';
            }
            else {
                path = this.ImgURL + img;
            }
        }
        else {
            path = cordova.file.dataDirectory + this.lastDriverLicenseImage;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    ProfileEditPage.prototype.drivingVoid = function (Cheque) {
        var path;
        if (typeof this.lastVoidChequeImage == 'undefined' || this.lastVoidChequeImage == null) {
            if (typeof Cheque == 'undefined' || Cheque == null) {
                path = 'assets/imgs/voidcheque.png';
            }
            else {
                path = this.ImgURL + Cheque;
            }
        }
        else {
            path = cordova.file.dataDirectory + this.lastVoidChequeImage;
            console.log(path, 'path');
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    ProfileEditPage.prototype.carNumberPlate = function (img) {
        var path;
        if (typeof this.lastCarNumberPlate == 'undefined' || this.lastCarNumberPlate == null) {
            if (typeof img == 'undefined' || img == null) {
                path = 'assets/imgs/numberplate.png';
            }
            else {
                path = this.ImgURL + img;
            }
        }
        else {
            path = cordova.file.dataDirectory + this.lastCarNumberPlate;
            console.log(path, 'path');
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    ProfileEditPage.prototype.policeCertificate = function (img) {
        var path;
        if (typeof this.lastpoliceCertificate == 'undefined' || this.lastpoliceCertificate == null) {
            if (typeof img == 'undefined' || img == null) {
                path = 'assets/imgs/policeCert.png';
            }
            else {
                path = this.ImgURL + img;
            }
        }
        else {
            path = cordova.file.dataDirectory + this.lastpoliceCertificate;
            if (this.platform.is('ios')) {
                path = path.replace(/^file:\/\//, '');
            }
            console.log(path, 'path');
        }
        return path;
    };
    ProfileEditPage.prototype.carInsurance = function (img) {
        var path;
        if (typeof this.lastcarInsurance == 'undefined' || this.lastcarInsurance == null) {
            if (typeof img == 'undefined' || img == null) {
                path = 'assets/imgs/carInsurance.png';
            }
            else {
                path = this.ImgURL + img;
            }
        }
        else {
            path = cordova.file.dataDirectory + this.lastcarInsurance;
            if (this.platform.is('ios')) {
                path = path.replace(/^file:\/\//, '');
            }
            console.log(path, 'path');
        }
        return path;
    };
    ProfileEditPage.prototype.placeAutocomplete = function () {
        var _this = this;
        var input = document.getElementById("addressautocomplete");
        if (typeof input != 'undefined' && input != null) {
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener("place_changed", function () {
                var place = autocomplete.getPlace();
                _this.editForm.controls["address"].setValue(place.formatted_address);
            });
        }
    };
    ProfileEditPage.prototype.ionViewDidLoad = function () { };
    ProfileEditPage.prototype.presentActionSheet = function (type) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Select Image Source",
            buttons: [
                {
                    text: "Load from Library",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY, type);
                    }
                },
                {
                    text: "Use Camera",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA, type);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });
        actionSheet.present();
    };
    ProfileEditPage.prototype.takePicture = function (sourceType, type) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            console.log(type, 'type');
            console.log(imagePath, 'iamge Path');
            // Special handling for Android library
            if (_this.platform.is("android") &&
                sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath).then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf("/") + 1, imagePath.lastIndexOf("?"));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), type);
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
                console.log(currentName, 'currentName', correctPath, 'correntPath');
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), type);
            }
        }, function (err) {
            _this.presentToast("Error while selecting image.");
        });
    };
    // Create a new name for the image
    ProfileEditPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    ProfileEditPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName, type) {
        var _this = this;
        this.file
            .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
            .then(function (success) {
            console.log("sucess");
            if (type == 'profilePic') {
                _this.lastImage = newFileName;
                _this.uploadImage('profilePic');
            }
            else if (type == 'license') {
                _this.lastDriverLicenseImage = newFileName;
                _this.uploadImage('driverLicenseImage');
            }
            else if (type == 'voidCheque') {
                _this.lastVoidChequeImage = newFileName;
                _this.uploadImage('voidChequeImage');
            }
            else if (type == 'carNumberPlate') {
                _this.lastCarNumberPlate = newFileName;
                _this.uploadImage('carNumberPlateImage');
            }
            else if (type == 'carInsurance') {
                _this.lastcarInsurance = newFileName;
                _this.uploadImage('carInsuranceImage');
            }
            else if (type == 'policeCertificate') {
                _this.lastpoliceCertificate = newFileName;
                _this.uploadImage('policeCertificateImage');
            }
        }, function (error) {
            _this.presentToast("Error while storing file.");
        });
    };
    // Always get the accurate path to your apps folder
    ProfileEditPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return "";
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    ProfileEditPage.prototype.profileUpdate = function () {
        var _this = this;
        var accountDeactivated = false;
        if (this.lastcarInsurance || this.lastpoliceCertificate || this.lastCarNumberPlate || this.lastDriverLicenseImage) {
            accountDeactivated = true;
            this.editForm.controls["isactivated"].setValue(1);
        }
        this.oneService.getRestaurants().subscribe(function (resturants) {
            var allowedResturants = [];
            console.log(resturants, 'Resturants');
            console.log(_this.driver, "Driver");
            var driverZip = _this.editForm.get('zip').value;
            var zipCodes = driverZip.split(',');
            console.log(zipCodes[0]);
            for (var j = 0; j < zipCodes.length; j++) {
                for (var i = 0; i < resturants.message.length; i++) {
                    console.log(_this.driver.zip, resturants.message[i].zipcode, driverZip);
                    if (zipCodes[j] && resturants.message[i].zipcode && resturants.message[i].zipcode.toLowerCase() == zipCodes[j].toLowerCase()) {
                        console.log("PUSHED");
                        allowedResturants.push({
                            resId: resturants.message[i]._id,
                            status: true
                        });
                    }
                }
            }
            console.log(allowedResturants, _this.driver.kitchensallow);
            if (allowedResturants != _this.driver.kitchensallow) {
                console.log(allowedResturants, 'Allowed Resturant');
                _this.driver.kitchensallow = allowedResturants;
                _this.oneService.editDriver({
                    _id: _this.driver._id,
                    kitchensallow: allowedResturants
                }).subscribe(function (res) {
                    console.log(res);
                    _this.driver = res.message;
                    console.log("set Driver");
                    localStorage.setItem('driver', JSON.stringify(res.message));
                    console.log("navCtrl");
                    //  this.navCtrl.setRoot(OrderPage);
                    _this.EditInfo(accountDeactivated);
                }, function (err) {
                    console.log(err);
                    //   console.log("navCtrl");
                    //  this.navCtrl.setRoot(OrderPage);
                    _this.EditInfo(accountDeactivated);
                });
            }
            else {
                console.log("navCtrl");
                //    this.navCtrl.setRoot(OrderPage);
                _this.EditInfo(accountDeactivated);
            }
        }, function (err) {
            console.log(err);
            console.log("navCtrl");
            // this.navCtrl.setRoot(OrderPage);
            _this.EditInfo(accountDeactivated);
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
    };
    ProfileEditPage.prototype.checkDisbaled = function () {
        console.log(this.editForm.value);
    };
    ProfileEditPage.prototype.EditInfo = function (accountDeactivated) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        this.oneService.editDriver(this.editForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.oneService.getDriver(JSON.parse(localStorage.getItem("driver"))._id).subscribe(function (data) {
                    if (!data.error) {
                        if (!accountDeactivated) {
                            localStorage.removeItem("driver");
                            localStorage.setItem("driver", JSON.stringify(data.message));
                            loading.dismiss();
                            _this.getToast("Profile updated successfully.");
                            _this.navCtrl.pop();
                        }
                        else {
                            localStorage.removeItem("driver");
                            // localStorage.setItem("driver", JSON.stringify(data.message));
                            loading.dismiss();
                            _this.getToast("Profile updated Successful. Please wait for admin approval");
                            _this.afd.list(_this.firestore).remove(_this.driver._id);
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                            _this.navCtrl.popAll();
                        }
                    }
                    else {
                        _this.getToast(data.message);
                    }
                });
            }
            else {
                loading.dismiss();
                _this.getToast('Something went wrong! Please try again');
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Unable to Update data! Please check your Internet connection.');
        });
    };
    ProfileEditPage.prototype.uploadImage = function (type) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        return new Promise(function (resolve, reject) {
            var url = _this.URL;
            // File for Upload
            if (type == 'profilePic') {
                var targetPath = _this.pathForImage(_this.lastImage);
                var filename = _this.lastImage;
            }
            else if (type == 'driverLicenseImage') {
                var targetPath = _this.pathForImage(_this.lastDriverLicenseImage);
                var filename = _this.lastDriverLicenseImage;
            }
            else if (type == 'voidChequeImage') {
                var targetPath = _this.pathForImage(_this.lastVoidChequeImage);
                var filename = _this.lastVoidChequeImage;
            }
            else if (type == 'carNumberPlateImage') {
                var targetPath = _this.pathForImage(_this.lastCarNumberPlate);
                var filename = _this.lastCarNumberPlate;
            }
            else if (type == 'carInsuranceImage') {
                var targetPath = _this.pathForImage(_this.lastcarInsurance);
                var filename = _this.lastcarInsurance;
            }
            else if (type == 'policeCertificateImage') {
                var targetPath = _this.pathForImage(_this.lastpoliceCertificate);
                var filename = _this.lastpoliceCertificate;
            }
            // File name only
            var filename = _this.lastImage;
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { fileName: filename }
            };
            var fileTransfer = _this.transfer.create();
            // Use the FileTransfer to upload the image
            var Imagetype = type;
            console.log(Imagetype, '435');
            fileTransfer.upload(targetPath, url, options).then(function (data) {
                if (Imagetype == 'profilePic') {
                    _this.driver.image = JSON.parse(data.response).filename;
                    _this.editForm.controls["image"].setValue(JSON.parse(data.response).filename);
                    //    this.loading.dismiss();
                    //   this.driver.image = JSON.parse(data.response).filename;
                    //   this.EditInfo();
                }
                if (Imagetype == 'driverLicenseImage') {
                    console.log(Imagetype, '450');
                    _this.driver.license = JSON.parse(data.response).filename;
                    _this.editForm.controls["license"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'voidChequeImage') {
                    console.log(Imagetype, '457');
                    _this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.editForm.controls["voidcheque"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'carNumberPlateImage') {
                    console.log(Imagetype, '457');
                    _this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.editForm.controls["voidcheque"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'carInsuranceImage') {
                    console.log(Imagetype, '457');
                    _this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.editForm.controls["voidcheque"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'policeCertificateImage') {
                    console.log(Imagetype, '457');
                    _this.driver.policecertificate = JSON.parse(data.response).filename;
                    _this.editForm.controls["policecertificate"].setValue(JSON.parse(data.response).filename);
                }
                loading.dismiss();
                resolve(true);
            }, function (err) {
                console.log(err);
                loading.dismiss();
                _this.presentToast("Error while uploading file.");
                reject(false);
            });
        });
        // Destination URL
    };
    ProfileEditPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ProfileEditPage.prototype.onValueChanged = function (data) {
        if (!this.editForm) {
            return;
        }
        var form = this.editForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = "";
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + " ";
                }
            }
        }
    };
    ProfileEditPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ProfileEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-profile-edit",template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\profile\profile-edit.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Edit Profile</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-row class="profile-area">\n\n        <ion-col col-12 text-center>\n\n\n\n            <label>\n\n                <img class="profile-img rounded-circle" style="object-fit: cover;" [src]="driverImage(driver.image)">\n\n                <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n                <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n                <div class="tras-layer"></div>\n\n                <ion-icon name="camera" (click)="presentActionSheet(\'profilePic\')" class="image-placeholder"></ion-icon>\n\n            </label>\n\n            <input type="file" id="file" name="file" ng2FileSelect [uploader]="uploader" (change)="uploader.uploadAll()" style="display:none;"/>\n\n        </ion-col>\n\n    </ion-row>\n\n    <ion-list no-margin>\n\n        <form [formGroup]="editForm" (ngSubmit)="profileUpdate()">\n\n            <!-- <ion-item>\n\n                <ion-label floating>Username</ion-label>\n\n                <ion-input type="text" formControlName="username" disabled></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.username" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.username }}\n\n            </div> -->\n\n            <ion-item>\n\n                <ion-label floating>First Name</ion-label>\n\n                <ion-input type="text" formControlName="firstname" ></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.firstname" margin-horizontal class="alert alert-danger mt-3 ">\n\n                {{ formErrors.firstname }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Last Name</ion-label>\n\n                <ion-input type="text" formControlName="lastname"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.lastname" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.lastname }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Email</ion-label>\n\n                <ion-input type="text" formControlName="email"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.email" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.email }}\n\n            </div>\n\n   \n\n            <label for="exampleInputEmail1" style="margin-top: 10%;color: black;">* Zip Code will help you receiving the orders to deliver near by your location.</label>\n\n            <label for="exampleInputEmail1" style="color: black; ">* Zip Code (<small>   use commas to separate multiple Zip Codes (i.e 91107, 91108,91109)</small>).</label>\n\n            <ion-item>\n\n                    \n\n                    <ion-label floating> Zip code </ion-label>\n\n                <ion-input type="text" formControlName="zip"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Mobile No.</ion-label>\n\n                <ion-input type="text" formControlName="phoneNo"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.phoneNo" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.phoneNo }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Vehicle Type</ion-label>\n\n                <ion-input type="text" formControlName="vehicleType"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.vehicleType" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.vehicleType  }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Vehicle Name </ion-label>\n\n                <ion-input type="text" formControlName="vehicleName"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.vehicleName" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.vehicleName   }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Vehicle No. </ion-label>\n\n                <ion-input type="text" formControlName="vehicleNo"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors && formErrors.vehicleNo" margin-horizontal class="alert alert-danger mt-3">\n\n                {{ formErrors.vehicleNo   }}\n\n            </div>\n\n            <ion-item>\n\n                <div class="form-group">\n\n                    <label for="exampleInputEmail1">Address</label>\n\n                    <input type="text" class="form-control"  formControlName="address" id="addressautocomplete" aria-describedby="emailHelp" placeholder="Enter address">  \n\n                </div>\n\n            </ion-item>\n\n            <label for="exampleInputEmail1" style="margin-top: 25%;">* Payout Information</label>\n\n            <ion-list radio-group formControlName="paymentmethod">\n\n                <div style="width:40%;float:left">\n\n                    <ion-item  >\n\n                        <ion-label>By Bank </ion-label>\n\n                        <ion-radio value="ByBank" color="primary"></ion-radio >\n\n                        \n\n                    </ion-item>\n\n                </div>\n\n                <div style="width:50%;float:right;margin-left: 10%">\n\n                    <ion-item>\n\n                        <ion-label>By Cheque</ion-label>\n\n                        <ion-radio value="ByCheque" color="primary"></ion-radio >\n\n                    </ion-item>\n\n                </div>\n\n       \n\n          \n\n                \n\n            </ion-list>\n\n            <ion-item>\n\n                <ion-label floating>Account Holder Name: </ion-label>\n\n                <ion-input type="text" formControlName="AccountName"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Account Number: </ion-label>\n\n                <ion-input type="text" formControlName="AccountNumber"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Bank Name: </ion-label>\n\n                <ion-input type="text" formControlName="BankName"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-grid>\n\n                        <ion-row>\n\n                                <ion-col>\n\n            <label for="exampleInputEmail1" style="margin-top: 25%;">Void Cheque</label>\n\n                                </ion-col>\n\n                                <ion-col>\n\n            <div class="parents">\n\n            <img class="profile-img rounded-circle" style="object-fit: cover;" [src]="drivingVoid(driver.voidcheque)">\n\n            <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n            <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n            <div class="tras-layer-profile"></div>\n\n            <ion-icon name="camera" (click)="presentActionSheet(\'voidCheque\')" class="image-placeholder-profile"></ion-icon>\n\n            </div>\n\n            </ion-col>\n\n            </ion-row>\n\n            </ion-grid>\n\n\n\n        </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-grid>\n\n                <ion-row>\n\n                        <ion-col>\n\n    <label for="exampleInputEmail1" style="margin-top: 25%;">Police Certificate</label>\n\n                        </ion-col>\n\n                        <ion-col>\n\n    <div class="parents">\n\n    <img class="profile-img rounded-circle" style="object-fit: cover;" [src]="policeCertificate(driver.policecertificate)">\n\n    <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n    <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n    <div class="tras-layer-profile"></div>\n\n    <ion-icon name="camera" (click)="presentActionSheet(\'policeCertificate\')" class="image-placeholder-profile"></ion-icon>\n\n    </div>\n\n    </ion-col>\n\n    </ion-row>\n\n    </ion-grid>\n\n\n\n</ion-item>\n\n<ion-item>\n\n    <ion-grid>\n\n            <ion-row>\n\n                    <ion-col>\n\n<label for="exampleInputEmail1" style="margin-top: 25%;">Car Insurance</label>\n\n                    </ion-col>\n\n                    <ion-col>\n\n<div class="parents">\n\n<img class="profile-img rounded-circle" style="object-fit: cover;" [src]="carInsurance(driver.carinsurance)">\n\n<!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n<!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n<div class="tras-layer-profile"></div>\n\n<ion-icon name="camera" (click)="presentActionSheet(\'carInsurance\')" class="image-placeholder-profile"></ion-icon>\n\n</div>\n\n</ion-col>\n\n</ion-row>\n\n</ion-grid>\n\n\n\n</ion-item>\n\n\n\n<ion-item>\n\n    <ion-grid>\n\n            <ion-row>\n\n                    <ion-col>\n\n<label for="exampleInputEmail1" style="margin-top: 25%;">Car NumberPlate</label>\n\n                    </ion-col>\n\n                    <ion-col>\n\n<div class="parents">\n\n<img class="profile-img rounded-circle" style="object-fit: cover;" [src]="carNumberPlate(driver.carnumberplate)">\n\n<!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n<!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n<div class="tras-layer-profile"></div>\n\n<ion-icon name="camera" (click)="presentActionSheet(\'carNumberPlate\')" class="image-placeholder-profile"></ion-icon>\n\n</div>\n\n</ion-col>\n\n</ion-row>\n\n</ion-grid>\n\n\n\n</ion-item>\n\n\n\n\n\n            <ion-item>\n\n                    <ion-grid>\n\n                            <ion-row>\n\n                                    <ion-col>\n\n                <label for="exampleInputEmail1" style="margin-top: 25%;">Driving License</label>\n\n                                    </ion-col>\n\n                                    <ion-col>\n\n                <div class="parents">\n\n                <img class="profile-img rounded-circle" style="object-fit: cover;" [src]="drivingLicense(driver.license)">\n\n                <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n                <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n                <div class="tras-layer-profile"></div>\n\n                <ion-icon name="camera" (click)="presentActionSheet(\'license\')" class="image-placeholder-profile"></ion-icon>\n\n                </div>\n\n                </ion-col>\n\n                </ion-row>\n\n                </ion-grid>\n\n\n\n            </ion-item>\n\n            \n\n            \n\n            <button ion-button color="secondary" full [disabled]="!editForm.valid">Save</button>\n\n        </form>\n\n      \n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\profile\profile-edit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ProfileEditPage);
    return ProfileEditPage;
}());

// change password
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, twoService, oneService, loadingCtrl, toastCtrl, lf) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.twoService = twoService;
        this.oneService = oneService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.lf = lf;
        this.formErrors = {
            oldpassword: "",
            password: ""
        };
        this.validationMessages = {
            oldpassword: {
                required: "Password is required."
            },
            password: {
                required: "Password is required."
            }
        };
        this.passwordForm = this.lf.group({
            _id: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            oldpassword: ["", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            password: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            confirmpassword: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            matchpass: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            oldmatch: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.fulldetail = JSON.parse(localStorage.getItem("driver"));
        this.passwordForm.controls["_id"].setValue(this.fulldetail._id);
        this.twoService.getComplexity().subscribe(function (data) {
            if (!data.error) {
                _this.passwordp = data.message[0].ownerpasscomplexity.regex;
                _this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
                _this.passwordForm.valueChanges.subscribe(function (data) {
                    return _this.onValueChanged(data);
                });
                _this.onValueChanged();
            }
        }, function (err) {
            _this.getToast('Unable to proceed!. Please check your Internet connection');
        });
    }
    ChangePasswordPage.prototype.oldpassword = function () {
        if (this.fulldetail.password == this.passwordForm.value.oldpassword) {
            this.passwordForm.controls["oldmatch"].setValue(true);
            this.oldmatch = false;
        }
        else {
            this.passwordForm.controls["oldmatch"].setValue("");
            this.oldmatch = true;
        }
    };
    ChangePasswordPage.prototype.matchpassword = function () {
        if (this.passwordForm.value.password ==
            this.passwordForm.value.confirmpassword) {
            this.passwordForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;
        }
        else {
            this.passwordForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }
    };
    ChangePasswordPage.prototype.setpasswordmessage = function (name) {
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
    };
    ChangePasswordPage.prototype.onValueChanged = function (data) {
        if (!this.passwordForm) {
            return;
        }
        var form = this.passwordForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = "";
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + " ";
                }
            }
        }
    };
    ChangePasswordPage.prototype.passwordUpdate = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        var obj = {
            _id: this.fulldetail._id,
            newpassword: this.passwordForm.value.password,
            oldpassword: this.passwordForm.value.oldpassword
        };
        this.oneService.passwordEditDriver(obj).subscribe(function (data) {
            if (!data.error) {
                _this.oneService
                    .getDriver(JSON.parse(localStorage.getItem("driver"))._id)
                    .subscribe(function (data) {
                    if (!data.error) {
                        localStorage.removeItem("driver");
                        localStorage.setItem("driver", JSON.stringify(data.message));
                        loading.dismiss();
                        _this.getToast("Password updated successfully.");
                        _this.navCtrl.pop();
                    }
                });
            }
            else {
                _this.getToast(data.message);
                loading.dismiss();
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Unable to proceed!. Please check your Internet connection');
        });
    };
    ChangePasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-change-password",template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\profile\change-password.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Change Password</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding>\n\n    <ion-list>\n\n        <form [formGroup]="passwordForm" (ngSubmit)="passwordUpdate()">\n\n            <ion-item>\n\n                <ion-label floating>Old Password</ion-label>\n\n                <ion-input type="text" formControlName="oldpassword" (keyup)="oldpassword()"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="oldmatch" class="alert alert-danger mt-3" margin-horizontal>\n\n                Old Password not matching!\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>New Password</ion-label>\n\n                <ion-input type="password" formControlName="password" [pattern]="passwordp"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors.password" class="alert alert-danger mt-3" margin-horizontal>\n\n                {{ formErrors.password }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Confirm Password</ion-label>\n\n                <ion-input type="password" formControlName="confirmpassword" [pattern]="passwordp" (keyup)="matchpassword()"></ion-input>\n\n            </ion-item>\n\n\n\n            <div class="alert alert-danger mt-3" margin-horizontal *ngIf="MutchPassword">Password not match</div>\n\n            <button ion-button color="secondary" class="bottom-fixed" full [disabled]="!passwordForm.valid">Change Password</button>\n\n        </form>\n\n\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\profile\change-password.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_two_service__["a" /* TwoService */],
            __WEBPACK_IMPORTED_MODULE_3__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgetPasswordPage = /** @class */ (function () {
    function ForgetPasswordPage(navCtrl, navParams, oneService, lf, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oneService = oneService;
        this.lf = lf;
        this.toastCtrl = toastCtrl;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.forgetForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(this.emailp)]]
        });
    }
    ForgetPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        this.oneService.forgetPasswordDriver(this.forgetForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.navCtrl.pop();
                _this.showAlert(data.message);
            }
            else {
                _this.forgetForm.reset();
                _this.showAlert(data.message);
            }
        }, function (err) {
            _this.showAlert('Unable to load data. Please check your Internet connection');
        });
    };
    ForgetPasswordPage.prototype.goToLoginPage = function () {
        this.navCtrl.pop();
    };
    ForgetPasswordPage.prototype.showAlert = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ForgetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-forget-password',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\forget-password\forget-password.html"*/'<!-- <ion-header>\n\n  <ion-navbar color="secondary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Forgot Password</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding style="background: url(\'assets/imgs/bg.png\') center fixed;background-size: cover;">\n\n\n\n    <ion-row>\n\n      <ion-col text-center class="padding5rem-2rem">\n\n        <img src="assets/imgs/MealDaay-small.png" class="logo">\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <form role="form" [formGroup]="forgetForm" (ngSubmit)="resetPassword()">\n\n      <ion-list no-margin>\n\n        <ion-item>\n\n          <ion-label floating>Email</ion-label>\n\n          <ion-input autocapitalize="off" formControlName = "email" type="email"></ion-input>\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n      <button ion-button full color="secondary" [disabled]="!forgetForm.valid">Reset Password</button>\n\n    </form>\n\n\n\n    <ion-row>\n\n      <ion-col col-12 text-center>\n\n        <a class="colorWhite" (click)="goToLoginPage()">Login</a>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\forget-password\forget-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ForgetPasswordPage);
    return ForgetPasswordPage;
}());

//# sourceMappingURL=forget-password.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TermsOfUse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_two_service__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_transfer__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SignupPage = /** @class */ (function () {
    function SignupPage(modalCtrl, transfer, file, platform, filePath, camera, actionSheetCtrl, navCtrl, navParams, oneService, twoService, loadingCtrl, lf, alertCtrl, 
        /*private auth: AuthService,*/
        toastCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.transfer = transfer;
        this.file = file;
        this.platform = platform;
        this.filePath = filePath;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oneService = oneService;
        this.twoService = twoService;
        this.loadingCtrl = loadingCtrl;
        this.lf = lf;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.type = 'password';
        this.ctype = 'password';
        this.showPass = false;
        this.cshowPass = false;
        this.URL = __WEBPACK_IMPORTED_MODULE_5__services_global__["b" /* url1 */] + "upload/";
        this.ImgURL = __WEBPACK_IMPORTED_MODULE_5__services_global__["b" /* url1 */] + "uploads/";
        this.zipRE = /^\S+[a-z\d\-_\s]+$/i;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.formErrors = {
            'email': '',
            'password': '',
            'cpassword': '',
            'zip': ''
        };
        this.validationMessages = {
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
            'zip': {
                'required': 'Zip is required',
                'pattern': 'Invalid Zip Code'
            }
        };
        this.signupForm = this.lf.group({
            username: [],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(this.emailp)]],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            cpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            ByBank: [false],
            ByCheque: [false],
            paymentmethod: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            AccountName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            AccountNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            BankName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            license: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            policecertificate: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            carinsurance: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            carnumberplate: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            voidcheque: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            zip: ["", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(this.zipRE)]],
            termsAndCondition: [false, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('true'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        this.signupForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.twoService.getComplexity().subscribe(function (data) {
            if (!data.error) {
                _this.passwordp = data.message[0].ownerpasscomplexity.regex;
                _this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
            }
        });
    }
    SignupPage.prototype.takePicture = function (sourceType, type) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is("android") &&
                sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath).then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf("/") + 1, imagePath.lastIndexOf("?"));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), type);
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), type);
            }
        }, function (err) {
            _this.presentToast("Error while selecting image.");
        });
    };
    SignupPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName, type) {
        var _this = this;
        this.file
            .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
            .then(function (success) {
            if (type == 'profilePic') {
                _this.lastImage = newFileName;
                _this.uploadImage('profilePic');
            }
            else if (type == 'license') {
                _this.lastDriverLicenseImage = newFileName;
                console.log(_this.lastDriverLicenseImage, '139');
                _this.uploadImage('driverLicenseImage');
            }
            else if (type == 'voidCheque') {
                _this.lastVoidChequeImage = newFileName;
                console.log(_this.lastVoidChequeImage);
                _this.uploadImage('voidChequeImage');
            }
            else if (type == 'carNumberPlate') {
                _this.lastCarNumberPlate = newFileName;
                console.log(_this.lastCarNumberPlate, '157');
                _this.uploadImage('carNumberPlateImage');
            }
            else if (type == 'carInsurance') {
                _this.lastCarInsurance = newFileName;
                console.log(_this.lastCarInsurance, '161');
                _this.uploadImage('carInsuranceImage');
            }
            else if (type == 'policeCertificate') {
                _this.lastPoliceCert = newFileName;
                console.log(_this.lastPoliceCert, '165');
                _this.uploadImage('policeCertificateImage');
            }
        }, function (error) {
            _this.presentToast("Error while storing file.");
        });
    };
    SignupPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Always get the accurate path to your apps folder
    SignupPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return "";
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    SignupPage.prototype.uploadImage = function (type) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        return new Promise(function (resolve, reject) {
            var url = _this.URL;
            // File for Upload
            if (type == 'profilePic') {
                var targetPath = _this.pathForImage(_this.lastImage);
                var filename = _this.lastImage;
            }
            else if (type == 'driverLicenseImage') {
                var targetPath = _this.pathForImage(_this.lastDriverLicenseImage);
                var filename = _this.lastDriverLicenseImage;
                console.log(filename);
            }
            else if (type == 'voidChequeImage') {
                var targetPath = _this.pathForImage(_this.lastVoidChequeImage);
                var filename = _this.lastVoidChequeImage;
                console.log(filename, _this.lastVoidChequeImage);
            }
            else if (type == 'carNumberPlateImage') {
                var targetPath = _this.pathForImage(_this.lastCarNumberPlate);
                var filename = _this.lastCarNumberPlate;
            }
            else if (type == 'carInsuranceImage') {
                var targetPath = _this.pathForImage(_this.lastCarInsurance);
                var filename = _this.lastCarInsurance;
            }
            else if (type == 'policeCertificateImage') {
                var targetPath = _this.pathForImage(_this.lastPoliceCert);
                var filename = _this.lastPoliceCert;
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
            var fileTransfer = _this.transfer.create();
            // Use the FileTransfer to upload the image
            var Imagetype = type;
            console.log(Imagetype, '435');
            fileTransfer.upload(targetPath, url, options).then(function (data) {
                if (Imagetype == 'profilePic') {
                    _this.driver.image = JSON.parse(data.response).filename;
                    _this.signupForm.controls["image"].setValue(JSON.parse(data.response).filename);
                    //    this.loading.dismiss();
                    //   this.driver.image = JSON.parse(data.response).filename;
                    //   this.EditInfo();
                }
                if (Imagetype == 'driverLicenseImage') {
                    console.log(Imagetype, '450');
                    // this.driver.license = JSON.parse(data.response).filename;
                    _this.signupForm.controls["license"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'voidChequeImage') {
                    console.log(Imagetype, '457');
                    //   this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.signupForm.controls["voidcheque"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'carNumberPlateImage') {
                    console.log(Imagetype, '457');
                    //   this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.signupForm.controls["carnumberplate"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'carInsuranceImage') {
                    console.log(Imagetype, '457');
                    //   this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.signupForm.controls["carinsurance"].setValue(JSON.parse(data.response).filename);
                }
                if (Imagetype == 'policeCertificateImage') {
                    console.log(Imagetype, '457');
                    //   this.driver.voidcheque = JSON.parse(data.response).filename;
                    _this.signupForm.controls["policecertificate"].setValue(JSON.parse(data.response).filename);
                }
                loading.dismiss();
                resolve(true);
            }, function (err) {
                console.log(err);
                loading.dismiss();
                _this.presentToast("Error while uploading file.");
                reject(false);
            });
        });
        // Destination URL
    };
    SignupPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    SignupPage.prototype.presentActionSheet = function (type) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Select Image Source",
            buttons: [
                {
                    text: "Load from Library",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY, type);
                    }
                },
                {
                    text: "Use Camera",
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA, type);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });
        actionSheet.present();
    };
    SignupPage.prototype.showPassword = function () {
        this.showPass = !this.showPass;
        if (this.showPass) {
            this.type = 'text';
        }
        else {
            this.type = 'password';
        }
    };
    SignupPage.prototype.cshowPassword = function () {
        this.cshowPass = !this.cshowPass;
        if (this.cshowPass) {
            this.ctype = 'text';
        }
        else {
            this.ctype = 'password';
        }
    };
    SignupPage.prototype.setpasswordmessage = function (name) {
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
    };
    SignupPage.prototype.onValueChanged = function (data) {
        if (!this.signupForm) {
            return;
        }
        var form = this.signupForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    SignupPage.prototype.goToLoginPage = function () {
        this.navCtrl.pop();
    };
    SignupPage.prototype.presentTermsAndConditionAlert = function () {
        var modal = this.modalCtrl.create(TermsOfUse, {}, { showBackdrop: true, enableBackdropDismiss: true });
        modal.present();
        // alert.present();
    };
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        this.signupForm.controls['username'].setValue(this.signupForm.controls['email'].value);
        if (this.signupForm.value.password != this.signupForm.value.cpassword) {
            this.matchPassword = true;
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            console.log(this.signupForm.value, 'sign values', this.signupForm.value.zip, this.signupForm.value.firstname);
            this.oneService.signup(this.signupForm.value).subscribe(function (data) {
                loading_1.dismiss();
                if (!data.error) {
                    _this.getToast('Registration Successful. Please wait for admin approval');
                    _this.navCtrl.pop();
                }
                else {
                    _this.getToast('Email already exist');
                }
            }, function (err) {
                loading_1.dismiss();
                _this.getToast('Something went wrong!. Please Try Again Later');
            });
        }
    };
    SignupPage.prototype.drivingLicense = function () {
        var path;
        if (typeof this.lastDriverLicenseImage == 'undefined' || this.lastDriverLicenseImage == null) {
            path = 'assets/imgs/Driverlicense-512.png';
        }
        else {
            path = cordova.file.dataDirectory + this.lastDriverLicenseImage;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    SignupPage.prototype.carNumberPlate = function () {
        var path;
        if (typeof this.lastCarNumberPlate == 'undefined' || this.lastCarNumberPlate == null) {
            path = 'assets/imgs/numberplate.png';
        }
        else {
            path = cordova.file.dataDirectory + this.lastCarNumberPlate;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    SignupPage.prototype.policeCertificate = function () {
        var path;
        if (typeof this.lastPoliceCert == 'undefined' || this.lastPoliceCert == null) {
            path = 'assets/imgs/policeCert.png';
        }
        else {
            path = cordova.file.dataDirectory + this.lastPoliceCert;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    SignupPage.prototype.carInsurance = function () {
        var path;
        if (typeof this.lastCarInsurance == 'undefined' || this.lastCarInsurance == null) {
            path = 'assets/imgs/carInsurance.png';
        }
        else {
            console.log('car Insurance', this.lastCarInsurance);
            path = cordova.file.dataDirectory + this.lastCarInsurance;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    SignupPage.prototype.drivingVoid = function () {
        var path;
        if (typeof this.lastVoidChequeImage == 'undefined' || this.lastVoidChequeImage == null) {
            path = 'assets/imgs/voidcheque.png';
        }
        else {
            path = cordova.file.dataDirectory + this.lastVoidChequeImage;
        }
        if (this.platform.is('ios')) {
            path = path.replace(/^file:\/\//, '');
        }
        return path;
    };
    SignupPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\signup\signup.html"*/'\n\n<ion-content padding style="background: url(\'assets/imgs/bg.png\') center fixed;background-size: cover;">\n\n    <ion-row>\n\n        <ion-col col-12 class="padding5rem-2rem">\n\n            <img src="assets/imgs/MealDaay-small.png" class="logo">\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-list no-margin>\n\n        <form role="form" [formGroup]="signupForm" (ngSubmit)="doSignup()">\n\n            <ion-item>\n\n                <ion-label floating>First Name</ion-label>\n\n                <ion-input type="text" formControlName="firstname"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Last Name</ion-label>\n\n                <ion-input type="text" formControlName="lastname"></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item>\n\n                <ion-label floating>Username</ion-label>\n\n                <ion-input type="text" formControlName="username"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors.username" class="alert alert-danger mt-2">\n\n                {{ formErrors.username }}\n\n            </div> -->\n\n            <ion-item>\n\n                <ion-label floating>Email</ion-label>\n\n                <ion-input autocapitalize="off" type="text" formControlName="email"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors.email" class="alert alert-danger mt-2">\n\n                {{ formErrors.email }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Password</ion-label>\n\n                <ion-input type="{{type}}" formControlName="password" [pattern] = "passwordp"></ion-input>\n\n                <button class="hideshow" *ngIf="!showPass" ion-button clear type="button"  color="light" item-right (click)="showPassword()">Show</button>\n\n                <button class="hideshow" *ngIf="showPass" ion-button  clear type="button"  color="light" item-right (click)="showPassword()">Hide</button>\n\n            </ion-item>\n\n            <div *ngIf="formErrors.password" class="alert alert-danger mt-2">\n\n                {{ formErrors.password }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Confirm password</ion-label>\n\n                <ion-input type="{{ctype}}" formControlName="cpassword"></ion-input>\n\n                <button class="hideshow" *ngIf="!cshowPass" ion-button clear type="button" color="light" item-right (click)="cshowPassword()">Show</button>\n\n                <button  class="hideshow" *ngIf="cshowPass" ion-button clear type="button" color="light" item-right (click)="cshowPassword()">Hide</button>\n\n            </ion-item>\n\n            <div *ngIf="matchPassword" class="alert alert-danger mt-2">\n\n                Password does not match.\n\n            </div>\n\n\n\n            <label for="exampleInputEmail1" style="margin-top: 10%;color: white;">* Zip Code will help you receiving the orders to deliver near by your location.</label>\n\n            <label for="exampleInputEmail1" style="margin-top: 10%;color: white;">* Zip Code (<small>   use commas to separate multiple Zip Codes (i.e 91107, 91108,91109)</small>).</label>\n\n          \n\n            <ion-item>\n\n                <ion-label floating>Zip Code </ion-label>\n\n                <ion-input placeholder="" autocapitalize="off" type="text" formControlName="zip"></ion-input>\n\n            </ion-item>\n\n          \n\n            <div *ngIf="formErrors.zip" class="alert alert-danger mt-2">\n\n                {{ formErrors.zip }}\n\n            </div>\n\n            <label for="exampleInputEmail1" style="margin-top: 10%;color: white;">* Payout Information</label>\n\n            <ion-list radio-group formControlName="paymentmethod">\n\n                <div style="width:40%;float:left">\n\n                    <ion-item  >\n\n                        <ion-label>By Bank </ion-label>\n\n                        <ion-radio value="ByBank" color="primary"></ion-radio >\n\n                        \n\n                    </ion-item>\n\n                </div>\n\n                <div style="width:40%;float:right;margin-left: 10%">\n\n                    <ion-item>\n\n                        <ion-label>By Cheque</ion-label>\n\n                        <ion-radio value="ByCheque" color="primary"></ion-radio >\n\n                    </ion-item>\n\n                </div>\n\n       \n\n          \n\n                \n\n            </ion-list>\n\n       \n\n            <ion-item>\n\n                <ion-label floating>Account Holder Name: </ion-label>\n\n                <ion-input type="text" formControlName="AccountName"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Account Number: </ion-label>\n\n                <ion-input type="text" formControlName="AccountNumber"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label floating>Bank Name: </ion-label>\n\n                <ion-input type="text" formControlName="BankName"></ion-input>\n\n            </ion-item>\n\n\n\n\n\n\n\n\n\n            <ion-item>\n\n                <ion-grid>\n\n                        <ion-row>\n\n                                <ion-col>\n\n            <label for="exampleInputEmail1" style="margin-top: 25%;">Void Cheque</label>\n\n                                </ion-col>\n\n                                <ion-col>\n\n            <div class="parents">\n\n            <img class="profile-img rounded-circle" [src]="drivingVoid()">\n\n            <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n            <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n            <div class="tras-layer-profile"></div>\n\n            <ion-icon name="camera" (click)="presentActionSheet(\'voidCheque\')" class="image-placeholder-profile"></ion-icon>\n\n            </div>\n\n            </ion-col>\n\n            </ion-row>\n\n            </ion-grid>\n\n\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-grid>\n\n                    <ion-row>\n\n                            <ion-col>\n\n        <label for="exampleInputEmail1" style="margin-top: 25%;">Police Certificate</label>\n\n                            </ion-col>\n\n                            <ion-col>\n\n        <div class="parents">\n\n        <img class="profile-img rounded-circle" [src]="policeCertificate()">\n\n        <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n        <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n        <div class="tras-layer-profile"></div>\n\n        <ion-icon name="camera" (click)="presentActionSheet(\'policeCertificate\')" class="image-placeholder-profile"></ion-icon>\n\n        </div>\n\n        </ion-col>\n\n        </ion-row>\n\n        </ion-grid>\n\n\n\n    </ion-item>\n\n    <ion-item>\n\n        <ion-grid>\n\n                <ion-row>\n\n                        <ion-col>\n\n    <label for="exampleInputEmail1" style="margin-top: 25%;">Car Insurance</label>\n\n                        </ion-col>\n\n                        <ion-col>\n\n    <div class="parents">\n\n    <img class="profile-img rounded-circle" [src]="carInsurance()">\n\n    <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n    <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n    <div class="tras-layer-profile"></div>\n\n    <ion-icon name="camera" (click)="presentActionSheet(\'carInsurance\')" class="image-placeholder-profile"></ion-icon>\n\n    </div>\n\n    </ion-col>\n\n    </ion-row>\n\n    </ion-grid>\n\n\n\n</ion-item>\n\n<ion-item>\n\n    <ion-grid>\n\n            <ion-row>\n\n                    <ion-col>\n\n<label for="exampleInputEmail1" style="margin-top: 25%;">Car NumberPlate</label>\n\n                    </ion-col>\n\n                    <ion-col>\n\n<div class="parents">\n\n<img class="profile-img rounded-circle" [src]="carNumberPlate()">\n\n<!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n<!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n<div class="tras-layer-profile"></div>\n\n<ion-icon name="camera" (click)="presentActionSheet(\'carNumberPlate\')" class="image-placeholder-profile"></ion-icon>\n\n</div>\n\n</ion-col>\n\n</ion-row>\n\n</ion-grid>\n\n\n\n</ion-item>\n\n            <ion-item>\n\n                    <ion-grid>\n\n                            <ion-row>\n\n                                    <ion-col>\n\n                <label for="exampleInputEmail1" style="margin-top: 25%;">Driving License</label>\n\n                                    </ion-col>\n\n                                    <ion-col>\n\n                <div class="parents">\n\n                <img class="profile-img rounded-circle" [src]="drivingLicense()">\n\n                <!-- <img class="profile-img rounded-circle" [hidden]="lastImage !== null" *ngIf="!driver.image " src="assets/imgs/profile.jpg"> -->\n\n                <!-- <img src="{{pathForImage(lastImage)}}" class="profile-img rounded-circle" [hidden]="lastImage === null"> -->\n\n                <div class="tras-layer-profile"></div>\n\n                <ion-icon name="camera" (click)="presentActionSheet(\'license\')" class="image-placeholder-profile"></ion-icon>\n\n                </div>\n\n                </ion-col>\n\n                </ion-row>\n\n                </ion-grid>\n\n\n\n            </ion-item>\n\n                    <ion-grid>\n\n                    <ion-row style="position: relative;">\n\n                            \n\n                            <ion-label style="color:white;font-size: 12px;margin-left: 15%;"><ion-checkbox  formControlName="termsAndCondition"> </ion-checkbox> <span style="margin-left: 10px;position: absolute;top: 12px;">I accept the <span style="text-decoration: underline;margin-left: 5px;" (click)="presentTermsAndConditionAlert()">Terms and Conditions</span></span></ion-label>\n\n                        \n\n                    </ion-row>\n\n                </ion-grid>\n\n              \n\n            <button class="mt-3" ion-button full color="secondary" [disabled]="!signupForm.valid">Sign Up</button>\n\n        </form>\n\n    </ion-list>\n\n\n\n    <ion-row>\n\n        <ion-col col-12 text-center>\n\n            <a class="colorWhite" (click)="goToLoginPage()">Login</a>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_4__services_two_service__["a" /* TwoService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], SignupPage);
    return SignupPage;
}());

var TermsOfUse = /** @class */ (function () {
    function TermsOfUse(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    TermsOfUse.prototype.viewDismiss = function () {
        this.viewCtrl.dismiss();
    };
    TermsOfUse = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-term',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\signup\termofuse.html"*/'\n\n<!-- \n\n<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button style="background-color:#449d44 !important; box-shadow: none !important;" >\n\n            <ion-icon style="font-size:22px;padding-left: 5px;padding-right: 21px" name="arrow-round-back" (click)="viewDismiss()"></ion-icon>\n\n            <ion-title >Terms of Use</ion-title>\n\n        </button>\n\n       \n\n    </ion-navbar>\n\n     \n\n</ion-header> -->\n\n<ion-header>\n\n    <!-- <ion-navbar color="secondary">\n\n            \n\n        <ion-title><strong><ion-icon name="arrow-round-back" (click)="viewDismiss()" style="font-size:22px;padding-left: 5px;padding-right: 21px"></ion-icon></strong><span></span>Terms of Use</ion-title>\n\n    </ion-navbar> -->\n\n    <ion-navbar color="secondary"> \n\n        <ion-buttons end>\n\n        <button ion-button  left  icon-only (click)="viewDismiss()">\n\n                <ion-icon name="close-circle"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n        <ion-title text-center>Terms of Use </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n\n<div style="background: white; padding: 15px;">\n\n<h2 >      Agreement with Terms</h2>      \n\n<p>\n\nBy using this website or mobile application or working with our employees or agents by any means (including telephone, text, email, chat, in-person, or any other mechanism), you accept our Agreement. We reserve the right to make changes to our websites, our mobile applications, our services, and the Agreement at any time. Your use of our services or working with our employees or agents after any changes have been made constitutes acceptance of the changes.\n\nThis website, mobile application, compilation, content and software may only be used as a personal e-commerce resource. Any other use, including the reproduction, modification, distribution, transmission, republication, display, sale, resale, unauthorized use, or other exploitation of any part of the website, mobile application, compilation, content and software without express prior written permission from MealDaay is strictly prohibited, may violate copyright, trademark and other laws, and may result in your being responsible for any and all associated damages. The application or linking of this website, mobile application, compilation, content or software into any other website, mobile application, compilation, content or software without express prior written permission from MealDaay is also strictly prohibited.\n\nMealDaay.com, the MealDaay logo, and certain other product or service names referenced are trade or service marks of MealDaay. Certain product, company, trade, and service names referenced are trade or service marks of their respective owners. None of these marks may be used in connection with any product or service different from that correctly associated with the mark, in any manner that disparages or discredits the mark\'s owner, or in any manner that is likely to cause confusion.\n\nMealDaay and our affiliates and partners reserve the right to refuse service, terminate accounts, and/or modify or cancel orders at our discretion, for any cause or without cause.\n\n\n\n</p>\n\n<h2 >      MealDaay Accounts</h2>      \n\n<div>\n\n<ul>\n\n    <li>a.	All information provided by you on the MealDaay Platform (to create an account for use of the MealDaay Platform or in connection with your use of the MealDaay Services is true, accurate, current and complete. </li>\n\n    <li>b.	You agree that Any MealDaay Account you create must be kept secure and will not be shared or disclose the MealDaay Account credentials with anyone. No members of the MealDaay Group will be liable for any loss or damage arising from your failure to safeguarding your MealDaay Account, use a strong password or limit its use to your MealDaay Account. </li>\n\n    <li>c.	MealDaay reserves the right to deny your request for a MealDaay Account (including usernames) and to disable or terminate access to any MealDaay Account (including usernames) issued to you at any time in MealDaay’s sole discretion. If MealDaay disables access to a MealDaay Account issued to you, you will be prevented from accessing the MealDaay Platform or the MealDaay Services, your MealDaay Account details, Orders or other information that is associated with your MealDaay Account. </li>\n\n    <li>d.	MealDaay may suspend or terminate your ability to access the MealDaay Platform, or cease providing you with all or part of the MealDaay Services at any time for any or no reason. You acknowledge and agree that all suspensions or terminations may be made by MealDaay in its sole discretion and that no members of the MealDaay Group will be liable to you or any third-party for any suspension or termination of your access or for the removal of any of the materials uploaded by you to the MealDaay Platform. Any suspension or termination of this Agreement by MealDaay will be in addition to any and all other rights and remedies that MealDaay may have. </li>\n\n    <li>deleted, we may disable your MealDaay customer account for fraud prevention or other lawful purposes. We may terminate these Terms of Service at any time by giving notice to you, at our discretion, by email at your current email address on file with us or through the MealDaay Platform. </li>\n\n</ul>\n\n</div>\n\n<h2 >      Ownership of Certain Information</h2>      \n\n<p>\n\nIf you post names of, reviews of, or comments on products or companies on MealDaay\'s websites or mobile applications, you grant MealDaay and our affiliates and partners a non-exclusive, royalty-free, and fully sub-licensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such names, reviews, and comments throughout the world in any media. You also grant MealDaay and our affiliates and partners the right to use the name (if any) that you submit with any name, review, or comment in connection with such name, review, or comment.\n\n</p>\n\n<p>\n\nIf you allow us to post your menu, pricing, logo, photographs or other images, delivery terms or delivery requirements, or any other information on our websites or mobile applications, you grant MealDaay and our affiliates and partners a non-exclusive, royalty-free, perpetual, irrevocable, and fully sub-licensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such menu, pricing, logo, delivery requirements, or other information throughout the world in any media, subject to our usage of your trade or service marks as specified elsewhere in these Terms.\n\n</p>\n\n<h2 >      Risk of Loss; Guarantee</h2>      \n\n<p>\n\nAll items purchased through MealDaay are made pursuant to a fulfillment agreement with one or more third parties (such as food providers or delivery companies). Should there be errors, MealDaay will offer every reasonable assistance in the correction of that error. In any event, however, the risk of loss and title for such items pass to you upon our conveyance of your order to the third party/ies. It may be necessary for you to file claims with those parties.\n\n</p>\n\n<h2 >      Indemnification</h2>      \n\n<p>\n\nYou, your employer (if any), and any individual or company (if any) for whom you are a contractor, agree to indemnify and hold MealDaay, our subsidiaries, affiliates, officers, agents, and other partners and employees harmless from any loss, liability, damage, claim, or demand, including reasonable attorneys\' fees, made by any party due to or arising out of (a) your use of this website or mobile application or any MealDaay services in any way, (b) your fulfillment or attempted fulfillment of any orders sent to you or facilitated by MealDaay, (c) your delivery or attempted delivery of any orders sent to you or facilitated by MealDaay, whether sent to you directly or indirectly by MealDaay, or (d) any other engagement or attempted engagement with MealDaay.\n\n</p>\n\n<p>\n\nMealDaay reserves the right to limit purchases and purchase quantities. In the event of any error, you may be limited to a single unit purchase. Pricing on this website or mobile application is subject to change without notice.\n\n</p>\n\n<h2 >      No Agency Relationship</h2>      \n\n<p>\n\nYou agree that MealDaay is not responsible for any information you convey, in any manner, and that we have no control over any actions you take or statements you make. You agree that you and MealDaay are independent contractors, and that neither you nor we are in any way an agent for the other party.\n\n</p>\n\n<h2 >      ORDERING TERMS</h2>      \n\n<p>\n\nFor clarity of services, MealDaay does not prepare or fulfil any orders for Goods or provide delivery services directly and no members of the MealDaay Group will be liable for any transactions between Customers, Couriers or Chefs/Vendors. Menus and other Chefs/Vendor-related information on the MealDaay Platform is content provided by the Chefs/Vendor and not MealDaay. \n\n</p>\n\n<div>\n\n<ul>\n\n    <li>a.	It is required to create user account to use the MealDaay Platform and services. Once you have created your MealDaay Customer Account you may select Goods from a Chefs/Vendor’s menu, choose your desired quantities, and then add them to your cart and if you wish you may proceed to place your Order, provide your payment card information or select the cash payment option, if available, and an Order will be created and sent to the Vendor. You are responsible to ensure that all of your Order details, including billing, delivery address and other information is current, complete and accurate. </li>\n\n    <li>b.	The Chefs/ Vendors will confirm all Orders and to communicate any inability or unwillingness to confirm promptly. We will notify you as soon as reasonably practicable if the Vendor does not confirm your Order. Vendor\'s may have the discretion to not confirm Orders. You agree that MealDaay or the Vendor will have no liability to you for Orders that are not confirmed, are cancelled or that the Vendor has been unable or unwilling to fulfill. </li>\n\n    <li>c.	The legal contract for the purchase of Goods will in all cases be between the Customer and the Chefs/Vendor. MealDaay act as your sole and exclusive agent for the purpose of concluding contracts for the sale of Goods between you and the Chefs/Vendor by means of you placing Orders via the MealDaay Platform. YOU ACKNOWLEDGE AND AGREE THAT NO MEMBER OF THE MEALDAAY GROUP HAS ANY CONTROL OVER THE QUALITY OF THE GOODS OR SERVICES OFFERED BY VENDORS AND COURIERS AND THAT NO MEMBERS OF THE MEALDAAY GROUP WILL HAVE LIABILITY TO YOU FOR ANY PROBLEMS CAUSED BY THE VENDOR CONCERNING YOUR ORDERS, INCLUDING, WITHOUT LIMITATION, MISSED OR LATE DELIVERIES, MISSED GOODS ITEMS, AND ANY PROBLEMS WITH RESPECT TO THE QUALITY OF THE GOODS DELIVERED INCLUDING IF GOODS CAUSE ILLNESS, ALLERGIC REACTIONS OR HAVE INCORRECT NUTRITIONAL VALUES. NO RESPONSIBILITY FOR VENDORS AND COURIERS. Chefs/VENDORS AND COURIERS OFFERING GOODS OR SERVICES THROUGH THE MEALDAAY PLATFORM ARE INDEPENDENT PERSONS OR ORGANIZATIONS AND NOT REPRESENTATIVES, AGENTS OR EMPLOYEES OF MEALDAAY. MEALDAAY IS THEREFORE NOT LIABLE FOR THE ACTS, ERRORS, OMISSIONS, REPRESENTATIONS, WARRANTIES, CONTRACTUAL BREACHES OR NEGLIGENCE OF ANY Chefs/VENDORS OR COURIERS OR FOR ANY PERSONAL INJURY, DEATH, PROPERTY DAMAGE, OR OTHER DAMAGES OR EXPENSES RESULTING THEREFROM AND TAKES NO RESPONSIBILITY WHATSOEVER FOR THE PRODUCTS OR SERVICES OFFERED BY Chefs/VENDORS OR COURIERS. CHEFS/VENDORS ARE REQUIRED/RESPONSIBLE TO UPLOAD VALID/LEGAL/PAID IMAGES ON THEIR MENU/COMBO/Weekly PACKAGES.</li>\n\n    <li>d.	For Delivery Orders that the Vendor arranges or for which third party couriers provide delivery services, we are not liable for any service or product provided by such couriers.</li>\n\n</ul>\n\n</div>    \n\n<!-- </p> -->\n\n<h2 >      Pickup or Delivery </h2>      \n\n<p>\n\nCustomer has an option to pick up or get it delivered by courier at the premise of the Chefs/Vendor ("Pickup Order") or delivered to you by a third-party courier or courier of the Chefs/Vendor ("Delivery Order"). You may be provided a time for when the Pickup Order will be ready for pickup or when the Delivery Order will be delivered. These times are only an estimate and MealDaay and the Chefs/Vendor offer no guarantee that these times will be achieved. MealDaay is not responsible for any delays in receiving or having your Order ready for any reason. For a Pickup Order, you will arrive at the time provided and MealDaay and the Chefs/Vendor are under no obligation to remake or refund the Goods if you do not arrive when indicated.  \n\n</p>\n\n<h2 >      CANCELLATIONS</h2>      \n\n<p>\n\nCustomer can cancel an order up to 10 minutes from placing the order on our website or mobile apps. MealDaay make every effort to ensure that accurate pricing and descriptions are maintained, we reserve the right to cancel any order that is based on inaccurate information. MealDaay.com and our partner Chefs reserve the right to cancel any order, before or after acceptance, and will notify you immediately of any such cancellation.   \n\n</p>\n\n<h2 >      REFUNDS</h2>      \n\n<p>\n\nPlease contact MealDaay.com through our live chat or call us on our hotline number, regarding the issue of your food order.  In case if you have already been billed by MealDaay.com, we will issue full or partial refunds in the following cases: if you did not receive your order or received an incorrect order, you may be issued a full refund; if part of your order is missing, we may issue a partial refund. In every event, we will do our best to ensure your satisfaction.\n\n</p>\n\n<h2 >      Pricing and Payment</h2>      \n\n<p>\n\nThe user/customer is hereby agreeing to pay in full the prices (including, without limitation, all applicable taxes) for any orders placed using your User Account(s) (or any orders placed as a guest). \n\n</p>\n\n<p>\n\nThe user/customer are responsible for any taxes imposed on any transactions conducted on or in connection with this Site and applicable taxes will be added to the amount charged for the applicable transaction on this Site.  \n\n</p>\n\n<p>\n\nYour use of this Site includes the ability to enter into agreements and/or to make purchases electronically. You acknowledge that your electronic submissions constitute your agreement and intent to be bound by and to pay for such agreements and purchases. Your agreement and intent to be bound by electronic submissions applies to all records relating to all transactions you enter into on this Site, including without limitation and to the full extent allowed by law, notices of cancellation, policies, contracts, and applications \n\n</p>\n\n\n\n<h2 >      Limitation of Liability</h2>      \n\n<p>\n\nMealDaay.com will not be liable for any damages or injuries caused by, including but not limited to, any failure of performance, error, omission, interruption, defect, delay in operation of transmission, computer virus, or line failure. Under no circumstances shall MealDaay be liable for any damages resulting from the use of this Site or the Materials, including without limitation, indirect, special, consequential, incidental or punitive losses, damages or expenses or lost profits or savings even if MealDaay has been advised of their possible existence, or even if MealDaay or an authorized MealDaay representative has been advised of the possibility of such damages, or both.  \n\n</p>\n\n<h2 >      Personal Information</h2>      \n\n<p>\n\nWe respect your privacy and the use and protection of your personally identifiable information. During your use of this Site, you may be asked to provide certain personalized information to us (such information referred to hereinafter as “Personal Information”). Our information collection and use policies with respect to the privacy of such Personal Information are set forth in this Site’s Privacy Policies, which is incorporated herein by reference for all purposes. We encourage you to read the Privacy Policies, and to use it to help make informed decisions. You acknowledge and agree that you are solely responsible for the accuracy and content of Personal Information.  \n\n</p>\n\n<h2 >      Rescheduling Policy</h2>      \n\n<p>\n\nCustomer can re-schedule, Chef has to accept the new date.\n\n</p>\n\n<h2 >      \n\nDelivery Charges & Policy\n\n</h2>      \n\n<p>\n\nFor All delivery options (Both Chef and customer has to be in the same City). Any delivery outside the Chef\'s city will be charged based on the KMs. For weekly and monthly meal plans Half of your order will be delivered on Sunday morning/afternoon based on your selected time schedule and the remaining half will be delivered on Wednesday on your selected time. There is a discounted flat rate apply. \n\n</p>\n\n<p>\n\n<strong> Daily scheduled Delivery: </strong> Customer will receive the order every day. Mealdaay.com will charge a flat fee per order\n\n</p>\n\n<p>\n\n<strong> Delivery with 45-60 mins: </strong> If you order food item for instant delivery, then it will be at your door step within 45- min for the rate determined by the distance (KM). \n\n</p>\n\n<p>\n\n<strong>Note: </strong> For apartment or condo residents, please also make sure that your concierge accepts food deliveries and notifies you on arrival. The delivery may get delayed due to weather conditions and traffic accidents, road closures, or city events. Please bear with us if your order is not delivered within the delivery window as we are trying to get your order to you as quickly as possible!\n\n</p>\n\n<p>\n\nMealDaay accepts orders until Friday noon. The orders will be delivered on Sunday and Wednesday for weekly/monthly subscription as follow:\n\n</p>\n\n<div>\n\n<h4>Sunday Deliveries</h4>\n\n<p> 9:30:00 AM – 2:30 AM</p>\n\n<h4>Wednesday Deliveries</h4>\n\n<p> 11:30 AM - 2:30 PM</p>\n\n<p>6:30 PM - 10:30 PM</p>\n\n</div>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\signup\termofuse.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], TermsOfUse);
    return TermsOfUse;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_order__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_six_service__ = __webpack_require__(552);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var RestaurantsPage = /** @class */ (function () {
    function RestaurantsPage(navCtrl, navParams, loadingCtrl, toastCtrl, oneService, ms6Service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.oneService = oneService;
        this.ms6Service = ms6Service;
        this.kitchenIds = [];
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if (JSON.parse(localStorage.getItem('driver'))) {
            console.log("GETING DRIVER");
            this.driver = JSON.parse(localStorage.getItem('driver'));
        }
        console.log(this.driver);
        this.getDriverLocation();
        this.kitchenIds = this.driver.kitchensallow;
        this.oneService.getRestaurants().subscribe(function (data) {
            if (!data.error) {
                var allrestaurants = data.message.filter(function (item) {
                    return item.activestatus == true;
                });
                console.log("Tresturant", data);
                var trestaurants = data.message.filter(function (item) {
                    // let country = await this.getgeo(item.lat,item.lng);
                    // item.country = country;
                    console.log(item.activestatus === true && (item.country.toLowerCase() == _this.driver.country.toLowerCase()));
                    if (item.activestatus === true && (item.country.toLowerCase() == _this.driver.country.toLowerCase())) {
                        console.log("here");
                        return item;
                    }
                });
                console.log("Tresturant", trestaurants);
                var allowrestrodetail = [];
                _this.driver.kitchensallow.forEach(function (item) {
                    var index = trestaurants.findIndex(function (it) { return it._id == item.resId; });
                    if (index != -1) {
                        trestaurants.splice(index, 1);
                    }
                });
                _this.driver.kitchensallow.forEach(function (item) {
                    var index = allrestaurants.findIndex(function (it) { return it._id == item.resId; });
                    if (index != -1) {
                        var deta = { restaurantname: allrestaurants[index].restaurantname, status: item.status };
                        allowrestrodetail.push(deta);
                    }
                });
                console.log(trestaurants);
                _this.restaurants = trestaurants;
                _this.allowresids = allowrestrodetail;
                _this.getDriverInfo();
                loading.dismiss();
            }
            else {
                _this.getToast('Unable to load data');
                loading.dismiss();
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Unable to load Chefs Detail! Please check your Internet connection.');
        });
    }
    RestaurantsPage.prototype.getDriverLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var countryDriver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getgeo(this.driver.lat, this.driver.lng)];
                    case 1:
                        countryDriver = _a.sent();
                        this.driver.country = countryDriver;
                        return [2 /*return*/];
                }
            });
        });
    };
    RestaurantsPage.prototype.getDriverInfo = function () {
        var _this = this;
        this.oneService.getDriver(this.driver._id).subscribe(function (data) {
            if (!data.error) {
                localStorage.removeItem('driver');
                localStorage.setItem('driver', JSON.stringify(data.message));
                _this.driver = data.message;
                _this.kitchenIds = [];
                _this.kitchenIds = data.message.kitchensallow;
            }
        });
    };
    RestaurantsPage.prototype.submitRestaurant = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = {
            id: this.driver._id,
            kitchensallow: this.kitchenIds
        };
        this.oneService.updateRestaurantId(obj).subscribe(function (data) {
            if (!data.error) {
                _this.getDriverInfo();
                loading.dismiss();
                _this.getToast('Chefs requested successfully! Please wait for admin approval');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__order_order__["b" /* OrderPage */]);
            }
            else {
                loading.dismiss();
                _this.getToast('Unable to request Chefs. Please try again Later!');
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Unable to Request Chefs! Please check your Internet connection.');
        });
    };
    RestaurantsPage.prototype.updataRestaurant = function (id) {
        var obj = { resId: id, status: false };
        var index = this.kitchenIds.findIndex(function (x) { return x.resId == id; });
        if (index == -1) {
            this.kitchenIds.push(obj);
        }
        else {
            this.kitchenIds.splice(index, 1);
        }
    };
    RestaurantsPage.prototype.getgeo = function (lat, long) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, long);
        return new Promise(function (resolve, reject) {
            geocoder.geocode({ latLng: latlng }, function (results, status) {
                console.log("geocoder");
                //   /*this.subscription.unsubscribe();*/
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results);
                        var obj_1 = {};
                        if (results[0].address_components.length > 0) {
                            results[0].address_components.forEach(function (comp) {
                                if (comp.types.length > 0) {
                                    for (var i = 0; i < comp.types.length; i++) {
                                        if (comp.types[0] == "country") {
                                            obj_1 = { countryname: comp.long_name };
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
                    }
                    else {
                        reject();
                    }
                }
                else {
                    reject();
                }
            });
        });
    };
    RestaurantsPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    RestaurantsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-restaurants',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\restaurants\restaurants.html"*/'<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Chefs</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content no-padding>\n\n  <ion-list no-lines class="mb-5"> \n\n    <!-- <ion-list-header class="mt-3 bordert-0 borderb-1">\n\n      All Chefs\n\n    </ion-list-header>\n\n\n\n    <div *ngFor="let restaurant of restaurants; index as i ">\n\n      <ion-item *ngIf="restaurant.restaurantname">\n\n        <ion-label class="text-capitalize">{{restaurant.restaurantname}}</ion-label>\n\n        <ion-checkbox color="secondary" (ionChange)="updataRestaurant(restaurant._id)"></ion-checkbox>\n\n      </ion-item>\n\n    </div> -->\n\n    <ion-list-header class="mt-3 mt-3 bordert-0 borderb-1">\n\n       All Chefs\n\n    </ion-list-header>\n\n    <div *ngFor="let restaurant of allowresids; index as i ">\n\n      <ion-item *ngIf="restaurant.restaurantname">\n\n        <ion-label class="text-capitalize">{{restaurant.restaurantname}}\n\n          <br>\n\n          <span class="text-muted" *ngIf="restaurant.status">Approved</span>\n\n          <span class="text-muted" *ngIf="!restaurant.status">Pending</span>\n\n        </ion-label>\n\n        <ion-checkbox color="secondary" checked disabled></ion-checkbox>\n\n      </ion-item>\n\n    </div>\n\n\n\n<!-- {{location}} -->\n\n  </ion-list>\n\n  <!-- <button ion-button color="secondary" class="bottom-fixed" full (click)="submitRestaurant()">Save</button> -->\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\restaurants\restaurants.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_4__services_six_service__["a" /* SixService */]])
    ], RestaurantsPage);
    return RestaurantsPage;
}());

//# sourceMappingURL=restaurants.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SixService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SixService = /** @class */ (function () {
    function SixService(http) {
        this.http = http;
    }
    SixService.prototype.getAllCuisines = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'cuisines/')
            .map(function (response) { return response.json(); });
    };
    SixService.prototype.getIdByCountry = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'getcountryid', data)
            .map(function (response) { return response.json(); });
    };
    SixService.prototype.getCountryName = function () {
        return this.http.get("http://freegeoip.net/json/").map(function (response) { return response.json(); });
    };
    SixService.prototype.getCountrylist = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'countrylist')
            .map(function (response) { return response.json(); });
    };
    SixService.prototype.getDeliveryCharges = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'deliverycharges')
            .map(function (response) { return response.json(); });
    };
    SixService.prototype.getcitylist = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'getcitylist', data)
            .map(function (response) { return response.json(); });
    };
    SixService.prototype.getComplexity = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'users/complexity')
            .map(function (response) { return response.json(); });
    };
    SixService.prototype.getOneUrl = function (url) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url2 */] + 'pages/' + url)
            .map(function (response) { return response.json(); });
    };
    SixService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], SixService);
    return SixService;
}());

//# sourceMappingURL=six.service.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export imageUrlupload */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imageUrl; });
/* unused harmony export imageUrl2 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return url2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return url1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return url4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return url3; });
// export const imageUrlupload: string = 'https://mealdaay.com:4024/uploads';
// export const url1: string = 'https://mealdaay.com:4014/';
// export const url2: string = 'https://mealdaay.com:4004/';
// export const url3: string = 'https://mealdaay.com:4044/';
// export const url4: string = 'https://mealdaay.com:4034/';
// export const frontUrl: string = 'https://104.236.69.166:3000/';
// export const imageUrl: string = 'https://mealdaay.com:4024/uploads/';
// export const imageUrl2: string = 'https://mealdaay.com:4004/uploads/';
// export const imageUrl: string = 'http://138.197.174.35:4024/uploads/';
// export const imageUrl2: string = 'http://138.197.174.35:4004/uploads/';
var imageUrlupload = 'http://localhost:4024/upload';
var imageUrl = 'http://localhost:4024/uploads/';
var imageUrl2 = 'http://localhost:4004/uploads/';
var url2 = 'http://localhost:4004/';
var url1 = 'http://localhost:4014/';
// export const url2: string = 'http://localhost:4024/';
var url4 = 'http://localhost:4034/';
var url3 = 'http://localhost:4044/';
// export const imageUrlupload: string = 'http://138.197.174.35:4024/upload';
//export const url2: string = 'http://138.197.174.35:4024/';
// export const imageUrlupload: string = 'http://138.197.174.35:4024/uploads/';
// export const imageUrl: string = 'http://138.197.174.35:4024/uploads/';
// export const imageUrl2: string = 'http://138.197.174.35:4004/uploads/';
// export const url2: string = 'http://138.197.174.35:4004/';
// export const url1: string = 'http://138.197.174.35:4014/';
// export const url4: string = 'http://138.197.174.35:4034/';
// export const url3: string = 'http://138.197.174.35:4044/'; 
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OneService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OneService = /** @class */ (function () {
    function OneService(http) {
        this.http = http;
    }
    OneService.prototype.signup = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver', data)
            .map(function (response) { return response.json(); });
    };
    OneService.prototype.login = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver/login', data)
            .map(function (response) {
            var owner = response.json();
            return owner;
        });
    };
    OneService.prototype.forgetPasswordOwner = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'owner/forget-password', data)
            .map(function (response) {
            var ower = response.json();
            return ower;
        });
    };
    OneService.prototype.forgetPasswordDriver = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver/forget-password', data)
            .map(function (response) {
            var ower = response.json();
            return ower;
        });
    };
    OneService.prototype.editDriver = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    OneService.prototype.getDriver = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    OneService.prototype.passwordEditDriver = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver/change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    OneService.prototype.getRestaurants = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'kitchen')
            .map(function (response) { return response.json(); });
    };
    OneService.prototype.getRestaurant = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'kitchen/' + id)
            .map(function (response) { return response.json(); });
    };
    OneService.prototype.updateRestaurantId = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url1 */] + 'driver/' + data.id, data)
            .map(function (response) { return response.json(); });
    };
    OneService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], OneService);
    return OneService;
}());

//# sourceMappingURL=one.service.js.map

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__ = __webpack_require__(640);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/*import { BackgroundGeolocation } from '@ionic-native/background-geolocation';*/




var LocationService = /** @class */ (function () {
    function LocationService(zone, oneService, 
        /*private backgroundGeolocation: BackgroundGeolocation,*/
        geolocation, diagnostic) {
        this.zone = zone;
        this.oneService = oneService;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.lat = 0;
        this.lng = 0;
        if (localStorage.getItem('driver')) {
            this.driver = JSON.parse(localStorage.getItem('driver'));
        }
    }
    LocationService.prototype.startTracking = function () {
        var _this = this;
        var successCallback = function (isAvailable) { if (!isAvailable) {
            _this.diagnostic.requestLocationAuthorization();
        } };
        var errorCallback = function (e) { return console.error(e); };
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
        console.log("i am one time");
        this.watch = this.geolocation.watchPosition({ maximumAge: 60000 }).filter(function (p) { return p.code === undefined; }).subscribe(function (position) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var obj, cityAndCountry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Run update inside of Angular's zone
                        /*this.zone.run(() => {*/
                        this.watch.unsubscribe();
                        if (!(typeof position['coords'] != 'undefined')) return [3 /*break*/, 2];
                        this.lat = position.coords.latitude;
                        this.lng = position.coords.longitude;
                        obj = {
                            _id: this.driver['_id'],
                            lat: this.lat,
                            lng: this.lng
                        };
                        return [4 /*yield*/, this.getgeo(this.lat, this.lng)];
                    case 1:
                        cityAndCountry = _a.sent();
                        console.log(cityAndCountry);
                        if (cityAndCountry.city) {
                            obj.city = cityAndCountry.city;
                        }
                        if (cityAndCountry.country) {
                            obj.country = cityAndCountry.country;
                        }
                        console.log(obj);
                        if (parseFloat(this.driver['lat']) != this.lat || parseFloat(this.driver['lng']) != this.lng) {
                            this.oneService.editDriver(obj).subscribe(function (data) {
                                if (!data.error) {
                                    _this.oneService.getDriver(_this.driver._id).subscribe(function (data2) {
                                        if (!data2.error) {
                                            localStorage.removeItem('driver');
                                            localStorage.setItem('driver', JSON.stringify(data2.message));
                                        }
                                    });
                                }
                            });
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        var options = {
            frequency: 1000,
        };
        setInterval(function () {
            console.log("check");
            _this.watch = _this.geolocation.watchPosition({ maximumAge: 60000 }).filter(function (p) { return p.code === undefined; }).subscribe(function (position) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var obj, cityAndCountry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Run update inside of Angular's zone
                            /*this.zone.run(() => {*/
                            this.watch.unsubscribe();
                            if (!(typeof position['coords'] != 'undefined')) return [3 /*break*/, 2];
                            this.lat = position.coords.latitude;
                            this.lng = position.coords.longitude;
                            obj = {
                                _id: this.driver['_id'],
                                lat: this.lat,
                                lng: this.lng
                            };
                            return [4 /*yield*/, this.getgeo(this.lat, this.lng)];
                        case 1:
                            cityAndCountry = _a.sent();
                            console.log(cityAndCountry);
                            if (cityAndCountry.city) {
                                obj.city = cityAndCountry.city;
                            }
                            if (cityAndCountry.country) {
                                obj.country = cityAndCountry.country;
                            }
                            console.log(obj);
                            if (parseFloat(this.driver['lat']) != this.lat || parseFloat(this.driver['lng']) != this.lng) {
                                this.oneService.editDriver(obj).subscribe(function (data) {
                                    if (!data.error) {
                                        _this.oneService.getDriver(_this.driver._id).subscribe(function (data2) {
                                            if (!data2.error) {
                                                localStorage.removeItem('driver');
                                                localStorage.setItem('driver', JSON.stringify(data2.message));
                                            }
                                        });
                                    }
                                });
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        }, 180000);
    };
    LocationService.prototype.stopTracking = function () {
        /*this.backgroundGeolocation.finish();*/
        this.watch.unsubscribe();
    };
    LocationService.prototype.getgeo = function (lat, long) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, long);
        return new Promise(function (resolve, reject) {
            geocoder.geocode({ latLng: latlng }, function (results, status) {
                console.log("geocoder");
                //   /*this.subscription.unsubscribe();*/
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results);
                        var obj_1 = {};
                        if (results[0].address_components.length > 0) {
                            results[0].address_components.forEach(function (comp) {
                                if (comp.types.length > 0) {
                                    for (var i = 0; i < comp.types.length; i++) {
                                        if (comp.types[0] == "country") {
                                            obj_1.country = comp.long_name;
                                        }
                                        if (comp.types[0] == 'locality') {
                                            obj_1.city = comp.long_name;
                                        }
                                    }
                                }
                            });
                            resolve(obj_1);
                        }
                    }
                    else {
                        reject();
                    }
                }
                else {
                    reject();
                }
            });
        });
    };
    LocationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_3__one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], LocationService);
    return LocationService;
}());

//# sourceMappingURL=location.service.js.map

/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(660);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_order_order__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_restaurants_restaurants__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_forget_password_forget_password__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_two_service__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_three_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_four_service__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_location_service__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_file_upload__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_file__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_transfer__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_path__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_auth_service__ = __webpack_require__(1061);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularfire2_firestore__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angularfire2_auth__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_firebase__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_badge__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_network__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_six_service__ = __webpack_require__(552);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















/*import { BackgroundGeolocation } from '@ionic-native/background-geolocation';*/














/*import { BackgroundMode } from '@ionic-native/background-mode';*/


var config = {
    apiKey: "AIzaSyB5oue6snCCcEKDTpoX8hRQkP0q2bl1Ojo",
    authDomain: "mealdaay-334ae.firebaseapp.com",
    databaseURL: "https://mealdaay-334ae.firebaseio.com",
    projectId: "mealdaay-334ae",
    storageBucket: "mealdaay-334ae.appspot.com",
    messagingSenderId: "202055895804"
};
__WEBPACK_IMPORTED_MODULE_30_firebase__["initializeApp"](config);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_forget_password_forget_password__["a" /* ForgetPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_order_order__["b" /* OrderPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["c" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_order_order__["a" /* OrderDetailPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["b" /* ProfileEditPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_restaurants_restaurants__["a" /* RestaurantsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["b" /* TermsOfUse */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_19_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_26_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_28_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_29_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["b" /* TermsOfUse */],
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_forget_password_forget_password__["a" /* ForgetPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_order_order__["b" /* OrderPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["c" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_order_order__["a" /* OrderDetailPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["b" /* ProfileEditPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_restaurants_restaurants__["a" /* RestaurantsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__services_one_service__["a" /* OneService */],
                __WEBPACK_IMPORTED_MODULE_12__services_two_service__["a" /* TwoService */],
                __WEBPACK_IMPORTED_MODULE_13__services_three_service__["a" /* ThreeService */],
                __WEBPACK_IMPORTED_MODULE_14__services_four_service__["a" /* FourService */],
                __WEBPACK_IMPORTED_MODULE_15__services_location_service__["a" /* LocationService */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_badge__["a" /* Badge */],
                __WEBPACK_IMPORTED_MODULE_33__services_six_service__["a" /* SixService */],
                /*BackgroundMode,*/
                /*BackgroundGeolocation,*/
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_25__services_auth_service__["a" /* AuthService */],
                /*Push,*/
                __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__["a" /* Diagnostic */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_order_order__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_restaurants_restaurants__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_location_service__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_three_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_badge__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_network__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







/*import { LocationPage } from '../pages/location/location';*/








var MyApp = /** @class */ (function () {
    function MyApp(platform, events, locationTracker, alertCtrl, toastCtrl, loadingCtrl, statusBar, splashScreen, threeService, app, badge, afd, 
        /*private backgroundMode: BackgroundMode,*/
        network) {
        var _this = this;
        this.platform = platform;
        this.events = events;
        this.locationTracker = locationTracker;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.threeService = threeService;
        this.app = app;
        this.badge = badge;
        this.afd = afd;
        this.network = network;
        this.noConnection = false;
        this.firestore = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.database().ref('/drivers');
        this.events.subscribe('user:created', function () {
            console.log("i am clicking");
            _this.locationTracker.startTracking();
        });
        this.initializeApp();
        this.pages = [
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["c" /* ProfilePage */] },
            { title: 'Orders', component: __WEBPACK_IMPORTED_MODULE_4__pages_order_order__["b" /* OrderPage */] },
            { title: 'Chefs', component: __WEBPACK_IMPORTED_MODULE_7__pages_restaurants_restaurants__["a" /* RestaurantsPage */] },
            { title: 'Logout', component: 'Logout' }
        ];
    }
    MyApp.prototype.noConnectionToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Lost Internet connection!',
            duration: 3000,
            position: 'bottom' //top,middle,bottom
        });
        toast.present();
        this.noConnection = true;
    };
    MyApp.prototype.retry = function (event) {
        this.noConnection = false;
        /*this.loading = this.loadingCtrl.create({
          spinner: 'bubbles'
        });
        this.loading.present();*/
        if (this.network['type'] == 'none') {
            this.loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                duration: 3000
            });
            this.loading.present();
            this.noConnectionToast();
            /*this.loading.dismiss();*/
        }
        else {
            this.onConnectFunction();
        }
    };
    MyApp.prototype.setBadge = function (budgeNumber) {
        // this.badge.set(budgeNumber);
        console.log("set Badge");
    };
    MyApp.prototype.getBadge = function () {
        console.log('get Badge');
        //   this.badge.get().then(count => {
        //    this.totalbudgeCount = count;
        //  });
    };
    MyApp.prototype.clearBadge = function () {
        console.log('clearBadge');
        // this.badge.clear();
    };
    MyApp.prototype.increaseBadge = function () {
        console.log('increasing badge by 1');
        //  this.badge.increase(1);
    };
    MyApp.prototype.registerRequestPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isSupported, hasPermission, permission, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.badge.isSupported()];
                    case 1:
                        isSupported = _a.sent();
                        console.log("isSupported", isSupported);
                        return [4 /*yield*/, this.badge.hasPermission()];
                    case 2:
                        hasPermission = _a.sent();
                        console.log('app188hasPermission', hasPermission);
                        if (!hasPermission) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.badge.requestPermission()];
                    case 3:
                        permission = _a.sent();
                        console.log(permission);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.loadScript = function () {
        var node = document.createElement('script');
        node.src = 'http://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=places&key=AIzaSyB1IsrsMN22HB_fgAxG0i3Twes60dPF2EA';
        node.type = 'text/javascript';
        document.getElementsByTagName('body')[0].appendChild(node);
    };
    MyApp.prototype.onConnectFunction = function () {
        var _this = this;
        this.loadScript();
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            duration: 3000
        });
        this.loading.present();
        setTimeout(function () {
            if (localStorage.getItem('driver')) {
                if (_this.currentComponentPage == 'RestaurantsPage') {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_restaurants_restaurants__["a" /* RestaurantsPage */]);
                }
                else if (_this.currentComponentPage == 'ProfilePage') {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["c" /* ProfilePage */]);
                }
                else if (_this.currentComponentPage == 'OrderPage') {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_order_order__["b" /* OrderPage */]);
                }
                else {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_order_order__["b" /* OrderPage */]);
                }
                _this.getCurrentPage();
                _this.noConnection = false;
            }
            else {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                _this.getCurrentPage();
                _this.noConnection = false;
            }
            /*this.loading.dismiss();*/
        }, 2000);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        var _that = this;
        this.clearBadge();
        this.platform.ready().then(function () {
            _this.registerRequestPermission();
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
            if (_this.network['type'] == 'none') {
                _this.noConnection = true;
                _this.noConnectionToast();
            }
            else {
                _this.noConnection = false;
            }
            if (localStorage.getItem('driver')) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_order_order__["b" /* OrderPage */];
                setTimeout(function () {
                    _this.splashScreen.hide();
                    _this.events.publish('user:created');
                    _this.getCurrentPage();
                }, 500);
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                setTimeout(function () {
                    _this.splashScreen.hide();
                    _this.getCurrentPage();
                });
            }
            if (typeof FCMPlugin != 'undefined') {
                FCMPlugin.onNotification(function (data) {
                    if (typeof cordova != 'undefined') {
                        // cordova.plugins.notification.badge.increase(1, function (badge) {
                        //   console.log("badge => " ,badge);
                        // });
                    }
                    if (data.wasTapped) {
                        if (typeof cordova != 'undefined') {
                            _this.increaseBadge();
                            // cordova.plugins.notification.badge.decrease(1, function (badge) {
                            //   console.log("badge => " ,badge);
                            // });
                        }
                        _that.getOrder(data.orderId);
                    }
                    else {
                        if (typeof cordova != 'undefined') {
                            _this.clearBadge();
                        }
                        console.log("data.message", data.message);
                        var prompt_1 = _that.alertCtrl.create({
                            message: data.message,
                            buttons: [
                                {
                                    text: 'oK',
                                    handler: function (dataa) {
                                        _that.getOrder(data.orderId);
                                    }
                                }
                            ]
                        });
                        prompt_1.present();
                    }
                });
                FCMPlugin.onTokenRefresh(function (token) {
                    console.log(token);
                });
            }
            var disconnectSubscription = _this.network.onDisconnect().subscribe(function () {
                _this.retry('abc');
            });
            var connectSubscription = _this.network.onConnect().subscribe(function () {
                /*this.noConnection = false;
                this.loading = this.loadingCtrl.create({
                  spinner: 'bubbles'
                });
                this.loading.present();*/
                _this.onConnectFunction();
            });
            _this.statusBar.styleDefault();
        });
    };
    MyApp.prototype.getCurrentPage = function () {
        var _this = this;
        setTimeout(function () {
            var page = _this.app.getActiveNavs();
            if (page.length > 0) {
                console.log(page);
                _this.currentComponentPage = page[0].getViews()[0].name;
            }
        }, 1500);
    };
    MyApp.prototype.openPage = function (page) {
        if (page.component == 'Logout') {
            this.doLogout();
        }
        else {
            this.nav.setRoot(page.component);
            this.getCurrentPage();
        }
    };
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
    MyApp.prototype.removeToken = function () {
        // this.tokensetup();
        var driver = localStorage.getItem('driver');
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
    };
    MyApp.prototype.tokensetup = function () {
        var promise = new Promise(function (resolve, reject) {
            FCMPlugin.getToken(function (token) {
                resolve(token);
            }, function (err) {
                reject(err);
            });
        });
        return promise;
    };
    MyApp.prototype.doLogout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure ?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'oK',
                    handler: function (data) {
                        _this.removeToken();
                        // localStorage.clear();
                        //    localStorage.removeItem('driver');
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                        _this.getCurrentPage();
                    }
                }
            ]
        });
        prompt.present();
    };
    MyApp.prototype.getOrder = function (id) {
        var _this = this;
        this.threeService.getOrderById(id).subscribe(function (data) {
            if (!data.error) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_order_order__["a" /* OrderDetailPage */], {
                    orderDetail: data.message, noti: 'noti'
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header >\n\n    <ion-toolbar color="secondary">\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      \n\n      </button>\n\n      <!-- <button menuClose ion-item (click)="doLogout()">\n\n        Logout\n\n      </button> -->\n\n      \n\n    </ion-list> \n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n\n\n<ion-row *ngIf = "noConnection" class="noconnection" (tap)="retry($event)">\n\n  <ion-col no-padding col-12 text-center>\n\n    <ion-icon name ="refresh" ios="ios-refresh" md="md-refresh"></ion-icon>\n\n  </ion-col>\n\n  <ion-col no-padding col-12 text-center>Tap to Reload</ion-col>\n\n</ion-row>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_8__services_location_service__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__services_three_service__["a" /* ThreeService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_network__["a" /* Network */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 363,
	"./af.js": 363,
	"./ar": 364,
	"./ar-dz": 365,
	"./ar-dz.js": 365,
	"./ar-kw": 366,
	"./ar-kw.js": 366,
	"./ar-ly": 367,
	"./ar-ly.js": 367,
	"./ar-ma": 368,
	"./ar-ma.js": 368,
	"./ar-sa": 369,
	"./ar-sa.js": 369,
	"./ar-tn": 370,
	"./ar-tn.js": 370,
	"./ar.js": 364,
	"./az": 371,
	"./az.js": 371,
	"./be": 372,
	"./be.js": 372,
	"./bg": 373,
	"./bg.js": 373,
	"./bm": 374,
	"./bm.js": 374,
	"./bn": 375,
	"./bn.js": 375,
	"./bo": 376,
	"./bo.js": 376,
	"./br": 377,
	"./br.js": 377,
	"./bs": 378,
	"./bs.js": 378,
	"./ca": 379,
	"./ca.js": 379,
	"./cs": 380,
	"./cs.js": 380,
	"./cv": 381,
	"./cv.js": 381,
	"./cy": 382,
	"./cy.js": 382,
	"./da": 383,
	"./da.js": 383,
	"./de": 384,
	"./de-at": 385,
	"./de-at.js": 385,
	"./de-ch": 386,
	"./de-ch.js": 386,
	"./de.js": 384,
	"./dv": 387,
	"./dv.js": 387,
	"./el": 388,
	"./el.js": 388,
	"./en-SG": 389,
	"./en-SG.js": 389,
	"./en-au": 390,
	"./en-au.js": 390,
	"./en-ca": 391,
	"./en-ca.js": 391,
	"./en-gb": 392,
	"./en-gb.js": 392,
	"./en-ie": 393,
	"./en-ie.js": 393,
	"./en-il": 394,
	"./en-il.js": 394,
	"./en-nz": 395,
	"./en-nz.js": 395,
	"./eo": 396,
	"./eo.js": 396,
	"./es": 397,
	"./es-do": 398,
	"./es-do.js": 398,
	"./es-us": 399,
	"./es-us.js": 399,
	"./es.js": 397,
	"./et": 400,
	"./et.js": 400,
	"./eu": 401,
	"./eu.js": 401,
	"./fa": 402,
	"./fa.js": 402,
	"./fi": 403,
	"./fi.js": 403,
	"./fo": 404,
	"./fo.js": 404,
	"./fr": 405,
	"./fr-ca": 406,
	"./fr-ca.js": 406,
	"./fr-ch": 407,
	"./fr-ch.js": 407,
	"./fr.js": 405,
	"./fy": 408,
	"./fy.js": 408,
	"./ga": 409,
	"./ga.js": 409,
	"./gd": 410,
	"./gd.js": 410,
	"./gl": 411,
	"./gl.js": 411,
	"./gom-latn": 412,
	"./gom-latn.js": 412,
	"./gu": 413,
	"./gu.js": 413,
	"./he": 414,
	"./he.js": 414,
	"./hi": 415,
	"./hi.js": 415,
	"./hr": 416,
	"./hr.js": 416,
	"./hu": 417,
	"./hu.js": 417,
	"./hy-am": 418,
	"./hy-am.js": 418,
	"./id": 419,
	"./id.js": 419,
	"./is": 420,
	"./is.js": 420,
	"./it": 421,
	"./it-ch": 422,
	"./it-ch.js": 422,
	"./it.js": 421,
	"./ja": 423,
	"./ja.js": 423,
	"./jv": 424,
	"./jv.js": 424,
	"./ka": 425,
	"./ka.js": 425,
	"./kk": 426,
	"./kk.js": 426,
	"./km": 427,
	"./km.js": 427,
	"./kn": 428,
	"./kn.js": 428,
	"./ko": 429,
	"./ko.js": 429,
	"./ku": 430,
	"./ku.js": 430,
	"./ky": 431,
	"./ky.js": 431,
	"./lb": 432,
	"./lb.js": 432,
	"./lo": 433,
	"./lo.js": 433,
	"./lt": 434,
	"./lt.js": 434,
	"./lv": 435,
	"./lv.js": 435,
	"./me": 436,
	"./me.js": 436,
	"./mi": 437,
	"./mi.js": 437,
	"./mk": 438,
	"./mk.js": 438,
	"./ml": 439,
	"./ml.js": 439,
	"./mn": 440,
	"./mn.js": 440,
	"./mr": 441,
	"./mr.js": 441,
	"./ms": 442,
	"./ms-my": 443,
	"./ms-my.js": 443,
	"./ms.js": 442,
	"./mt": 444,
	"./mt.js": 444,
	"./my": 445,
	"./my.js": 445,
	"./nb": 446,
	"./nb.js": 446,
	"./ne": 447,
	"./ne.js": 447,
	"./nl": 448,
	"./nl-be": 449,
	"./nl-be.js": 449,
	"./nl.js": 448,
	"./nn": 450,
	"./nn.js": 450,
	"./pa-in": 451,
	"./pa-in.js": 451,
	"./pl": 452,
	"./pl.js": 452,
	"./pt": 453,
	"./pt-br": 454,
	"./pt-br.js": 454,
	"./pt.js": 453,
	"./ro": 455,
	"./ro.js": 455,
	"./ru": 456,
	"./ru.js": 456,
	"./sd": 457,
	"./sd.js": 457,
	"./se": 458,
	"./se.js": 458,
	"./si": 459,
	"./si.js": 459,
	"./sk": 460,
	"./sk.js": 460,
	"./sl": 461,
	"./sl.js": 461,
	"./sq": 462,
	"./sq.js": 462,
	"./sr": 463,
	"./sr-cyrl": 464,
	"./sr-cyrl.js": 464,
	"./sr.js": 463,
	"./ss": 465,
	"./ss.js": 465,
	"./sv": 466,
	"./sv.js": 466,
	"./sw": 467,
	"./sw.js": 467,
	"./ta": 468,
	"./ta.js": 468,
	"./te": 469,
	"./te.js": 469,
	"./tet": 470,
	"./tet.js": 470,
	"./tg": 471,
	"./tg.js": 471,
	"./th": 472,
	"./th.js": 472,
	"./tl-ph": 473,
	"./tl-ph.js": 473,
	"./tlh": 474,
	"./tlh.js": 474,
	"./tr": 475,
	"./tr.js": 475,
	"./tzl": 476,
	"./tzl.js": 476,
	"./tzm": 477,
	"./tzm-latn": 478,
	"./tzm-latn.js": 478,
	"./tzm.js": 477,
	"./ug-cn": 479,
	"./ug-cn.js": 479,
	"./uk": 480,
	"./uk.js": 480,
	"./ur": 481,
	"./ur.js": 481,
	"./uz": 482,
	"./uz-latn": 483,
	"./uz-latn.js": 483,
	"./uz.js": 482,
	"./vi": 484,
	"./vi.js": 484,
	"./x-pseudo": 485,
	"./x-pseudo.js": 485,
	"./yo": 486,
	"./yo.js": 486,
	"./zh-cn": 487,
	"./zh-cn.js": 487,
	"./zh-hk": 488,
	"./zh-hk.js": 488,
	"./zh-tw": 489,
	"./zh-tw.js": 489
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 704;

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OrderPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_three_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_four_service__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_one_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_global__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/


var OrderPage = /** @class */ (function () {
    /*cashArray: any = [];*/
    function OrderPage(navCtrl, navParams, modalCtrl, threeService, oneService, loadingCtrl, toastCtrl, alertCtrl, afd) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.threeService = threeService;
        this.oneService = oneService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.afd = afd;
        this.compOrders = [];
        this.pendorders = [];
        this.toacceptorders = [];
        this.totalCash = 0;
        this.orderStatus = "pending";
        /*items: Observable<any[]>;*/
        /*itemRef: AngularFireObject<any>;
        item: Observable<any>;*/
        this.firestore = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref('/drivers');
        /*firemsg = firebase.database().ref('/messages');*/
        this.pushtokens = [];
        if (localStorage.getItem('driver')) {
            this.driver = JSON.parse(localStorage.getItem('driver'));
            if (typeof this.driver.kitchensallow == 'undefined') {
                this.driver.kitchensallow = [];
            }
        }
        var allowedResturants = [];
        this.oneService.getRestaurants().subscribe(function (resturants) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var zipCodes, j, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(resturants, 'Resturants');
                        console.log(this.driver, "Driver");
                        zipCodes = this.driver.zip.split(',');
                        for (j = 0; j < zipCodes.length; j++) {
                            for (i = 0; i < resturants.message.length; i++) {
                                if (zipCodes[j] && resturants.message[i].zipcode && resturants.message[i].zipcode.toLowerCase() === zipCodes[j].toLowerCase()) {
                                    allowedResturants.push({
                                        resId: resturants.message[i]._id,
                                        status: true
                                    });
                                }
                            }
                        }
                        if (!(allowedResturants != this.driver.kitchensallow)) return [3 /*break*/, 2];
                        console.log(allowedResturants, 'Allowed Resturant');
                        this.driver.kitchensallow = allowedResturants;
                        return [4 /*yield*/, this.oneService.editDriver({
                                _id: this.driver._id,
                                kitchensallow: allowedResturants
                            }).subscribe(function (res) {
                                console.log(res);
                                _this.driver = res.message;
                                localStorage.setItem('driver', JSON.stringify(res.message));
                            }, function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    OrderPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getDriver();
            refresher.complete();
        }, 2000);
    };
    OrderPage.prototype.ionViewDidEnter = function () {
        this.getDriver();
    };
    OrderPage.prototype.getDriver = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.oneService.getDriver(this.driver._id).subscribe(function (data) {
            if (!data.error) {
                _this.driver = data.message;
                _this.getOrders();
                localStorage.removeItem('driver');
                localStorage.setItem('driver', JSON.stringify(data.message));
            }
            else {
                _this.getOrders();
            }
        }, function (err) {
            _this.getOrders();
        });
    };
    OrderPage.prototype.formatDate = function (obj) {
        return obj.toString().replace(/\s/g, "T");
    };
    OrderPage.prototype.getOrders = function () {
        var _this = this;
        var allowids = { rids: [] };
        if (this.driver['kitchensallow'].length > 0) {
            this.driver['kitchensallow'].forEach(function (element) {
                if (element.status) {
                    allowids.rids.push(element.resId);
                }
            });
        }
        this.threeService.getOrders(allowids).subscribe(function (data) {
            console.log(data.message, "this is me");
            if (!data.error) {
                if (data.message.length > 0) {
                    _this.totalCash = 0;
                    data.message.forEach(function (order) {
                        console.log(order['paymenttype'] == 'cash', "condition one");
                        if (order['paymenttype'] == 'Cash' && ((order.status == 'driveraccepted' || order.status == 'delivered') && order.driverDetail != undefined && order.driverDetail['_id'] == _this.driver['_id'])) {
                            _this.totalCash += order['total'];
                            console.log(_this.totalCash, "testtt");
                        }
                    });
                    console.log(data.message, 'GET ALL ORDERS');
                    _this.pendorders = data.message.filter(function (index) {
                        return ((index.status == 'accepted') && typeof index.driverDetail == 'undefined') || (index.driverDetail && (index.status == 'driveraccepted' || index.status == 'ontheway') && index.driverDetail['_id'] == _this.driver['_id']);
                    });
                    console.log('Showing Detail of Order', _this.pendorders);
                    _this.compOrders = data.message.filter(function (index) {
                        if (typeof index.driverDetail != 'undefined') {
                            return (index.status == 'delivered' && index.driverDetail['_id'] == _this.driver['_id']);
                        }
                    });
                }
            }
            _this.loading.dismiss();
        }, function (err) {
            _this.loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Unable to load orders! Please check your Internet connection.',
                duration: 3000,
                position: 'top' //top,middle,bottom
            });
            toast.present();
        });
    };
    OrderPage.prototype.ionViewDidLoad = function () {
        this.getToken();
    };
    OrderPage.prototype.getToken = function () {
        var _this = this;
        var itemRef = this.afd.object('drivers');
        itemRef.snapshotChanges().subscribe(function (action) {
            var arr = action.payload.val();
            var pushArr = [];
            for (var k in arr) {
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({ 'key': k, 'driverId': arr[k].driverId });
                }
            }
            _this.pushtokens = pushArr;
        });
        setTimeout(function () {
            _this.tokensetup().then(function (token) {
                if (_this.pushtokens && _this.pushtokens.length > 0) {
                    var indx = _this.pushtokens.findIndex(function (mn) { return mn.driverId == _this.driver['_id']; });
                    if (indx > -1) {
                        _this.updateToken(_this.pushtokens[indx]['key'], token);
                    }
                    else {
                        _this.addToken(token);
                    }
                }
                else {
                    _this.addToken(token);
                }
            });
        }, 5000);
    };
    OrderPage.prototype.tokensetup = function () {
        var promise = new Promise(function (resolve, reject) {
            FCMPlugin.getToken(function (token) {
                resolve(token);
            }, function (err) {
                reject(err);
            });
        });
        return promise;
    };
    OrderPage.prototype.addToken = function (t) {
        this.afd.list(this.firestore).push({
            driverId: this.driver['_id'],
            resID: this.driver.kitchensallow,
            devtoken: t
        }).then(function () {
            console.log('Token stored');
        });
    };
    OrderPage.prototype.updateToken = function (key, t) {
        this.afd.list(this.firestore).update(key, { devtoken: t, resID: this.driver.kitchensallow }).then(function () {
            console.log('Token Updated');
        });
    };
    OrderPage.prototype.openDetail = function (index, type) {
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
    };
    OrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\order\order.html"*/'<ion-header>\n\n    <ion-navbar color="secondary"> \n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Orders</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding-no>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n    \n\n    <ion-item class="p-0">\n\n        <ion-row class="px-4">Summary </ion-row>\n\n    </ion-item>\n\n        <ion-row>\n\n            \n\n        </ion-row>\n\n    <ion-row class="summaryClass p-0" >\n\n        <ion-col col-12 text-center >\n\n            <h4 class="m-0 pt-2">{{totalCash |number : \'1.2-2\'}} CAD</h4>\n\n            <div class="amountDescription pb-3">Total Cash Received</div>\n\n        </ion-col>\n\n        <!-- <ion-col col-6 text-center>\n\n            <h4  class="m-0 pt-2">${{totalTip |number : \'1.2-2\'}}</h4>\n\n            <div class="amountDescription pb-3">Total driver tip received</div>\n\n        </ion-col> -->\n\n    </ion-row>\n\n<hr class="m-0">\n\n    <ion-segment [(ngModel)]="orderStatus" color="secondary" class="mb-2">\n\n        <ion-segment-button value="pending">\n\n            Pending\n\n        </ion-segment-button>\n\n        <ion-segment-button value="completed">\n\n            Completed\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n\n\n    <div [ngSwitch]="orderStatus">\n\n        <ion-list *ngSwitchCase="\'pending\'">\n\n            <h3 *ngIf="pendorders?.length == 0" class="text-center">No orders</h3>\n\n            <div *ngFor="let order of pendorders; let i = index ">\n\n                <ion-item  (click)="openDetail(i, \'pending\')" [ngClass]=\'(order.status == "driveraccepted" && order.driverDetail._id == driver._id)? "bgSuccess": "bg-white" \'>\n\n\n\n                    <h2><ion-icon name="pizza"></ion-icon> &nbsp; #{{order._id.substr(18,6)}}</h2>\n\n\n\n                    <h3 class="whiteSpaceInitial"><ion-icon name="pin"></ion-icon> &nbsp; {{order.fulladdress.address}}</h3>\n\n\n\n                    <ion-row class="whiteSpaceInitial">Total Amount : &nbsp; <strong><span *ngIf = "order.currency">{{order.currency}} </span>{{order.total | number : \'1.2-2\'}}</strong> &nbsp; <span text-capitalize> ( {{order.paymenttype}} )</span> </ion-row>\n\n\n\n                    <ion-row *ngIf="order.status == \'completed\' || order.status == \'driverrejected\'"><strong text-capitalize>Order Prepared</strong> &nbsp;(Waiting for Driver)\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="order.status == \'driveraccepted\'"><strong text-capitalize>In Process</strong></ion-row>\n\n                    <ion-row *ngIf="order.status == \'delivered\'"><strong text-capitalize>Delivered</strong></ion-row>\n\n\n\n                    <ion-row><ion-icon name="time"></ion-icon> &nbsp; {{ formatDate(order.ordertiming.datetime)  | date:\'medium\'}}</ion-row>\n\n\n\n                    <!-- <h2 class="whiteSpaceInitial"><ion-icon name="pin"></ion-icon> &nbsp; {{order.fulladdress.address}}</h2>\n\n\n\n                    <p class="text-capitalize"><span class="bg-success text-white px-1 rounded" *ngIf="order.total"> <span *ngIf = "order.currency">{{order.currency}}</span> {{order.total | number : \'1.2-2\'}}</span><span> {{order.paymenttype}}</span></p>\n\n\n\n                    <p><ion-icon name="time"></ion-icon> &nbsp; {{order.created_at| date:\'shortTime\'}} {{order.created_at| date}}</p> -->\n\n\n\n\n\n                    <!-- <button ion-button clear item-end color="secondary">View</button> -->\n\n\n\n                </ion-item>\n\n            </div>\n\n        </ion-list>\n\n        \n\n        <ion-list *ngSwitchCase="\'completed\'">\n\n            <h3 *ngIf="compOrders?.length == 0" class="text-center">No orders</h3>\n\n            <div  *ngFor="let order of compOrders;let i = index ">\n\n                <ion-item (click)="openDetail(i, \'completed\')"> \n\n                    <h2><ion-icon name="pizza"></ion-icon> &nbsp; #{{order._id.substr(18,6)}}</h2>\n\n\n\n                    <h3 class="whiteSpaceInitial"><ion-icon name="pin"></ion-icon> &nbsp; {{order.fulladdress.address}}</h3>\n\n\n\n                    <ion-row class="whiteSpaceInitial">Total Amount : &nbsp; <strong><span *ngIf = "order.currency">{{order.currency}} </span>{{order.total | number : \'1.2-2\'}}</strong> &nbsp; <span text-capitalize> ( {{order.paymenttype}} )</span> </ion-row>\n\n\n\n                    <ion-row *ngIf="order.status == \'delivered\'"><strong text-capitalize>Delivered</strong></ion-row>\n\n\n\n                    <ion-row><ion-icon name="time"></ion-icon> \n\n                        &nbsp; {{formatDate(order.ordertiming.datetime) | date:\'medium\'}}</ion-row>\n\n\n\n\n\n                    <!-- <h2 class="whiteSpaceInitial"><ion-icon name="pin"></ion-icon> &nbsp; {{order.fulladdress.address}}</h2>\n\n\n\n                    <p class="text-capitalize"><span class="bg-success text-white px-1 rounded" *ngIf="order.total"><span *ngIf = "order.currency">{{order.currency}}</span>{{order.total |number : \'1.2-2\' }}</span><span> {{order.paymenttype}}</span></p>\n\n\n\n                    <p><ion-icon name="time"></ion-icon> &nbsp; {{order.created_at| date:\'shortTime\'}} {{order.created_at| date}}</p> -->\n\n                    <!-- <button ion-button clear item-end color="secondary" >View</button> -->\n\n\n\n                </ion-item>\n\n            </div>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\order\order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__services_three_service__["a" /* ThreeService */],
            __WEBPACK_IMPORTED_MODULE_4__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], OrderPage);
    return OrderPage;
}());

var OrderDetailPage = /** @class */ (function () {
    function OrderDetailPage(navCtrl, navParams, modalCtrl, fourService, oneService, threeService, afd, loadingCtrl, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.fourService = fourService;
        this.oneService = oneService;
        this.threeService = threeService;
        this.afd = afd;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.imageURL = __WEBPACK_IMPORTED_MODULE_6__services_global__["a" /* imageUrl */];
        this.firebaseOrders = [];
        this.firestore = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref('/orders');
        if (localStorage.getItem('driver')) {
            this.driver = JSON.parse(localStorage.getItem('driver'));
        }
        this.orderDetail = navParams.get("orderDetail");
        this.getTaxAmmount();
        this.fromNoti = navParams.get("noti");
        oneService.getRestaurant(this.orderDetail['restaurantid']).subscribe(function (data) {
            if (!data.error && data.message != null) {
                _this.orderDetail.restaurantData = data.message;
                if (_this.orderDetail['ordertiming']['type'] == 'now') {
                    if (typeof data.message['mindeliveryime'] != 'undefined' && data.message['mindeliveryime'] != null && data.message['mindeliveryime'] != '' && parseInt(data.message['mindeliveryime']) > 0) {
                        _this.orderDetail['ordertiming']['datetime'] = _this.addMinTime(data.message['mindeliveryime']);
                    }
                }
            }
        }, function (err) {
            _this.presentToast('Unable to load Chef detail. Please check your Internet connection');
        });
        fourService.getCustomers(this.orderDetail['customerid']).subscribe(function (data) {
            if (!data.error && data.message != null) {
                _this.orderDetail.customerData = data.message;
            }
        }, function (err) {
            _this.presentToast('Unable to load Customer detail. Please check your Internet connection');
        });
        setTimeout(function () {
            if (typeof _this.orderDetail.customerData != 'undefined') {
                _this.loadMap();
            }
        }, 1000);
    }
    OrderDetailPage.prototype.addMinTime = function (time) {
        var date = new Date(this.orderDetail['ordertiming']['datetime']);
        date.setMinutes(date.getMinutes() + parseInt(time));
        var returnDate = this.getFormattedDate(date);
        return returnDate;
    };
    OrderDetailPage.prototype.getDateOfDailyMenu = function () {
        if (this.orderDetail && this.orderDetail.ordertiming && this.orderDetail.ordertiming.datetime) {
            var DailyMenuDate = this.orderDetail.ordertiming.datetime.split(' ');
            if (DailyMenuDate.length > 0) {
                return __WEBPACK_IMPORTED_MODULE_5_moment___default()(DailyMenuDate[0], 'YYYY-MM-DD').format('MMMM  DD,YYYY');
            }
        }
    };
    OrderDetailPage.prototype.getTimeOfDailyMenuForDelivery = function () {
        if (this.orderDetail && this.orderDetail.ordertiming) {
            var DailyMenuDate = this.orderDetail.ordertiming.datetime.split(' ');
            if (DailyMenuDate.length > 2) {
                return DailyMenuDate[1] + ' ' + DailyMenuDate[2];
            }
            else {
                return this.tConvert(DailyMenuDate[1]);
            }
        }
    };
    OrderDetailPage.prototype.getDateOfWeekend = function (pkg) {
        var packageStartDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(pkg.startDate, 'YYYY-MM-DD').format('MMM  DD,YYYY');
        return __WEBPACK_IMPORTED_MODULE_5_moment___default.a.utc(packageStartDate).format('LL');
    };
    OrderDetailPage.prototype.getTimeOfWeekendForDelivery = function () {
        var time = this.orderDetail.delvierySlot.deliveryTime.split(":");
        return this.tConvert(this.orderDetail.delvierySlot.deliveryTime);
    };
    OrderDetailPage.prototype.getDateOfFirstWeekly = function (pkg) {
        var packageStartDate = this.getPackageStartDate(pkg.startdate, this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime, 'fixed', 'subtract').format('MMM DD,YYYY');
        return __WEBPACK_IMPORTED_MODULE_5_moment___default.a.utc(packageStartDate).format('LL');
    };
    OrderDetailPage.prototype.getTimeOfFirstWeeklyDelivery = function () {
        return this.tConvert(this.orderDetail.delvierySlotsWeek.deliveryFirstTime);
    };
    OrderDetailPage.prototype.getDateOfSecondWeekly = function (pkg) {
        var packageStartDate = this.getPackageStartDate(pkg.startdate, this.orderDetail.delvierySlotsWeek.Secondday, this.orderDetail.delvierySlotsWeek.deliverySecondTime, 'fixed', 'add').format('MMM DD,YYYY');
        // let formatedDate = moment(packageStartDate, 'YYYY-MM-DD')
        return __WEBPACK_IMPORTED_MODULE_5_moment___default.a.utc(packageStartDate).format('LL');
    };
    OrderDetailPage.prototype.getTimeOfSecondForDelivery = function (pkg) {
        return this.tConvert(this.orderDetail.delvierySlotsWeek.deliverySecondTime);
    };
    OrderDetailPage.prototype.getDateOfWeeklyOnce = function (pkg) {
        var packageStartDate = this.getPackageStartDate(pkg.startdate, this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime, 'fixed', 'subtract').format('MMM DD,YYYY');
        return __WEBPACK_IMPORTED_MODULE_5_moment___default.a.utc(packageStartDate).format('LL');
    };
    OrderDetailPage.prototype.getTimeOfWeeklyForDeliveryOnce = function () {
        return this.tConvert(this.orderDetail.delvierySlotsWeek.deliveryFirstTime);
    };
    OrderDetailPage.prototype.tConvert = function (time) {
        // Check correct time format and split into components
        var hour = (time.split(':'))[0];
        var min = (time.split(':'))[1];
        var part = hour > 12 ? 'PM' : 'AM';
        min = (min + '').length == 1 ? "0" + min : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? "0" + hour : hour;
        return (hour + ":" + min + " " + part);
    };
    OrderDetailPage.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        var hr = date.getHours().toString();
        hr = hr.length > 1 ? hr : '0' + hr;
        var min = date.getMinutes().toString();
        min = min.length > 1 ? min : '0' + min;
        return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
    };
    OrderDetailPage.prototype.formatDate = function (obj) {
        return obj.toString().replace(/\s/g, "T");
    };
    OrderDetailPage.prototype.formatDateForDetailOrderTiming = function (obj) {
        console.log(obj);
    };
    OrderDetailPage.prototype.getPkgStatus = function (detail) {
        var date = new Date(detail.date);
        var currentDate = new Date();
        var dateDate = currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
        if (detail.date == dateDate) {
            if (detail.status) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else {
            var dateTime = date.getTime();
            var currentDateTime = currentDate.getTime();
            var dayDiff = void 0;
            if (currentDateTime > dateTime) {
                if (detail.status) {
                    return 0;
                }
                else {
                    return 3;
                }
            }
            else {
                return 2;
            }
        }
    };
    OrderDetailPage.prototype.getTaxAmmount = function () {
        if (typeof this.orderDetail['discount'] != 'undefined') {
            this.taxAmmount = (this.orderDetail['subtotal'] + this.orderDetail['deliveryCharges'] - this.orderDetail['discount']) * (this.orderDetail['tax'] / 100);
        }
        else {
            this.taxAmmount = (this.orderDetail['subtotal'] + this.orderDetail['deliveryCharges']) * (this.orderDetail['tax'] / 100);
        }
    };
    OrderDetailPage.prototype.startTracking = function () {
        var div = document.getElementById('map');
        if (div.style.height == '300px') {
            div.style.height = '0';
        }
        else {
            div.style.height = '300px';
        }
    };
    OrderDetailPage.prototype.itemImage = function (img) {
        var imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res2.jpg";
        }
        return imgPath;
    };
    OrderDetailPage.prototype.loadMap = function () {
        var mapOptions = {
            center: new google.maps.LatLng(this.orderDetail['fulladdress'].lat, this.orderDetail['fulladdress'].lng),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var infowindow = new google.maps.InfoWindow();
        // driver
        var latLng = new google.maps.LatLng(this.driver.lat, this.driver.lng);
        var marker = new google.maps.Marker({
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
    };
    OrderDetailPage.prototype.showRoute = function (map) {
        var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        var directionsService = new google.maps.DirectionsService;
        directionsDisplay.setMap(map);
        var origin = { location: new google.maps.LatLng(this.driver.lat, this.driver.lng), stopover: true };
        directionsService.route({
            origin: origin['location'],
            destination: new google.maps.LatLng(this.orderDetail.fulladdress.lat, this.orderDetail.fulladdress.lng),
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Unable to display Route on Map!');
            }
        });
    };
    OrderDetailPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    OrderDetailPage.prototype.changeDailyMenuStatus = function (status, orderid) {
        var _this = this;
        console.log(orderid, 'ORder ID', this.orderDetail, 'Order Details');
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        for (var i = 0; i < this.orderDetail.items.length; i++) {
            this.orderDetail.items[i].orderStatus = status;
        }
        var obj = {
            id: orderid,
            items: this.orderDetail.items
        };
        var deliverdAllPackages = true;
        for (var i = 0; i < this.orderDetail.package.length; i++) {
            if (this.orderDetail.package[i].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
                break;
            }
        }
        if (this.orderDetail.items.length > 0) {
            if (this.orderDetail.items[0].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
            }
        }
        if (deliverdAllPackages) {
            obj.status = 'delivered';
            this.changeFirebaseOrderStatus('delivered');
        }
        this.threeService.getOrderById(this.orderDetail._id).subscribe(function (data) {
            if (data.message && data.message.driverDetail && _this.orderDetail.driverDetail && data.message.driverDetail._id == _this.orderDetail.driverDetail._id) {
                console.log("603 , Change MEnu Status");
                _this.threeService.updateOrdersStatus(obj).subscribe(function (data) {
                    loading.dismiss();
                    if (!data.error) {
                    }
                    _this.getOrder();
                });
            }
            else {
                loading.dismiss();
                _this.presentToast('Unable to update. Please refresh and try again!');
            }
        });
    };
    OrderDetailPage.prototype.changePackageStatus = function (status, orderid, pkg) {
        var _this = this;
        pkg.orderStatus = status;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = {
            id: orderid,
            package: this.orderDetail.package
        };
        var deliverdAllPackages = true;
        for (var i = 0; i < this.orderDetail.package.length; i++) {
            if (this.orderDetail.package[i].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
                break;
            }
        }
        if (this.orderDetail.items.length > 0) {
            if (this.orderDetail.items[0].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
            }
        }
        if (deliverdAllPackages) {
            obj.status = 'delivered';
            this.changeFirebaseOrderStatus('delivered');
        }
        this.threeService.getOrderById(this.orderDetail._id).subscribe(function (data) {
            if (data.message && data.message.driverDetail && _this.orderDetail.driverDetail && data.message.driverDetail._id == _this.orderDetail.driverDetail._id) {
                console.log("changePackageStatus,6522");
                _this.threeService.updateOrdersStatus(obj).subscribe(function (data) {
                    loading.dismiss();
                    if (!data.error) {
                    }
                    _this.getOrder();
                });
            }
            else {
                loading.dismiss();
                _this.presentToast('Unable to update. Please refresh and try again!');
            }
        });
    };
    OrderDetailPage.prototype.changeStatus = function (status, id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = {
            id: id,
            status: status
        };
        if (status == 'driveraccepted') {
            for (var i = 0; i < this.orderDetail.package.length; i++) {
                if (this.orderDetail.package[i].orderStatus != 'delivered') {
                    this.orderDetail.package[i].orderStatus = 'driveraccepted';
                }
            }
            for (var i = 0; i < this.orderDetail.items.length; i++) {
                if (this.orderDetail.items[i].orderStatus != 'delivered') {
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
            };
        }
        if (this.orderDetail['items'].length == 0 && this.orderDetail['combo'].length == 0) {
            obj['menuStatus'] = true;
        }
        this.threeService.getOrderById(id).subscribe(function (order) {
            if (!order.error) {
                _this.orderDetail = order.message;
                if (_this.orderDetail.status != 'driveraccepted') {
                    _this.threeService.updateOrdersStatus(obj).subscribe(function (data) {
                        loading.dismiss();
                        if (!data.error) {
                            _this.getOrder();
                            if (status == 'driveraccepted') {
                                _this.presentToast('Order Accepted Successfully');
                            }
                            else {
                                _this.presentToast('Order Rejected Successfully. But you can still accept it untill another driver accept this order');
                            }
                            _this.changeFirebaseOrderStatus(status);
                            if (typeof _this.fromNoti == 'undefined' || _this.fromNoti != 'noti') {
                                _this.navCtrl.pop();
                            }
                        }
                        else {
                            _this.presentToast('Unable to update. Please try again!');
                        }
                    }, function (err) {
                        _this.presentToast('Unable to Update status. Please check your Internet connection!');
                    });
                }
                else {
                    loading.dismiss();
                    _this.presentToast('Order is already accepted by another driver');
                    if (typeof _this.fromNoti == 'undefined' || _this.fromNoti != 'noti') {
                        _this.navCtrl.pop();
                    }
                }
            }
            else {
                loading.dismiss();
                _this.presentToast('Unable to fetch data. Please try again!');
            }
        }, function (err) {
            _this.presentToast('Unable to Update status. Please check your Internet connection!');
        });
    };
    OrderDetailPage.prototype.getOrder = function () {
        var _this = this;
        this.threeService.getOrderById(this.orderDetail._id).subscribe(function (order) {
            if (!order.error) {
                _this.orderDetail = order.message;
                //  this.checkIfAllDelivered(this.orderDetail['package']);
                _this.oneService.getRestaurant(_this.orderDetail['restaurantid']).subscribe(function (data) {
                    if (!data.error) {
                        _this.orderDetail.restaurantData = data.message;
                    }
                });
                _this.fourService.getCustomers(_this.orderDetail['customerid']).subscribe(function (data) {
                    if (!data.error && data.message != null) {
                        _this.orderDetail.customerData = data.message;
                    }
                });
            }
        }, function (err) {
            _this.presentToast('Unable to load data. Please check your Internet connection!');
        });
    };
    OrderDetailPage.prototype.changeFirebaseOrderStatus = function (type) {
        var _this = this;
        var itemRef = this.afd.object('orders');
        itemRef.snapshotChanges().subscribe(function (action) {
            var arr = action.payload.val();
            var pushArr = [];
            for (var k in arr) {
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({ 'key': k, 'orderDetail': arr[k] });
                }
            }
            _this.firebaseOrders = pushArr;
        });
        setTimeout(function () {
            if (_this.firebaseOrders && _this.firebaseOrders.length > 0) {
                var indx = _this.firebaseOrders.findIndex(function (mn) { return mn.orderDetail['orderID'] == _this.orderDetail['_id']; });
                if (indx > -1) {
                    _this.updateFirebaseOrderStatus(_this.firebaseOrders[indx]['key'], type);
                }
            }
        }, 5000);
    };
    OrderDetailPage.prototype.updateFirebaseOrderStatus = function (key, type) {
        if (type == 'driveraccepted') {
            this.afd.list(this.firestore).update(key, { orderStatus: type, driverid: this.driver._id, type: 'item' }).then(function () {
                console.log('Order Updated');
            });
        }
        else {
            this.afd.list(this.firestore).update(key, { orderStatus: type, type: 'item', ordertype: 'home' }).then(function () {
                console.log('Order Updated');
            });
        }
    };
    OrderDetailPage.prototype.completeStatus = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            message: 'Confirm Items Delivery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        var obj = {
                            id: _this.orderDetail['_id'],
                            menuStatus: true
                        };
                        /*if (this.orderDetail['package'].length == 0) {
                          obj['status'] = 'delivered';
                        }*/
                        _this.threeService.updateOrdersStatus(obj).subscribe(function (data) {
                            if (!data.error) {
                                _this.getOrder();
                                _this.changeFirebaseOrderStatus('delivered');
                                _this.presentToast('Items Marked Delivered!');
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    OrderDetailPage.prototype.checkIfAllDelivered = function (pkg) {
        if (this.orderDetail['status'] != 'delivered') {
            if (pkg.length > 0) {
                var tmp_list = pkg.filter(function (a) {
                    return a.dayandmenus.some(function (b) {
                        return b.status == false;
                    });
                });
                if (tmp_list.length == 0 && this.orderDetail['menuStatus']) {
                    //update delivered
                    this.updateDeliver();
                }
            }
            else {
                if (this.orderDetail['menuStatus'] == true) {
                    this.updateDeliver();
                }
            }
        }
    };
    OrderDetailPage.prototype.updateDeliver = function () {
        var _this = this;
        console.log("Update Deliver 866");
        var obj = { id: this.orderDetail['_id'], status: 'delivered' };
        this.threeService.updateOrdersStatus(obj).subscribe(function (data) {
            if (!data.error) {
                _this.getOrder();
            }
        });
    };
    OrderDetailPage.prototype.getPackageStartDate = function (date, day, deliveryTime, type, behaviour) {
        // console.log(date,deliveryTime);
        var notificationDate;
        if (type == 'flexible') {
            notificationDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(date + ' ' + deliveryTime, 'yyyy-mm-dd hh:mm');
        }
        else {
            notificationDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(date + ' ' + deliveryTime);
        }
        // console.log(notificationDate,day );
        while (true) {
            // console.log(notificationDate.day() );
            if (notificationDate.day() == day) {
                // console.log(notificationDate);
                break;
            }
            if (behaviour == 'subtract') {
                notificationDate.subtract(1, 'd');
            }
            else {
                notificationDate.add(1, 'd');
            }
        }
        return notificationDate;
    };
    OrderDetailPage.prototype.checkOnAlter = function (status, orderid, pkg) {
        var _this = this;
        var mealPkg = {};
        var mealPkgDate = pkg['dayandmenus'][0]['date'];
        // let date = new Date();
        // let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        //  let today2 = new Date(mealPkgDate);
        // console.log("this function works",pkg);
        var packageStartDate;
        var today;
        if (pkg.type == 'flexible') {
            console.log("Weekend Packages", pkg, pkg.startDate + ' ' + this.orderDetail.delvierySlot.deliveryTime);
            packageStartDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(pkg.startDate + ' ' + this.orderDetail.delvierySlot.deliveryTime);
            today = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date());
        }
        else {
            if (this.orderDetail.delvierySlotsWeek.deliverySecondTime) {
                console.log("deliverySecondTime", pkg);
                if (pkg.orderStatus == 'driveraccepted' || pkg.orderStatus == 'OnTheWayForFirstWeek') {
                    packageStartDate = this.getPackageStartDate(pkg.startdate, this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime, 'fixed', 'subtract');
                    today = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date());
                    console.log(packageStartDate, "i am HERE");
                }
                else {
                    packageStartDate = this.getPackageStartDate(pkg.startdate, this.orderDetail.delvierySlotsWeek.Secondday, this.orderDetail.delvierySlotsWeek.deliverySecondTime, 'fixed', 'add');
                    today = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date());
                }
            }
            else {
                console.log("HERE ONCE TIME");
                packageStartDate = this.getPackageStartDate(pkg.startdate, this.orderDetail.delvierySlotsWeek.Firstday, this.orderDetail.delvierySlotsWeek.deliveryFirstTime, 'fixed', 'subtract');
                today = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date());
            }
        }
        if (pkg.status == 'delivered') {
            this.presentToast('Already marked Delivered');
        }
        else {
            console.log(packageStartDate, "packageStartDate");
            console.log(today, "today");
            var differenceBetweenDays = __WEBPACK_IMPORTED_MODULE_5_moment___default.a.duration(packageStartDate.diff(today));
            console.log(differenceBetweenDays);
            if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1 && differenceBetweenDays._data.hours < 6) {
                var title = '';
                var message = '';
                if (status == 'ontheway') {
                    title = 'On The Way';
                    message = 'Are you going to pick food from chef?';
                }
                else if (status == 'OnTheWayForFirstWeek') {
                    title = 'On The Way';
                    message = 'Are you going to pick food from chef?';
                }
                else {
                    title = 'Delivered ';
                    message = 'Have you delivered ?';
                }
                var prompt_1 = this.alertCtrl.create({
                    title: title,
                    message: message,
                    buttons: [
                        {
                            text: 'No',
                            handler: function (data) {
                            }
                        },
                        {
                            text: 'Yes',
                            handler: function (data) {
                                _this.changePackageStatus(status, orderid, pkg);
                            }
                        }
                    ]
                });
                prompt_1.present();
            }
            else {
                if (status == 'ontheway') {
                    this.presentToast("You Cannot On the way items it is for future dates!");
                }
                else {
                    this.presentToast("You Cannot Delivered  items it is for future dates!");
                }
            }
        }
    };
    OrderDetailPage.prototype.checkOnStatus = function (status, orderid) {
        var _this = this;
        if (this.orderDetail.ordertiming) {
            var DateSplite = this.orderDetail.ordertiming.datetime.split(" ");
            var DailyDate = DateSplite[0];
            var date = new Date();
            var today1 = new Date();
            var today2 = new Date(DailyDate);
            if (this.orderDetail.items.length > 0 && this.orderDetail.items[0].orderStatus == 'delivered') {
                this.presentToast('Already marked Delivered');
            }
            else {
                var packageStartDate = void 0;
                var today = void 0;
                packageStartDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.orderDetail.ordertiming.datetime);
                today = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date());
                var differenceBetweenDays = __WEBPACK_IMPORTED_MODULE_5_moment___default.a.duration(packageStartDate.diff(today));
                console.log(differenceBetweenDays);
                if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1 && differenceBetweenDays._data.hours < 6) {
                    var title = '';
                    var message = '';
                    if (status == 'ontheway') {
                        title = 'On The Way';
                        message = 'Are you going to pick food from chef?';
                    }
                    else if (status == 'OnTheWayForFirstWeek') {
                        title = 'On The Way';
                        message = 'Are you going to pick food from chef?';
                    }
                    else {
                        title = 'Delivered ';
                        message = 'Have you delivered ?';
                    }
                    var prompt_2 = this.alertCtrl.create({
                        title: title,
                        message: message,
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                }
                            },
                            {
                                text: 'Yes',
                                handler: function (data) {
                                    _this.changeDailyMenuStatus(status, orderid);
                                }
                            }
                        ]
                    });
                    prompt_2.present();
                }
                else {
                    if (status == 'ontheway') {
                        console.log(today1, today2);
                        this.presentToast("You Cannot On the way items it is for future dates!");
                    }
                    else {
                        this.presentToast("You Cannot Delivered  items it is for future dates!");
                    }
                }
            }
        }
    };
    OrderDetailPage.prototype.checkOnAlterDaily = function (status, orderid) {
        var _this = this;
        var mealPkg = {};
        if (this.orderDetail.ordertiming) {
            var DateSplite = this.orderDetail.ordertiming.datetime.split(" ");
            var DailyDate = DateSplite[0];
            var date = new Date();
            var today1 = new Date();
            var today2 = new Date(DailyDate);
            if (this.orderDetail.items.length > 0 && this.orderDetail.items[0].orderStatus == 'delivered') {
                this.presentToast('Already marked Delivered');
            }
            else {
                var packageStartDate = void 0;
                var today = void 0;
                packageStartDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.orderDetail.ordertiming.datetime);
                today = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date());
                var differenceBetweenDays = __WEBPACK_IMPORTED_MODULE_5_moment___default.a.duration(packageStartDate.diff(today));
                console.log(differenceBetweenDays);
                if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1 && differenceBetweenDays._data.hours < 6) {
                    var title = '';
                    var message = '';
                    if (status == 'ontheway') {
                        title = 'On The Way';
                        message = 'Are you going to pick food from chef?';
                    }
                    else if (status == 'OnTheWayForFirstWeek') {
                        title = 'On The Way';
                        message = 'Are you going to pick food from chef?';
                    }
                    else {
                        title = 'Delivered ';
                        message = 'Have you delivered ?';
                    }
                    var prompt_3 = this.alertCtrl.create({
                        title: title,
                        message: message,
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                }
                            },
                            {
                                text: 'Yes',
                                handler: function (data) {
                                    _this.changeDailyMenuStatus(status, orderid);
                                }
                            }
                        ]
                    });
                    prompt_3.present();
                }
                else {
                    if (status == 'ontheway') {
                        console.log(today1, today2);
                        this.presentToast("You Cannot On the way items it is for future dates!");
                    }
                    else {
                        this.presentToast("You Cannot Delivered  items it is for future dates!");
                    }
                }
            }
        }
    };
    OrderDetailPage.prototype.markDeliver = function (pkgIndex, dayandmenusIndex) {
        var _this = this;
        var pkg = this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex];
        var mealPkg = {};
        var mealPkgDate = this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['date'];
        var date = new Date();
        var today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var today2 = new Date(mealPkgDate);
        if (pkg.status) {
            this.presentToast('Already marked Delivered');
        }
        else {
            if (today1 >= today2) {
                var prompt_4 = this.alertCtrl.create({
                    title: 'Delivered',
                    message: "Have you delivered MenuItems of " + mealPkgDate + " ?",
                    buttons: [
                        {
                            text: 'No',
                            handler: function (data) {
                            }
                        },
                        {
                            text: 'Yes',
                            handler: function (data) {
                                var obj = {};
                                _this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['status'] = true;
                                mealPkg['date'] = _this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['date'];
                                mealPkg['status'] = _this.orderDetail.package[pkgIndex]['dayandmenus'][dayandmenusIndex]['status'];
                                obj['id'] = _this.orderDetail['_id'];
                                obj['package'] = _this.orderDetail['package'];
                                _this.threeService.updateOrdersStatus(obj).subscribe(function (data) {
                                    if (!data.error) {
                                        _this.getOrder();
                                        _this.sendPkgNoti(mealPkg);
                                        _this.presentToast('Items Marked Delivered!');
                                    }
                                });
                            }
                        }
                    ]
                });
                prompt_4.present();
            }
            else {
                this.presentToast('You Cannot delive2123r menu items of future dates!');
            }
        }
    };
    OrderDetailPage.prototype.sendPkgNoti = function (mealPkg) {
        var _this = this;
        var itemRef = this.afd.object('orders');
        itemRef.snapshotChanges().subscribe(function (action) {
            var arr = action.payload.val();
            var pushArr = [];
            for (var k in arr) {
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({ 'key': k, 'orderDetail': arr[k] });
                }
            }
            _this.firebaseOrders = pushArr;
        });
        setTimeout(function () {
            if (_this.firebaseOrders && _this.firebaseOrders.length > 0) {
                var indx = _this.firebaseOrders.findIndex(function (mn) { return mn.orderDetail['orderID'] == _this.orderDetail['_id']; });
                if (indx > -1) {
                    var mealP = [];
                    if (typeof _this.firebaseOrders[indx]['orderDetail'].mealPackage == 'undefined') {
                        mealP.push(mealPkg);
                    }
                    else {
                        mealP = _this.firebaseOrders[indx]['orderDetail'].mealPackage;
                        mealP.push(mealPkg);
                    }
                    _this.afd.list(_this.firestore).update(_this.firebaseOrders[indx]['key'], { date: mealPkg['date'], mealPackage: mealP, type: 'pkg' }).then(function () {
                        console.log('Order Updated');
                    });
                }
            }
        }, 5000);
    };
    //Ali Working On This
    OrderDetailPage.prototype.ComboOnStatus = function (status, orderid) {
        var _this = this;
        // this.orderDetail.status = status;
        // if(status == 'driveraccepted'){
        //   this.orderDetail.driverDetail = this.driver;
        // }
        // console.log(this.orderDetail,"recheck")
        // return;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var question = "";
        if (status == 'driveraccepted') {
            question = 'Are you sure you want to accept this order';
        }
        else if (status == 'ontheway') {
            question = 'Are you on the way to resturant?';
        }
        else if (status == 'delivered') {
            question = 'have to delivered the order?';
        }
        var prompt = this.alertCtrl.create({
            message: question,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.orderDetail.status = status;
                        if (status == 'driveraccepted') {
                            _this.orderDetail.driverDetail = _this.driver;
                        }
                        _this.threeService.statusUpdate(_this.orderDetail, _this.orderDetail._id).subscribe(function (res) {
                            if (!res.error) {
                            }
                            console.log(res);
                        });
                    }
                }
            ]
        });
        loading.dismiss();
        prompt.present();
    };
    OrderDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-detail',template:/*ion-inline-start:"D:\Caterdaay\driverApp\src\pages\order\order-detail.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Order Detail</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding *ngIf="orderDetail">\n\n\n\n    <ion-row class="whiteDiv">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Delivery Details :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Order ID : </strong>#{{orderDetail._id.substr(18,6)}}</ion-col>\n\n            <!-- <ion-col col-12><strong>Received at : </strong>{{formatDate(orderDetail.created_at) | date:\'medium\' }}</ion-col> -->\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <ion-row class="whiteDiv" *ngIf = "orderDetail.restaurantData">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Chef Detail :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12 text-capitalize><strong>Name : </strong>{{orderDetail.restaurantData.restaurantname}}</ion-col>\n\n            <ion-col col-12><strong>Address : </strong>{{orderDetail.restaurantData.address}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <ion-row class="whiteDiv">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12 text-capitalize>\n\n                <strong>Order Status :  </strong>\n\n                \n\n                <span *ngIf = "orderDetail.status == \'accepted\'||orderDetail.status == \'completed\' || orderDetail.status == \'driverrejected\'">&nbsp;Waiting for Driver Acceptance</span>\n\n                <span *ngIf = "orderDetail.status == \'driveraccepted\'">In Process</span>\n\n                <span *ngIf = "orderDetail.status == \'delivered\'">Delivered</span>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row class= "width100" *ngIf="orderDetail.status == \'completed\' || orderDetail.status == \'driverrejected\' && !orderDetail.driverDetail ">\n\n            <hr class="width100 height2px">\n\n            <ion-col col-12>\n\n                <button class="acceptButton" ion-button (click)="changeStatus(\'driveraccepted\', orderDetail._id)">Accept</button>\n\n\n\n                <button class="rejectButton themeRedBg" ion-button (click)="changeStatus(\'driverrejected\', orderDetail._id)">Reject</button>\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row padding-horizontal class= "width100" *ngIf="orderDetail.status == \'driveraccepted\' && orderDetail.driverDetail[\'_id\'] == driver[\'_id\']">\n\n            <!-- <ion-col *ngIf = "(orderDetail.items.length > 0 || orderDetail.combo.length > 0) && !orderDetail.menuStatus" col-12 class="text-center">\n\n                <button class="height2em" ion-button full color="secondary" (click)="completeStatus()">\n\n                    Mark\n\n                    <span *ngIf = "orderDetail.package.length > 0">&nbsp; Items &nbsp;</span>\n\n                    <span *ngIf = "orderDetail.package.length == 0">&nbsp; Order &nbsp;</span>\n\n                    Delivered\n\n                </button>\n\n            </ion-col> -->\n\n            <ion-col col-12 class="text-center">\n\n                <button class="height2em" ion-button full color="secondary" (click)="startTracking()">Show Map</button>\n\n            </ion-col>\n\n        </ion-row>\n\n        <div id="map" style="width:100%;background:gainsboro"></div>\n\n    </ion-row>\n\n\n\n    <!-- <ion-row class="whiteDiv">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Order Type :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><span *ngIf = "orderDetail.ordertiming && orderDetail.ordertiming.type == \'now\'">Order for Now</span><span *ngIf = "orderDetail.ordertiming && orderDetail.ordertiming.type == \'later\'">Pre Order for Later</span></ion-col>\n\n          \n\n            <ion-col col-12 *ngIf = "orderDetail.ordertiming && orderDetail.ordertiming.datetime"><strong>When to deliver : </strong>{{formatDateForDetailOrderTiming(orderDetail.ordertiming.datetime) }}</ion-col>\n\n        </ion-row>\n\n    </ion-row> -->\n\n\n\n    <ion-row class="whiteDiv">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Payment Type : </strong><span text-capitalize>{{orderDetail.paymenttype}}</span></ion-col>\n\n        </ion-row>\n\n        <!-- <hr class="width100 height2px">\n\n        <ion-row padding-horizontal class= "width100">\n\n            <ion-col col-12 text-capitalize>{{orderDetail.paymenttype}}</ion-col>\n\n        </ion-row> -->\n\n    </ion-row>\n\n\n\n    <ion-row class="whiteDiv" *ngIf = "orderDetail.customerData">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Customer Details :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col *ngIf = "orderDetail.customerData.firstname" col-12 text-capitalize><strong>Name : </strong>{{orderDetail.customerData.firstname}} {{orderDetail.customerData.lastname}}</ion-col>\n\n            <ion-col col-12><strong>Email ID : </strong>{{orderDetail.customerData.email}}</ion-col>\n\n            <ion-col col-12 *ngIf = "orderDetail.fulladdress"><strong>Delivery Address : </strong>{{orderDetail.fulladdress.address}}</ion-col>\n\n            <ion-col col-12 *ngIf = "orderDetail.fulladdress"><strong>Zipcode : </strong>{{orderDetail.fulladdress.zipcode}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <!-- <ion-row class="whiteDiv" *ngIf = "orderDetail.driverDetail">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Driver Detail :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col *ngIf = "orderDetail.driverDetail.name" col-12 text-capitalize><strong>Name : </strong>{{orderDetail.driverDetail.name}}</ion-col>\n\n            <ion-col *ngIf = "orderDetail.driverDetail.phone" col-12><strong>Contact No. : </strong>{{orderDetail.driverDetail.phone}}</ion-col>\n\n            <ion-col *ngIf = "orderDetail.driverDetail.vehicleType" col-12 text-capitalize><strong>Vehicle Type : </strong>{{orderDetail.driverDetail.vehicleType}}</ion-col>\n\n            <ion-col *ngIf = "orderDetail.driverDetail.vehicleName" col-12 text-capitalize><strong>Vehicle Name : </strong>{{orderDetail.driverDetail.vehicleName}}</ion-col>\n\n            <ion-col *ngIf = "orderDetail.driverDetail.vehicleNo" col-12><strong>Vehicle Number : </strong>{{orderDetail.driverDetail.vehicleNo}}</ion-col>\n\n        </ion-row>\n\n    </ion-row> -->\n\n\n\n    <!-- <ion-row *ngIf = "orderDetail.items && orderDetail.items.length > 0" class = "whiteDiv">\n\n        <ion-row class="width100"><strong>Daily Menu Items</strong><span *ngIf = "orderDetail.items[0].orderStatus == \'delivered\'" class="deliveredClass"> Delivered</span></ion-row>\n\n        <ion-row class="width100"><strong>Delivery Date :    {{getDateOfDailyMenu()}}  </strong> </ion-row>\n\n        <ion-row class="width100"><strong>Delivery Time :    {{getTimeOfDailyMenuForDelivery()}}  </strong> </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row *ngFor = "let item of orderDetail.items let i = index; " class="width100">\n\n            <ion-col class="">\n\n                <strong>{{i+1}})</strong> {{item.name}}\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <strong> X {{item.qty}} </strong>\n\n            </ion-col>\n\n            <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                <span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{item.qty * item.price | number : \'1.2-2\'}}\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n\n\n        <ion-row *ngIf="orderDetail.driverDetail">\n\n\n\n            <button class="acceptButton" *ngIf="(orderDetail.items[0].orderStatus == \'driveraccepted\')" ion-button (click)="checkOnAlterDaily(\'ontheway\', orderDetail._id,pkg)">On The Way</button>\n\n\n\n            <button class="acceptButton" *ngIf="orderDetail.items[0].orderStatus == \'ontheway\'" ion-button (click)="checkOnAlterDaily(\'delivered\', orderDetail._id,pkg)">Delivered</button>\n\n        \n\n        </ion-row>\n\n            </ion-row>\n\n -->\n\n\n\n\n\n\n\n\n\n\n\n    <ion-row *ngIf = "orderDetail.combo && orderDetail.combo.length > 0" class = "whiteDiv">\n\n        <ion-row class="width100"><strong>Combo Items</strong><span *ngIf = "orderDetail.menuStatus" class="deliveredClass"> Delivered</span></ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row *ngFor = "let combo of orderDetail.combo; let i = index; " class="width100 divHighlighted">\n\n            <ion-row class="width100">\n\n                <ion-col class="">\n\n                    <strong>{{i+1}})</strong> {{combo.name}}\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <strong> X {{combo.qty}} </strong>\n\n                </ion-col>\n\n                <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                    <span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{combo.qty * combo.finalcomboprice | number : \'1.2-2\'}}\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-4 class="whiteSpaceInitial" *ngFor = "let menus of combo.menuId;">\n\n\n\n                    <ion-row class="margin5px">\n\n                        <!-- <ion-col col-12 no-padding class="itemImage comboMenuImage width100" [ngStyle]="{\'background-image\': \'url(\' + itemImage(menus.image) + \')\'}">\n\n                        </ion-col> -->\n\n                        <img class="profile-img "  style="object-fit: cover;" width="100px" height="100px" [src]="itemImage(menus.image)">\n\n                        <ion-col col-12 text-capitalize class = "font2vh colorBlack bgWhite width100">{{menus.name}}</ion-col>\n\n                    </ion-row>\n\n                    \n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-row>\n\n        <ion-row *ngIf="orderDetail.driverDetail == undefined">\n\n            <button class="acceptButton" *ngIf="(orderDetail.status == \'accepted\')" ion-button (click)="ComboOnStatus(\'driveraccepted\', orderDetail._id)">Accept</button>\n\n        </ion-row>\n\n        <ion-row *ngIf="orderDetail.driverDetail">\n\n\n\n       \n\n            <button class="acceptButton" *ngIf="(orderDetail.status == \'driveraccepted\')" ion-button (click)="ComboOnStatus(\'ontheway\', orderDetail._id)">On The Way</button>\n\n\n\n            <button class="acceptButton" *ngIf="orderDetail.status == \'ontheway\'" ion-button (click)="ComboOnStatus(\'delivered\', orderDetail._id)">Delivered</button>\n\n        \n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <!-- <ion-row *ngIf = "orderDetail.package && orderDetail.package.length > 0" class = "whiteDiv">\n\n        <ion-row class="width100"><strong>Meal Package Items</strong><span *ngIf = "orderDetail.status == \'delivered\' " class="deliveredClass"> Delivered</span></ion-row>\n\n        <hr class="width100 height2px">\n\n            <ion-row *ngFor = "let pkg of orderDetail.package; let i = index " class="width100 divHighlighted">\n\n            <ion-row class="width100">\n\n                <ion-col class="">\n\n                    <strong>{{i+1}})</strong> {{pkg.name}}\n\n                </ion-col>\n\n                <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                    <span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{pkg.packageprice | number : \'1.2-2\'}}\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row *ngIf = "pkg.type == \'fixed\' " class="width100">\n\n                <ion-col col-12> -->\n\n                    <!-- <strong>Package Duration</strong>\n\n                </ion-col>\n\n                <ion-col col-12 padding-left class="colorLightGray">\n\n                    {{formatDate(pkg.startdate )  | date : \'mediumDate\'}} - {{formatDate(pkg.enddate  )   | date : \'mediumDate\'}}\n\n                </ion-col> -->\n\n                <!-- <ion-row class="width100" *ngIf="orderDetail && orderDetail.delvierySlotsWeek && orderDetail.delvierySlotsWeek.deliverySecondTime"><strong> First Delivery Date :    {{getDateOfFirstWeekly(pkg)}}  </strong> </ion-row>\n\n                <ion-row class="width100" *ngIf="orderDetail && orderDetail.delvierySlotsWeek && orderDetail.delvierySlotsWeek.deliverySecondTime"><strong> First Delivery Time :    {{getTimeOfFirstWeeklyDelivery(pkg)}}  </strong> </ion-row>\n\n                <ion-row class="width100" *ngIf="orderDetail && orderDetail.delvierySlotsWeek && orderDetail.delvierySlotsWeek.deliverySecondTime"><strong> Second Delivery Date :    {{getDateOfSecondWeekly(pkg)}}  </strong> </ion-row>\n\n                <ion-row class="width100" *ngIf="orderDetail && orderDetail.delvierySlotsWeek && orderDetail.delvierySlotsWeek.deliverySecondTime"><strong> Second Delivery Time :    {{getTimeOfSecondForDelivery(pkg)}}  </strong> </ion-row>\n\n\n\n                <ion-row class="width100" *ngIf="orderDetail && orderDetail.delvierySlotsWeek && !orderDetail.delvierySlotsWeek.deliverySecondTime"><strong> Delivery Date :    {{getDateOfWeeklyOnce(pkg)}}  </strong> </ion-row>\n\n                <ion-row class="width100" *ngIf="orderDetail && orderDetail.delvierySlotsWeek && !orderDetail.delvierySlotsWeek.deliverySecondTime"><strong> Delivery Time :    {{getTimeOfWeeklyForDeliveryOnce(pkg)}}  </strong> </ion-row>\n\n            </ion-col >\n\n            </ion-row>\n\n            <ion-row *ngIf = "pkg.type == \'flexible\' " >\n\n                    <ion-col col-12>\n\n                <ion-row class="width100"><strong> Delivery Date :    {{getDateOfWeekend(pkg)}}  </strong> </ion-row>\n\n                <ion-row class="width100"><strong> Delivery Time :    {{getTimeOfWeekendForDelivery(pkg)}}  </strong> </ion-row>\n\n                        </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100 padding10px" *ngFor = "let detail of pkg.dayandmenus; let m = index; " [ngClass] = "detail.status?\'greenBorder\':\'grayBorder\'">\n\n                <ion-col col-12>\n\n                    <strong>{{formatDate(detail.date )    | date : \'mediumDate\'}}</strong>\n\n                \n\n                    <span float-right class="themeGreen" *ngIf = "pkg.orderStatus == \'delivered\' "><strong>Delivered</strong></span> -->\n\n                    <!-- <span float-right class="themeRed" *ngIf = "getPkgStatus(detail) == 1 ">In Process</span>\n\n                    <span float-right class="colorGray" *ngIf = "getPkgStatus(detail) == 2 ">Pending</span>\n\n                    <span float-right class="themeRed" *ngIf = "getPkgStatus(detail) == 3 "><strong>Not Delivered Yet</strong></span> -->\n\n\n\n<!-- \n\n                </ion-col>\n\n                <ion-col col-4 no-padding class="whiteSpaceInitial" *ngFor = "let menus of detail.menuids">\n\n                    <ion-row class="margin5px"> -->\n\n                        <!-- <ion-col col-12 no-padding class="itemImage comboMenuImage width100" [ngStyle]="{\'background-image\': \'url(\' + itemImage(menus.image) + \')\'}"> -->\n\n                                <!-- <img class="profile-img "  style="object-fit: cover;" width="100px" height="100px" [src]="itemImage(menus.image)"> -->\n\n                        <!-- </ion-col> -->\n\n                        <!-- <ion-col col-12 text-capitalize class = "font2vh colorBlack bgWhite width100">{{menus.name}}</ion-col>\n\n                    </ion-row>\n\n                </ion-col> -->\n\n\n\n                <!-- <ion-icon *ngIf="orderDetail.status == \'driveraccepted\' && orderDetail.driverDetail[\'_id\'] == driver[\'_id\'] && !detail.status" [ngClass] = "detail.status?\'green\':\'gray\'" class = makeDeliverIcon name="checkmark-circle" ios="ios-checkmark-circle" md="md-checkmark-circle" (click)="markDeliver(i,m)"></ion-icon> -->\n\n            <!-- </ion-row> -->\n\n            <!-- <ion-row *ngIf="orderDetail.driverDetail">\n\n                <button class="acceptButton" *ngIf="(pkg.orderStatus == \'driveraccepted\') && (pkg.type ==\'flexible\') " ion-button (click)="checkOnAlter(\'ontheway\', orderDetail._id,pkg)">On The Way</button>\n\n                <button class="acceptButton" *ngIf="(pkg.orderStatus == \'driveraccepted\' && pkg.type ==\'fixed\'  && orderDetail.delvierySlotsWeek && orderDetail.delvierySlotsWeek.dtype == \'Once\') || (pkg.orderStatus == \'deliveryForFirstWeek\')" ion-button (click)="checkOnAlter(\'ontheway\', orderDetail._id,pkg)">On The Way</button>\n\n                <button class="acceptButton" *ngIf="pkg.orderStatus == \'driveraccepted\' && pkg.type ==\'fixed\'  && orderDetail.delvierySlotsWeek && orderDetail.delvierySlotsWeek.dtype == \'Twice\'" ion-button (click)="checkOnAlter(\'OnTheWayForFirstWeek\', orderDetail._id,pkg)">On The Way </button>\n\n                <button class="acceptButton" *ngIf="pkg.orderStatus == \'ontheway\'" ion-button (click)="checkOnAlter(\'delivered\', orderDetail._id,pkg)">Delivered</button>\n\n                <button class="acceptButton" *ngIf="pkg.orderStatus == \'OnTheWayForFirstWeek\'" ion-button (click)="checkOnAlter(\'deliveryForFirstWeek\', orderDetail._id,pkg)">Delivered</button>\n\n            </ion-row>\n\n        </ion-row>\n\n    </ion-row> -->\n\n\n\n\n\n    <!-- <ion-row *ngIf = "orderDetail.addOnItem && orderDetail.addOnItem.length > 0" class = "whiteDiv">\n\n        <ion-row class="width100"><strong>Add-On Items</strong></ion-row>\n\n        <span *ngIf = "orderDetail.status == \'delivered\' " class="deliveredClass"> Delivered</span>\n\n        <hr class="width100 height2px">\n\n            <ion-row *ngFor = "let addOn of orderDetail.addOnItem; let i = index " class="width100 divHighlighted">\n\n            <ion-row class="width100">\n\n                <ion-col class="">\n\n                    <strong>{{i+1}})</strong> {{addOn.name}}\n\n                </ion-col>\n\n                <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                    <span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{addOn.finalprice | number : \'1.2-2\'}}\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row >\n\n                <img class="profile-img "  style="object-fit: cover;" width="100px" height="100px" [src]="itemImage(addOn.image)">\n\n\n\n            </ion-row>\n\n\n\n        \n\n        </ion-row>\n\n    </ion-row> -->\n\n\n\n\n\n\n\n\n\n\n\n    <ion-row *ngIf = "orderDetail.note" class = "whiteDiv">\n\n        <strong>Note : </strong> {{orderDetail.note}}\n\n    </ion-row>\n\n\n\n    <ion-row class= "whiteDiv displayBlock" *ngIf = "orderDetail">\n\n\n\n        <ion-row class="width100 colorLightGray">\n\n            <ion-col col-6>Total</ion-col>\n\n            <ion-col text-right><span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{orderDetail.subtotal | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row *ngIf = "orderDetail.discount" class="width100 colorLightGray">\n\n            <ion-col col-6>Discount <span class="discountPercent" *ngIf = "orderDetail.coupon && orderDetail.coupon.type == \'Percent\'">({{orderDetail.coupon.percentorpricevalue}} %)</span></ion-col>\n\n            <ion-col text-right><span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{orderDetail.discount | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row *ngIf = "orderDetail.deliveryCharges" class="width100 colorLightGray">\n\n            <ion-col col-6>Delivery Charges</ion-col>\n\n            <ion-col text-right><span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{orderDetail.deliveryCharges | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row class="width100 colorLightGray">\n\n            <ion-col col-6>Tax &nbsp;<span class="font2vh"> ({{orderDetail.tax}} %) </span></ion-col>\n\n            <ion-col text-right><span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{taxAmmount | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <hr class="width100 height2px">\n\n\n\n        <ion-row class="width100 colorLightGray">\n\n            <ion-col col-6 text-right class="colorGray"><strong>Pay</strong></ion-col>\n\n            <ion-col text-right><span *ngIf = "orderDetail.currency">{{orderDetail.currency}}</span> {{orderDetail.total | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Caterdaay\driverApp\src\pages\order\order-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_four_service__["a" /* FourService */],
            __WEBPACK_IMPORTED_MODULE_4__services_one_service__["a" /* OneService */],
            __WEBPACK_IMPORTED_MODULE_2__services_three_service__["a" /* ThreeService */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], OrderDetailPage);
    return OrderDetailPage;
}());

//# sourceMappingURL=order.js.map

/***/ })

},[655]);
//# sourceMappingURL=main.js.map