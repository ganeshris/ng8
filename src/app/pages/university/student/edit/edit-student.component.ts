import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../Student';
import { StudentService } from 'app/services/api/student.service';



interface Rows {
    id: number,
    name : string,
    depertment: string,
    rollNumber: string,
    createdAt :  Date,
    updatedAt : Date
}

@Component({
	selector: 'edit-student',
	templateUrl: './edit-student.component.html',
    styleUrls: [ './edit-student.scss'],
})
export class EditStudentComponent implements OnInit {
    updated = false;
    student: Student;
    header_id: number;
    line_id: number;
    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private studentService: StudentService) { }
    
        ngOnInit() {
        this.student = new Student();
        this.header_id = this.route.snapshot.params['h_id'];
        this.line_id = this.route.snapshot.params['l_id'];
        console.log('header id = ', this.header_id + ', line_id = ', this.line_id);
        this.getById(this.line_id, this.header_id);
    }

    getById(line_id: number, header_id: number) {
        this.studentService.getByIdAndHeaderId(line_id, header_id)
            .subscribe(data => {
                this.student = data;
                console.log(data);
            })
    }
    update() {
        this.studentService.update(this.line_id, this.header_id, this.student)
          .subscribe(data => {
              console.log(data); 
              this.router.navigate(['../../all'], { relativeTo: this.route });
            }, (error: HttpErrorResponse) => {
                console.log(error.message);
            });
        this.student = new Student();
      }
    
      onSubmit() {
        this.updated = true;
        this.update();
      }

      back() {
          this.router.navigate(['../../all'], {relativeTo: this.route});
      }
}
