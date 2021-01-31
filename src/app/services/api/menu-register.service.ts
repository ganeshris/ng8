import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuRegister } from "app/models/MenuRegister";
import { Observable } from "rxjs";
import { UserInfoService } from "../user-info.service";
import { ApiRequestService } from "./api-request.service";

@Injectable()
export class MenuRegisterService {
  private baseURL = "api/menu-register";
  constructor(
    private apiRequest: ApiRequestService,
    private userInfoService: UserInfoService
  ) {}

  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    //const _http = this.baseURL + '/all';
    return this.apiRequest.get(this.baseURL, params);
  }

  getById(id: number): Observable<MenuRegister> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  // this is same as get all 
  /*--- need modification in backend */
  getByAccountId(): Observable<MenuRegister[]> {
      const _http = this.baseURL + "/user-menu";
      return this.apiRequest.get(_http);
  }

  create(menuRegister: MenuRegister): Observable<MenuRegister> {
    return this.apiRequest.post(this.baseURL, menuRegister);
  }

  update(id: number, menuRegister: MenuRegister): Observable<MenuRegister> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, menuRegister);
  }
}
