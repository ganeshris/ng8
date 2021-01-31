import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { TeacherService } from "app/services/api/teacher.service";
import { Teacher } from "../../Teacher";

@Component({
  selector: "teacher-readonly-extension",
  templateUrl: "./teacher-readonly-extension.component.html",
  styleUrls: [ './teacher-readonly-extension.scss'],
})
export class TeacherReadonlyExtensionComponent implements OnInit {
  
  @Input() teacherExtension: Teacher;

  constructor(private teacherService: TeacherService) {}
  ngOnInit() {
  }
}
