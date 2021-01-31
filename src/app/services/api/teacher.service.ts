import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TranslateService } from './translate.service';
import { ApiRequestService } from './api-request.service';
import { HttpHeaders, HttpParams} from "@angular/common/http";
import { Teacher } from 'app/pages/university/teacher/Teacher';
import { UserInfoService } from '../user-info.service';

@Injectable()
export class TeacherService {

    private baseURL = 'api/teacher';

  /*   let headers = new HttpHeaders();
    headers = headers.set('h1', 'v1').set('h2','v2'); */
   

    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService,
        private userInfoService: UserInfoService
    ) {}

    getAll(page?:number, size?:number): Observable<any> {
        //Create Request URL params
        let me = this;
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");
        // get all
        // return this.apiRequest.get('api/instructors');
        // paginated data
        return this.apiRequest.get(this.baseURL, params);
        
    }

    getById(id: number) :Observable<Teacher> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.get(_http);
        
    }

    create(teacher: Teacher) :Observable<Teacher> {
        //`${this.baseURL}`
        return this.apiRequest.post(this.baseURL, teacher);
    }

    update(id: number, teacher: Teacher) :Observable<Teacher> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.put(_http, teacher);
    }
    

}