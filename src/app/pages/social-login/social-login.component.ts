import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistrationService } from 'app/services/api/user-registration.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SocialLoginComponent implements OnInit {

  constructor(private userRegistrationService: UserRegistrationService,
    private router: Router,
    private route: ActivatedRoute) { }

  email: string;
  
  ngOnInit() {
    this.email = this.userRegistrationService.getStoredEmail();
  }

  goToGoogle() {
    this.router.navigate(["/signup"]);
  }

  goToLinkedIn() {
    this.router.navigate(["/signup"]);
  }
}
