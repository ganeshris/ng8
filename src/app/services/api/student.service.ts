import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from './translate.service';
import { ApiRequestService } from './api-request.service';
import { HttpParams} from "@angular/common/http";
import { Student } from 'app/pages/university/student/Student';

@Injectable()
export class StudentService {

    private baseURL = 'api/instructors/';
    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService
    ) {}

    getAll(header_id: number, page?:number, size?:number): Observable<any> {
        let me = this;
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");
        // get all
        // paginated data
        const url = this.baseURL + '/' + header_id;
        return this.apiRequest.get(url, params);
        
    }

    getByIdAndHeaderId(id: number, header_id: number) :Observable<Student> {
        const url = this.baseURL + '/' + header_id +'/student/'+ id;
        return this.apiRequest.get(url);
        
    }

    create(header_id:number, student: Student) :Observable<Student> {
        const url = this.baseURL + '/' + header_id +'/student';
        return this.apiRequest.post(url, Student);

    }

    update(id: number, header_id: number, student: Student) :Observable<Student> {
        const url = this.baseURL + '/' + header_id +'/student/'+ id;
        return this.apiRequest.put(url, student);
    }

}