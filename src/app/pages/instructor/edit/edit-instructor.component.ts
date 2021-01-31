import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InstructorService } from 'app/services/api/rn_instructor.service';
import { Instructor } from '../Instructor';
import { HttpErrorResponse } from '@angular/common/http';



interface Rows {
    id: number,
    firstName : string,
    lastName: string,
    email: string,
    createdAt :  Date,
    updatedAt : Date
}

@Component({
	selector: 'edit-instructor',
	templateUrl: './edit-instructor.component.html',
    styleUrls: [ './edit-instructor.scss'],
})
export class EditInstructorComponent implements OnInit {
    updated = false;
    instructor: Instructor;
    id: number
    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private instructorService: InstructorService) { }
    
        ngOnInit() {
        this.instructor = new Instructor();
        this.id = this.route.snapshot.params['id'];
        console.log('update with id = ', this.id);
        this.getById(this.id);
    }

    getById(id: number) {
        this.instructorService.getById(id)
            .subscribe(data => {
                this.instructor = data;
                console.log(data);
            })
    }
    update() {
        this.instructorService.update(this.id, this.instructor)
          .subscribe(data => {
              console.log(data); 
              this.router.navigate(['../../all'], { relativeTo: this.route });
            }, (error: HttpErrorResponse) => {
                console.log(error.message);
            });
        this.instructor = new Instructor();
      }
    
      onSubmit() {
        this.updated = true;
        this.update();
      }

      back() {
          this.router.navigate(['../../all'], {relativeTo: this.route});
      }
}
