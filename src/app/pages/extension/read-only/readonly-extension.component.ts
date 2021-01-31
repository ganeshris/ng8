import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { InstructorService } from 'app/services/api/rn_instructor.service';

import { ExtensionService } from 'app/services/api/extension.service';
import { ExtensionField } from 'app/models/ExtensionField';

@Component({
	selector: 'readonly-extension',
	templateUrl: './readonly-extension.component.html',
    styleUrls: [ './readonly-extension.scss'],
})
export class ReadOnlyExtensionComponent implements OnInit {
    basic: boolean = false;
    id: number;
    extensionField: ExtensionField;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
         private extensionService: ExtensionService) { }
    ngOnInit() {
        this.getById();
    }

    getById() {
        this.extensionField = new ExtensionField();
        this.id = this.route.snapshot.params['id'];
        this.extensionService.getById(this.id)
            .subscribe(data => {
                console.log(data);
                this.extensionField = data;
            });
    }

    goToWhoColumns() {
        this.basic = !this.basic;
    }

    back() {
        this.router.navigate(['../../all'], {relativeTo: this.route});
    }
}
