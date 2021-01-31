import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/mergeMap";

import { InstructorService } from "app/services/api/rn_instructor.service";
import { Teacher } from "../Teacher";
import { TeacherService } from "app/services/api/teacher.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "readonly-teacher",
  templateUrl: "./readonly-teacher.component.html",
  styleUrls: ["./readonly-teacher.scss"],
})
export class ReadOnlyTeacherComponent implements OnInit {
  basic: boolean = false;
  id: number;
  teacher: Teacher;

  constructor(
    private httpService: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}
  ngOnInit() {
    this.getById();
  }

  getById() {
    this.teacher = new Teacher();
    this.id = this.route.snapshot.params["h_id"];
    //this.teacherService.getById(this.id)
    this.httpService.get<any>('./assets/json/dummy-data/univercity-by-id.json')
    .subscribe((data) => {
      console.log(data);
      this.teacher = data;
    });
  }

  goToWhoColumns() {
    this.basic = !this.basic;
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
