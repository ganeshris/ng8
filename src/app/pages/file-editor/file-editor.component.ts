import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
export class FileData {
  id: number;
  fileName: string;
  fileLocation: string;
}

/* export class EditedData {
  constructor() {}
  id: number;
  editedText: string;
} */

export interface EditedData {
  id: number;
  text: string;
}

@Component({
  selector: "app-file-editor",
  templateUrl: "./file-editor.component.html",
  styleUrls: ["./file-editor.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FileEditorComponent implements OnInit {

  codeMirrorOptions: any = {
    theme: "lint",
    //theme: 'base16-dark.css',
    mode: "text/x-java",
    lineNumbers: true,
    //noNewlines: true,
    lineSeparator: "\n",
    lineWrapping: true,
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
  };

  /*   @ViewChild('editor') private editor: CodemirrorComponent;
  removeIndentation(){
    (keyup.enter)="removeIndentation()"
    const cm = this.editor.instance;
    //cm.replaceSelection("\n");
    cm.execCommand('delLineLeft');
  } */

  constructor(private httpService: HttpClient) {}
  ngOnInit() {
    this.getData();
  }
  data: FileData[];
  getData() {
    this.httpService
      .get<any>("./assets/json/dummy-data/file-list.json")
      .subscribe((res) => {
        console.log(res);
        this.data = res;
      });
  }

  //editedData: EditedData;
  editedData: EditedData = {} as EditedData;

  textData: string;
  readFile(id: number, location: string) {
    console.log(id, location);
    // write your logic here for reading files and witing file.....
    fetch(location)
      .then((response) => response.text())
      .then((data) => {
        this.textData = data;
        // by niladri sen
        this.editedData.id = id;
        this.editedData.text = data;
      });
  }

  // api style to read
/*   readFile(id: number, location: string) {
    console.log(id, location);
    this.httpService
      .get<EditedData>("http://localhost:9119/api/file-code-read/" + id)
      .subscribe(
        (res) => {
          console.log(res);
          this.editedData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  } */

  saveTextAsFile() {
    var editedData = this.textData;
    console.log(editedData);
    var textToSaveAsBlob = new Blob([editedData], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "savedFile.txt";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = window.URL.createObjectURL(textToSaveAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  // by niladri
  saveTextIntoFile() {
    console.log(this.editedData);
    this.httpService
      .post<EditedData>("http://localhost:9119/api/file-code-save", this.editedData)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
