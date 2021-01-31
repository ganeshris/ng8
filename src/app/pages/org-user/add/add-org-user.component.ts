import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mapping } from 'app/models/Mapping';
import { FormSetupService } from 'app/services/api/form-setup.service';
import { OrgUserService } from 'app/services/api/org-user.service';
@Component({
  selector: 'app-add-org-user',
  templateUrl: './add-org-user.component.html',
  styleUrls: ['./add-org-user.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddOrgUserComponent implements OnInit {

  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;

  related_to = ['Menu', 'Related To'];
  page_event = ['OnClick', 'OnBlur'];
  field_type = ['textfield', 'dropdown', 'date', 'checkbox', 'textarea', 'togglebutton'];
  roles = ['COLLABORATOR', 'ADMIN', 'REVIEWER'];

  mappings: Mapping[];

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orgUserService: OrgUserService,
    private httpService: HttpClient

  ) {}

  accountId: number;
  private randomPassword: any;
  ngOnInit() {
    /* this.route.queryParams.subscribe(params => {
      const accountId = params['accId'];
      this.accountId = accountId;
    }); */
    //this.getMapings();
    //this.storage.setItem(this.key, this.formCode);
    this.getPassword();
    this.entryForm = this._fb.group({
      email: [null],
      firstName: [null],
      lastName: [null],
      fullName: [null],
      menu_group_id: [null],
      department: [null],
      password: [this.randomPassword],
      roles: this._fb.array([this.initLinesForm()]),
    });
  }

  getPassword() {
    const rand: string = Math.random().toString(36).slice(-8);
    console.log(rand);
    this.randomPassword = rand;
  }

  initLinesForm() {
    return this._fb.group({
      name: [null],
    });
  }

  getMapings() {
    this.httpService
      .get<Mapping[]>('./assets/json/form-setup-mapping.json')
      .subscribe(data => {
        console.log(data);
        this.mappings = data;
        }, err => console.log(err)
      )
  }

 

  get controls() {
    return (this.entryForm.get("roles") as FormArray).controls;
  }

  onAddLines() {
    (<FormArray>this.entryForm.get("roles")).push(this.initLinesForm());
  }

  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("roles")).removeAt(index);
  }

  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {
    //this.errorMsg = [];
    this.orgUserService.create(this.entryForm.value).subscribe(
      (data) => {
        this.router.navigate(["../all"], { relativeTo: this.route });
      },
      (error) => { console.log(error); }
    );
  }
}
