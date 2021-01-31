import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ExtensionField } from "app/models/ExtensionField";
import { Teacher } from "app/pages/university/teacher/Teacher";
import { ExtensionService } from "app/services/api/extension.service";
import { UserInfoService } from "app/services/user-info.service";

interface Rows {
  id: number;
  field_name: any;
  mapping: any;
  data_type: any;
  isActive:any;
}

@Component({
  selector: "app-all-extension",
  templateUrl: "./all-extension.component.html",
  styleUrls: ["./all-extension.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AllExtensionComponent implements OnInit {
  @ViewChild("extById", { static: true }) extensionById: TemplateRef<any>;
  @ViewChild("showInGrid", { static: true }) txId: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  //@ViewChild("filter") filter: ElementRef;
  basic: boolean = false;
  whoColumns: Teacher; // who columns data
  columns: any[];
  rows: Rows[];
  temp = [];

  filterData: string;
  isLoading: boolean = false;
  extensionField: ExtensionField[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private extensionService: ExtensionService,
    private userInfoService: UserInfoService
  ) {}

  private account_id: any;
  private formCode: any;
  public key: string = "formCode";
  public storage: Storage = sessionStorage;

  ngOnInit() {
    this.account_id = this.userInfoService.getUserId();
    this.formCode = this.storage.getItem(this.key);
    console.log("[ngOnInit] acc_id: " + this.account_id + " formCode: " + this.formCode);
    this.getData();
    this.columns = [
      { prop: "id", name: "Actions", width: 65, cellTemplate: this.extensionById },
      { prop: "field_name", name: "Field Name", width: 120 },
      { prop: "mapping", name: "Mapping", width: 150 },
      { prop: "data_type", name: "Data Type", width: 190 },
      { prop: "id", name: "Show In Grid", width: 90, cellTemplate: this.txId }
    ];
  }

  getData() {
    this.isLoading = true;
    //this.extensionField = new ExtensionField();
    this.extensionService.getAll().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.extensionField = data;
      this.rows = this.extensionField;
      //this.temp = [...this.extensionField];
    });
  }

  alertType: string;
  alertMessage: string = "";
  alert = [
    { type: "success", message: "Build Successfully" },
    { type: "danger", message: "Some error Happens" },
  ];

  buildExtension() {
    console.log("buildExtension() Account id = " + this.account_id + " Form Code = ",
      this.formCode);
    if (this.account_id === null && this.formCode === null) {
      this.alertType = this.alert[1].type;
      this.alertMessage = "form_code is null";
      return;
    }
    this.extensionService
      .buildExtension(this.account_id, this.formCode)
      .subscribe(
        (data) => {
          console.log("build successfully ", data);
          this.alert.forEach((e) => {
            if (e.type === "success") {
              this.alertType = e.type;
              this.alertMessage = e.message;
            } //data.type === true : e.message ? e.message
          });
          // go to parent entry form...
          //this.router.navigate(['../../'], { relativeTo: this.route.parent });
        },
        (err) => {
          console.log("build failed ", err);
          this.alertType = this.alert[1].type;
          this.alertMessage = this.alert[1].message;
        }
      );
  }

  isChecked(id: number) {
    return (
      this.extensionField.find(c => {
        if(c.id === id) return c.isActive;
      }) !== undefined
    );
  }

  chk(checked) {
    console.log(checked);
    return !checked;
  }

  extField: ExtensionField;
  checked: boolean;
  toggle(id: number) {
    console.log(id);
    this.extensionService.getById(id).subscribe(ext => {
      this.extField = ext;
      this.checked = ext.isActive;
      console.log('extField ', this.extField);
      console.log('checked ', this.checked);
    });
    console.log(this.extField.isActive);
    //this.extensionService.update(id,this.extField).subscribe();
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

  goToWhoColumns(id: number) {
    this.basic = !this.basic;
  }
}
