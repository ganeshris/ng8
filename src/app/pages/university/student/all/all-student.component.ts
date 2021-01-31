import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { InstructorService } from 'app/services/api/rn_instructor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { StudentService } from 'app/services/api/student.service';
//import { FilterPipe } from 'app/pipes/filter.pipe';


interface Rows {
    id: number,
    name : string,
    depertment: string,
    rollNumber: string,
    createdAt :  Date,
    updatedAt : Date
}

@Component({
	selector: 'all-student',
	templateUrl: './all-student.component.html',
    styleUrls: [ './all-student.scss'],
})
export class AllStudentComponent implements OnInit {
    @ViewChild('studentById', { static: true }) studentById: TemplateRef<any>;
    @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
    //@ViewChild("filter") filter: ElementRef;
    columns:any[];
    rows:Rows[];
    temp = [];

    filterData: string;
    isLoading:boolean=false;
    header_id: number;

    student: any = [];
    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private studentService: StudentService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.header_id = +params['id'];
            console.log(this.header_id);
        });
        this.getData();
        this.columns=[
            {prop:"id"         , name: "Actions"           , width:65, cellTemplate: this.studentById   },
            {prop:"name"       , name: "Name"   , width:105 },
            {prop:"depertment"     , name: "Depertment"       , width:85 },
            {prop:"rollNumber"    , name: "Roll Number"         , width:180 },
            {prop:"createdAt" , name: "Created At"      , width:190 },
            {prop:"updatedAt"     , name: "Updated At"     , width:190  },
        ];
    }

        getData() {
            this.isLoading=true;
            this.studentService.getAll(this.header_id)
            .subscribe(data => {
                this.isLoading=false;
                console.log(data);
                console.log(data.items);
                this.student = data.items;
                this.rows = this.student;
                this.temp = [...this.student];
            });
        }

    getById(id: number) {
        this.studentService.getByIdAndHeaderId(id, this.header_id)
            .subscribe(data => {
                console.log(data);
            })

    }

      doFilter(event) {
        let val = event.target.value.toLowerCase();
        // filter our data
        let temp = this.temp.filter((d) => {
          return (
            (d.name.toLowerCase().indexOf(val) !== -1 || !val) || 
            (d.depertment.toLowerCase().indexOf(val) !== -1 || !val) ||
            (d.rollNumber.toLowerCase().indexOf(val) !== -1 || !val)
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
        this.router.navigate(["../edit/" + id], {relativeTo: this.route });
    }
}
