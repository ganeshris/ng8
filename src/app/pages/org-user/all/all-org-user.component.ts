import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { Audit } from "app/models/Audit";
import { Rn_Forms_Setup } from "app/models/Rn_Forms_Setup";
import { OrgUserService } from "app/services/api/org-user.service";
import { UserProfile } from "app/services/api/user-profile.service";

@Component({
  selector: "app-all-org-user",
  templateUrl: "./all-org-user.component.html",
  styleUrls: ["./all-org-user.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AllOrgUserComponent implements OnInit {
  @ViewChild("getById", { static: true }) selectById: TemplateRef<any>;
  @ViewChild("txId", { static: false }) txId: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];

  filterData: string;
  isLoading: boolean = false;

  org_user: UserProfile[];
  whoColumns: Audit;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orgUserService: OrgUserService
  ) {}

  ngOnInit() {
    this.getData();
    // COLUMNS
    this.columns = [
      { prop: "userId", name: "Actions", width: 65, cellTemplate: this.selectById },
      { prop: "firstName", name: "First Name", width: 120 },
      { prop: "email", name: "Email", width: 180 },
      /* { prop: "role", name: "role", width: 190 }, */
      { prop: "department", name: "Depertment", width: 190 },
      { prop: "status", name: "Status", width: 200 },
    ];
  }

  getData() {
    this.isLoading = true;
    this.orgUserService.getAll().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.org_user = data;
      this.rows = this.org_user;
      this.temp = [...this.org_user];
    });
  }

  doFilter(event) {
    let val = event.target.value.toLowerCase();
    // filter our data
    let temp = this.temp.filter((d) => {
      return (
        d.firstName.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.department.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.status.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });
  }

  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route });
  }

  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  /* getById(id: number) {
    this.formSetupService.getById(id).subscribe((data) => {
      console.log("data from sarver", data);
      this.whoColumns = data;
      console.log("who columns: ", this.whoColumns);
    });
  }

  goToWhoColumns(id: number) {
    this.basic = !this.basic;
    this.getById(id);
  } */
}
