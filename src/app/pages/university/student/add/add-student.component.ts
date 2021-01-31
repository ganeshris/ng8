import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { OrderService } from '../../../../services/api/order.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'app/services/api/student.service';
import { Observable } from 'rxjs';



interface Rows {
    id: number,
    name: string,
    depertment: string,
    rollNumber: string,
    createdAt :  Date,
    updatedAt : Date
}

@Component({
	selector: 'add-student',
	templateUrl: './add-student.component.html',
    styleUrls: [ './add-student.scss'],
})
export class AddStudentComponent implements OnInit {
    public entryForm: FormGroup;
    submitted = false;

    //id: Observable<string>;
    id: number;

    constructor(
        private _fb: FormBuilder,
        private router: Router, 
        private route: ActivatedRoute,
        private studentService: StudentService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            console.log(this.id);
        });
        this.entryForm = this._fb.group({
            name: [null, [Validators.required, Validators.minLength(3)]],
            depertment: [null, Validators.required],
            rollNumber: [null, [Validators.required]],
        });
    }

    onSubmit() {
        console.log(this.entryForm.value);
        this.submitted = true;
        if(this.entryForm.invalid) {
            return;
        }
        this.add();
    }

    add() {
        this.studentService
        .create(this.id, this.entryForm.value)
        .subscribe((data) => {
            this.router.navigate(["../all"], { relativeTo: this.route });
        });
  }
  
}
