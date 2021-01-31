import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { HttpParams} from "@angular/common/http";
import { UserInfoService } from '../user-info.service';
import { Rn_Menu_Group_Header } from 'app/models/Rn_Menu_Group_Header';
import { Rn_Main_Menu } from 'app/models/Rn_Main_Menu';

@Injectable()
export class MenuGroupService {
    private baseURL = 'api/menu-group';

    constructor(
        private apiRequest: ApiRequestService,
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

    getById(id: number) :Observable<Rn_Menu_Group_Header> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.get(_http);
    }

    create(rn_menu_group_header: Rn_Menu_Group_Header) :Observable<Rn_Menu_Group_Header> {
        return this.apiRequest.post(this.baseURL, rn_menu_group_header);
    }

    update(id: number, rn_menu_group_header: Rn_Menu_Group_Header) :Observable<Rn_Menu_Group_Header> {
        const _http = this.baseURL + '/' + id;
        return this.apiRequest.put(_http, rn_menu_group_header);
    }

    

    getByCurrentUserMenuGroupId(): Observable<Rn_Main_Menu[]> {
        const _http = "api/load-menus"
        return this.apiRequest.get(_http);
    }
    
}