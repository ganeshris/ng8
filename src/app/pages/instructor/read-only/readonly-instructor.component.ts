import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Instructor } from '../Instructor';
import { InstructorService } from 'app/services/api/rn_instructor.service';

@Component({
	selector: 'readonly-instructor',
	templateUrl: './readonly-instructor.component.html',
    styleUrls: [ './readonly-instructor.scss'],
})
export class ReadOnlyInstructorComponent implements OnInit {
    id: number;
    instructor: Instructor;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
         private instructorService: InstructorService) { }
    ngOnInit() {
        this.getData();
        
    }

    getData() {
        this.getById();
        }

    getById() {
        this.instructor = new Instructor();
        this.id = this.route.snapshot.params['id'];

        this.instructorService.getById(this.id)
            .subscribe(data => {
                console.log(data);
                this.instructor = data;
            });
    }

    back() {
        this.router.navigate(['../../all'], {relativeTo: this.route});
    }
}
