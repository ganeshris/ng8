import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/api/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserRegistrationService } from 'app/services/api/user-registration.service';
import { UserInfoService } from 'app/services/user-info.service';


@Component({
	selector   : 's-login-pg',
	templateUrl: './login.component.html',
    styleUrls  : [ './login.scss'],
})

export class LoginComponent implements OnInit {
    model: any = {};
    errMsg:string = '';
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private loginService: LoginService,
        private userInfoService: UserInfoService,
        private userRegistrationService: UserRegistrationService) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout(false);
        this.userRegistrationService.removeSignedUpUserInfo();
        this.userRegistrationService.removeStoredEmail();
    }

    login() {
        this.httpClient.get<any>('./assets/json/dummy-data/login-data.json')
            .subscribe(resp => {
                    /* if (resp.user === undefined || resp.user.token === undefined || resp.user.token === "INVALID" ){
                        this.errMsg = 'Enter valid Email or password';
                        return;
                    } */
                    this.userInfoService.storeUserInfo(JSON.stringify(resp.user));
                    this.router.navigate([resp.landingPage]);
                },
                (errResponse: HttpErrorResponse) => {
                  switch(errResponse.status) {
                    case 401:
                      this.errMsg = 'Email or password is incorrect';
                      break;
                    case 404:
                      this.errMsg = 'Service not found';
                    case 408:
                      this.errMsg = 'Request Timedout';
                    case 500:
                      this.errMsg = 'Internal Server Error';
                    default:
                      this.errMsg = 'Server Error';
                  }
                }
            );
    }

    onSignUp(){
      this.router.navigate(['signup']);
    }


}
