import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/mergeMap";
import {
  FormArray,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { TeacherService } from "app/services/api/teacher.service";

interface errorMsg {
  field: any;
  message: any;
}

@Component({
  selector: "add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.scss"],
})
export class AddTeacherComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  teacherError;
  errorMsg: errorMsg[] = [];

  private formCode: string ='teacher_form';
  // STORE FORM CODE IN SESSION
  public key:string="formCode";
  public storage:Storage = sessionStorage;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}


  ngOnInit() {
    this.storage.setItem(this.key, this.formCode);
    this.entryForm = this._fb.group({
      name: [null],
      email: [null],
      phoneNumber: [null],
      salary: [null],
      students: this._fb.array([this.initLinesForm()]),
      // EXTENSION
      extn1: [null],
      extn2: [null],
      extn3: [null],
      extn4: [null],
      extn5: [null],
      extn6: [null],
      extn7: [null],
      extn8: [null],
      extn9: [null],
      extn10: [null],
      extn11: [null],
      extn12: [null],
      extn13: [null],
      extn14: [null],
      extn15: [null],
      // FLEX
      flex1: [null],
      flex2: [null],
      flex3: [null],
      flex4: [null],
      flex5: [null],
    });
  }

  initLinesForm() {
    return this._fb.group({
      name: [null],
      depertment: [null],
      rollNumber: [null],
      // EXTENSION
      extn1: [null],
      extn2: [null],
      extn3: [null],
      extn4: [null],
      extn5: [null],
      extn6: [null],
      extn7: [null],
      extn8: [null],
      extn9: [null],
      extn10: [null],
      extn11: [null],
      extn12: [null],
      extn13: [null],
      extn14: [null],
      extn15: [null],
      // FLEX
      flex1: [null],
      flex2: [null],
      flex3: [null],
      flex4: [null],
      flex5: [null],
    });
  }

 /*  extensionForm() {
    return this._fb.group({
      extn1: [null],
      extn2: [null],
      extn3: [null],
      extn4: [null],
      extn5: [null],
      extn6: [null],
      extn7: [null],
      extn8: [null],
      extn9: [null],
      extn10: [null],
      extn11: [null],
      extn12: [null],
      extn13: [null],
      extn14: [null],
      extn15: [null]
    });
  } */

  get controls() {
    return (this.entryForm.get("students") as FormArray).controls;
  }

  onAddLines() {
    (<FormArray>this.entryForm.get("students")).push(this.initLinesForm());
  }

  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("students")).removeAt(index);
  }

  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.router.navigate(["../all"], { relativeTo: this.route });
    //this.onCreate();
  }

  onCreate() {
    this.errorMsg = [];
    this.teacherService.create(this.entryForm.value).subscribe(
      (data) => {
        this.router.navigate(["../all"], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);

        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.errorMsg.push({ field: k, message: v });
          //this.errorMsg.
        });

        console.log(this.errorMsg);
        
      }
    );
  }
  extensionBuild() {
    this.basic = !this.basic;
    //this.basic = true;
    console.log("button status: ", this.basic);
  }

  goToExt() {
    this.router.navigate(['extension/all'], { relativeTo: this.route });
  }

  // TEST CASE

}
