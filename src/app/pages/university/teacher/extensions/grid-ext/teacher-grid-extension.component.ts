import { Component, OnInit } from "@angular/core";

@Component({
  selector: "teacher-grid-extension",
  templateUrl: "./teacher-grid-extension.component.html",
})
export class TeacherGridExtensionComponent implements OnInit {
  extColumns:any[];

  constructor() {}
  ngOnInit() {
    this.extColumns = [
      {prop:"extn1"         , name: "Extension1"           , width:90 },
      {prop:"extn2"         , name: "Extension2"           , width:90 }
  ];
  }
}
