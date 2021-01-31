import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TranslateService } from './translate.service';
import { ApiRequestService } from './api-request.service';
import { HttpParams} from "@angular/common/http";
import { Instructor } from 'app/pages/instructor/Instructor';

@Injectable()
export class InstructorService {

    private baseURL = 'api/instructors';
    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService
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
        return this.apiRequest.get('api/instructors',params);
        
    }

    getById(id: number) :Observable<Instructor> {
        return this.apiRequest.get(this.baseURL + '/' + id);
        //return this.apiRequest.get('api/order-stats/' + field );
        
    }

    create(instructor: Object) :Observable<Instructor> {
        //`${this.baseURL}`
        return this.apiRequest.post(this.baseURL, instructor);

    }

    update(id: number, instructor: Instructor) :Observable<Instructor> {
        return this.apiRequest.put(this.baseURL + "/" + id, instructor);
    }

}