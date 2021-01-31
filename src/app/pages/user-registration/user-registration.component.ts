import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Mapping } from "app/models/Mapping";
import { FormSetupService } from "app/services/api/form-setup.service";
import { UserRegistrationService } from "app/services/api/user-registration.service";
import { Observable } from "rxjs";
import { first } from "rxjs/operator/first";

export interface EmailRequest {
  email: string;
}
@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UserRegistrationComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userRegistrationService: UserRegistrationService
  ) {}
  ngOnInit() {
    this.userRegistrationService.removeSignedUpUserInfo();
    this.userRegistrationService.removeStoredEmail();
    this.emailCheckForm = this._fb.group({
      email: ["", Validators.email],
    });
  }

  model: any = {};
  EmailRequest: EmailRequest;
  emailErrMsg: string = "";

  emailExistCheck() {
    console.log("input email: ", this.model.email);
    this.userRegistrationService.emailCheck(this.model.email).subscribe(
      (res) => {
        console.log("email check Res : ", res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  emailCheckForm: FormGroup;
  get f() {
    return this.emailCheckForm.controls;
  }
  onSubmit() {
    console.log("this.emailCheckForm.value : ", this.emailCheckForm.value);
    this.userRegistrationService.storeEmail("dummy@gmail.com");
    this.router.navigate(["/varify-account"]);
  }

  onSignUp() {
    this.router.navigate(["signup"]);
  }
}
