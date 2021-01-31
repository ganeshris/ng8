import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Rn_Forms_Setup } from 'app/models/Rn_Forms_Setup';
import { FormSetupService } from 'app/services/api/form-setup.service';
import { OrgUserService } from 'app/services/api/org-user.service';
import { UserProfile } from 'app/services/api/user-profile.service';

@Component({
	selector: 'org-user-setup',
	templateUrl: './readonly-org-user.component.html',
    styleUrls: [ './readonly-org-user.scss'],
})
export class ReadOnlyOrgUserComponent implements OnInit {
    basic: boolean = false;
    id: number;
    org_user: UserProfile;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
         private orgUserService: OrgUserService) { }
    ngOnInit() {
        this.getById();
    }

    getById() {
        //this.org_user = new Rn_Forms_Setup();
        this.id = this.route.snapshot.params['id'];

        this.orgUserService.getById(this.id)
            .subscribe(data => {
                console.log(data);
                this.org_user = data;
            });
    }

    goToWhoColumns() {
        this.basic = !this.basic;
    }

    back() {
        this.router.navigate(['../../all'], {relativeTo: this.route});
    }
}
