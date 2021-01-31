import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FunctionRegister } from "app/models/FunctionRegister";
import { Observable } from "rxjs";
import { UserInfoService } from "../user-info.service";
import { ApiRequestService } from "./api-request.service";

@Injectable()
export class FunctionRegisterService {
  private baseURL = "api/function-register";
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

  getById(id: number): Observable<FunctionRegister> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  create(functionRegister: FunctionRegister): Observable<FunctionRegister> {
    return this.apiRequest.post(this.baseURL, functionRegister);
  }

  update(id: number, functionRegister: FunctionRegister): Observable<FunctionRegister> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, functionRegister);
  }

}
