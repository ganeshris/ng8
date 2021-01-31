import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExtensionComponent implements OnInit , AfterViewInit {
  //@Input() basic: boolean;
  basic: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
  }

  buttonClose() {
    //this.basic = false;
    this.basic = !this.basic;
    console.log("ext button status: ",  this.basic);
    
  }

 // test case 

  showModal = false;
  ngAfterViewInit() {
    this.showModal = true;
  }
  onClose() {
    this.showModal = false;
    //Allow fade out animation to play before navigating back
    setTimeout(
      () => this.router.navigate(['..']),
      100
    );
  }
  onDialogClick(event: UIEvent) {
    // Capture click on dialog and prevent it from bubbling to the modal background.
    event.stopPropagation();
    event.cancelBubble = true;
  }

}
