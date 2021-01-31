import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from "@angular/router";
import "rxjs/add/operator/mergeMap";
//import { Teacher } from "../Teacher";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TeacherService } from "app/services/api/teacher.service";
import { Rn_Forms_Setup } from "app/models/Rn_Forms_Setup";
import { Rn_Forms_Component_Setup } from "app/models/Rn_Forms_Component_Setup";
import { FormSetupService } from "app/services/api/form-setup.service";
import { Mapping } from "app/models/Mapping";
import { OrgUserService } from "app/services/api/org-user.service";
import { Role, UserProfile } from "app/services/api/user-profile.service";
import { FormArray, FormGroup } from "@angular/forms";
import { filter } from "rxjs/operator/filter";
import { pairwise } from "rxjs/operator/pairwise";
import { Subject } from "rxjs";
//import { Student } from "../../student/Student";

@Component({
  selector: "edit-org-user",
  templateUrl: "./edit-org-user.component.html",
  styleUrls: ["./edit-org-user.scss"],
})
export class EditOrgUserComponent implements OnInit {
  updated = false;
  org_user: UserProfile;
  id: number;

  //roles = ['USER', 'COLLABORATOR', 'ADMIN', 'REVIEWER'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orgUserService: OrgUserService,
    private ref: ChangeDetectorRef
  ) {}

  public destroyed = new Subject<any>();
  ngOnInit() {
    //this.getMapings();
    //this.org_user = new Rn_Forms_Setup();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);

    this.getRoles();

    //
    /*  pairwise(),
      filter((events: RouterEvent[]) => evets[0].url === events[1].url),
      startWith('Initial Call'), 
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd), 
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.getById(this.id);
    });*/
  }

  getById(id: number) {
    this.orgUserService.getById(id).subscribe((data) => {
      console.log(data);
      this.org_user = data;
    });
  }
  update() {
    this.orgUserService.update(this.id, this.org_user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    //this.org_user = new Rn_Forms_Setup();
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  // ======= ROLES

  roleList: Role[];

  rolesDropDown: any[];

  getRoles() {
    this.orgUserService.getAllRoles().subscribe(
      (res) => {
        //console.log(res);
        this.roleList = res;
        const keys = this.roleList.map((item) => {
          const container = {
            id: null,
            name: null,
          };
          container.id = item.id;
          container.name = item.name;
          return container;
        });
        this.rolesDropDown = keys;
        console.log("Roles Dropdown: ", this.rolesDropDown);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* === MOD NEEDED ===
  get dropdown data (user not existing roles) */
  getDropDownData() {
    let name: string = "";
    this.org_user.roles.forEach((d) => {
      name += d.name + " , ";
    });
    console.log("before ", name);
    name = name.substring(0, name.lastIndexOf(","));
    console.log("after ", name);
    const keys = this.roleList.map((item) => {
      const container = {
        id: null,
        name: null,
      };
      if (!name.includes(item.name)) {
        container.id = item.id;
        container.name = item.name;
      }
      return container;
    });
    //console.log('Roles dropdown: ', keys);
    this.rolesDropDown = keys;
    console.log("Roles Dropdown: ", this.rolesDropDown);
  }

  addedRoleId: any;
  onAddRoles() {
    console.log("Role id = ", this.addedRoleId, " user Id = ", this.id);
    this.orgUserService
      .addRoleToUser(this.id, this.addedRoleId)
      .subscribe((res) => {
        console.log(res);
        //this.router.navigate(["../../edit/" + this.id], { relativeTo: this.route });
        //window.location.reload();
        this.getById(this.id);
        this.ref.detectChanges();
        //this.router.navigate(["users/edit/" + this.id]);
      });
  }

  onRemoveRoles(roleId: number) {
    console.log("Role id = ", roleId, " user Id = ", this.id);
    if (roleId !== null && this.id !== null) {
      this.orgUserService.removeRoleToUser(this.id, roleId).subscribe((res) => {
        console.log(res);
        //this.router.navigate(["../../edit/" + this.id], { relativeTo: this.route });
        this.getById(this.id);
        this.ref.detectChanges();
        //this.router.navigate(["users/edit/" + this.id]);
      });
    }
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
