import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/mergeMap";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TeacherService } from "app/services/api/teacher.service";
import { Teacher } from "../Teacher";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "all-teacher",
  templateUrl: "./all-teacher.component.html",
  styleUrls: ["./all-teacher.scss"],
})
export class AllTeacherComponent implements OnInit {
  @ViewChild("instructorById", { static: false }) instructorById: TemplateRef<any>;
  @ViewChild("txId", { static: false }) txId: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  @Input()
  detailTemplate: TemplateRef<any>;
  
  basic: boolean = false;
  whoColumns: Teacher; // who columns data
  columns: any[];
  rows: any[];
  temp = [];

  filterData: string;
  isLoading: boolean = false;
  teacher: any = [];
  //teacher: Teacher;
  constructor(
    private httpService: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.getData();
    this.columns = [
      //{ prop: "id", name: "Actions", width: 65, cellTemplate: this.instructorById },
      { prop: "name", name: "First Name", width: 105 },
      { prop: "email", name: "Email", width: 150 },
      { prop: "phoneNumber", name: "Mobile Number", width: 190 },
      { prop: "salary", name: "Salary", width: 190 }
    ];
  }

  getData() {
    this.isLoading = true;
    this.httpService.get<any>('./assets/json/dummy-data/univercity-data.json')
    .subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.teacher = data.items;
      this.rows = this.teacher;
      this.temp = [...this.teacher];
    });
  }

  doFilter(event) {
    let val = event.target.value.toLowerCase();
    // filter our data
    let temp = this.temp.filter((d) => {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.lastName.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.phoneNumber.toLowerCase().indexOf(val) !== -1 ||
        !val ||
        d.salary.toLowerCase().indexOf(val) !== -1 ||
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
}
