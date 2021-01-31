import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-forbidden',
	templateUrl: './forbidden.component.html',
  styleUrls: [ './forbidden.scss'],
})

export class ForbiddenComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
    console.log("404 : %s",router.url)
  }

}
