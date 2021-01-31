import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from 'app/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  alert = [
    { type: "success", message: "Build Successfully" },
    { type: "danger", message: "Some error Happens" },
  ];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.subscription = this.alertService.getMessage().subscribe(message => { 
        console.log(message);
        
          this.message = message;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
