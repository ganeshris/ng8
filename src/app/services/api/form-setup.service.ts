import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TranslateService } from './translate.service';
import { ApiRequestService } from './api-request.service';
import { HttpParams} from "@angular/common/http";
import { UserInfoService } from '../user-info.service';
import { Rn_Forms_Setup } from 'app/models/Rn_Forms_Setup';

@Injectable()
export class FormSetupService {

    private baseURL = 'api/form_setup';
    private buildDynamicFormURL = 'api/dynamic_form_build';

    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService,
        private userInfoService: UserInfoService
    ) {}

    getAll(page?:number, size?:number): Observable<any> {
        //Create Request URL params
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");
        //const _http = this.baseURL + '/all';
        return this.apiRequest.get(this.baseURL, params);
        
    }

    getById(id: number) :Observable<Rn_Forms_Setup> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.get(_http);
    }

    create(rn_forms_setup: Rn_Forms_Setup) :Observable<Rn_Forms_Setup> {
        return this.apiRequest.post(this.baseURL, rn_forms_setup);
    }

    update(id: number, rn_forms_setup: Rn_Forms_Setup) :Observable<Rn_Forms_Setup> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.put(_http, rn_forms_setup);
    }

    buildDynamicForm(form_id?:number): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('form_id', form_id.toString());
        return this.apiRequest.get(this.buildDynamicFormURL, params);
        
    }
    
}