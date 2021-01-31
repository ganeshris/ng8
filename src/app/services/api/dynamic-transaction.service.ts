import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TranslateService } from './translate.service';
import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpParams} from "@angular/common/http";
import { UserInfoService } from '../user-info.service';
import { DynamicForm } from 'app/models/DynamicForm';

@Injectable()
export class DynamicTransactionService {

    private baseURL = 'api/dynamic_transaction';

    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService,
        private userInfoService: UserInfoService,
        private http: HttpClient
    ) {}

    getAll(page?:number, size?:number): Observable<any> {
        //Create Request URL params
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");
        const _http = this.baseURL + '/all';
        return this.apiRequest.get(_http, params);
    }

    // get listof data (GRID)
    getByFormId(form_id:number): Observable<any> {
        //Create Request URL params
        let params: HttpParams = new HttpParams();
        params = params.append('form_id',  form_id.toString());
        return this.apiRequest.get(this.baseURL, params);
    }

  /*   getById(id: number) :Observable<DynamicForm> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.get(_http);
    } */
    //get one data (read-only, update form)
    getByIdAndFormId(id: number, form_id:number) :Observable<DynamicForm> {
        let params: HttpParams = new HttpParams();
        params = params.append('form_id',  form_id.toString());
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.get(_http, params);
    }

    


    create(dynamicForm: DynamicForm) :Observable<DynamicForm> {
        return this.apiRequest.post(this.baseURL, dynamicForm);
    }

    /* update(id: number, dynamicForm: DynamicForm) :Observable<DynamicForm> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.put(_http, dynamicForm);
    } */

    updateByIdAndFormId(id: number, form_id: number, dynamicForm: DynamicForm) :Observable<DynamicForm> {
        let params: HttpParams = new HttpParams();
        params = params.append('form_id',  form_id.toString());
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.put(_http, dynamicForm, params);
    }
    
}