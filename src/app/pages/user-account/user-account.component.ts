import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile, UserProfileService } from 'app/services/api/user-profile.service';
import { UserInfoService } from 'app/services/user-info.service';
import {Sys_Account } from '../../services/api/user-registration.service'
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserAccountComponent implements OnInit {

  sys_account: Sys_Account;

  userEmail: string;
  companyName: string;
  workspace: string;
  gstNumber: string;
  constructor(
    private httpService: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
    this.getUserAccount();
    this.getUserRoles();
  }

  getUserAccount() {
    //this.userProfileService.getUserAccountDetails()
    this.httpService.get<Sys_Account>('./assets/json/dummy-data/user-account-data.json')
    .subscribe(resp => {
      this.sys_account = resp;
    }, err => {console.log(err);}
    )
  }


  addUsers() {
    this.router.navigate(["../users"], { relativeTo: this.route });
  }

  goToResetPassword() {
    this.router.navigate(["../reset-password"], { relativeTo: this.route });
  }

  roles: string[]
  role: string;
  getUserRoles() {
    const role = this.userInfoService.getRoles();
    console.log('roles = ', role);
    
    if(role !== null) {
      this.roles = role.split(',');
    }
    this.role = role;
    console.log(this.role);
  }

  isAdmin() :boolean {
    const role: string = this.userInfoService.getRoles();
    if(role.includes('ADMIN')) {
      return true;
    }
    return false;
  }


}
