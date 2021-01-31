import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/services/api/student.service';

import { Student } from '../Student';

@Component({
	selector: 'readonly-instructor',
	templateUrl: './readonly-student.component.html',
    styleUrls: [ './readonly-student.scss'],
})
export class ReadOnlyStudentComponent implements OnInit {
    header_id: number;
    line_id: number;
    student: Student;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
         private studentService: StudentService) { }
    ngOnInit() {
        this.getData();
        
    }

    getData() {
        this.getById();
        }

    getById() {
        this.student = new Student();
        this.header_id = this.route.snapshot.params['h_id'];
        this.line_id = this.route.snapshot.params['l_id'];
        this.studentService.getByIdAndHeaderId(this.line_id, this.header_id)
            .subscribe(data => {
                console.log(data);
                this.student = data;
            });
    }

    back() {
        this.router.navigate(['../../all'], {relativeTo: this.route});
    }
}
