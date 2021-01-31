import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { TeacherService } from "app/services/api/teacher.service";
import { Teacher } from "../../Teacher";

// ======== TASK ==============//
@Component({
  selector: "teacher-edit-extension",
  templateUrl: "./teacher-edit-extension.component.html",
  styleUrls: [ './teacher-edit-extension.scss'],
})
export class TeacherEditExtensionComponent implements OnInit {
  @Input() teacherExtension: Teacher;
  @Output() teacherExtensionChange = new EventEmitter();
    
  change(newValue) {
      console.log('newvalue', newValue)
      this.teacherExtension = newValue;
      this.teacherExtensionChange.emit(this.teacherExtension);
    }
  constructor() {}
  ngOnInit() {
  }

 /* you need to get the value of extension fields and update and return back to the teacher's component */


}
