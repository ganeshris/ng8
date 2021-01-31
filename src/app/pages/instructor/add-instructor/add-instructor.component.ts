import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/api/order.service';
import { ActivatedRoute, Router } from '@angular/router';

import { InstructorService } from 'app/services/api/rn_instructor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'add-instructor',
	templateUrl: './add-instructor.component.html',
    styleUrls: [ './add-instructor.scss'],
})
export class AddInstructorComponent implements OnInit {
    public entryForm: FormGroup;
    submitted = false;

    constructor(
        private _fb: FormBuilder,
        private router: Router, 
        private route: ActivatedRoute,
        private instructorService: InstructorService) { }

    ngOnInit() {
        this.entryForm = this._fb.group({
            firstName: [null, [Validators.required, Validators.minLength(3)]],
            lastName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
        })
    }

    onSubmit() {
        console.log(this.entryForm.value);
        this.submitted = true;
        if(this.entryForm.invalid){
            return;
        }
        this.add();
    }

    add() {
        this.instructorService
        .create(this.entryForm.value)
        .subscribe((data) => {
            this.router.navigate(["../all"], { relativeTo: this.route });
        });
  }
  
}
