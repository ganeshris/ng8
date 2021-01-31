import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "../user-info.service";
import { ApiRequestService } from "./api-request.service";
import { TranslateService } from "./translate.service";
import { Role, UserProfile } from "./user-profile.service";

@Injectable()
export class OrgUserService {
  private OrgUserURL = "api/org-users";
  private roleURL = "api/roles";
//  private roleToUser = "api/org-users/" + user_id + "/roles/" + role_id;

  constructor(
    private apiRequest: ApiRequestService,
    private translate: TranslateService,
    private userInfoService: UserInfoService,
    private http: HttpClient
  ) {}

  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
    params = params.append(
      "page",
      typeof page === "number" ? page.toString() : "0"
    );
    params = params.append(
      "size",
      typeof size === "number" ? size.toString() : "1000"
    );
    // get all
    // return this.apiRequest.get('api/instructors');
    // paginated data
    return this.apiRequest.get(this.OrgUserURL, params);
  }

  getById(id: number): Observable<UserProfile> {
    const _http = this.OrgUserURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  create(user: UserProfile): Observable<UserProfile> {
    //`${this.baseURL}`
    return this.apiRequest.post(this.OrgUserURL, user);
  }

  update(id: number, user: UserProfile): Observable<UserProfile> {
    const _http = this.OrgUserURL + "/" + id;
    return this.apiRequest.put(_http, user);
  }

  // ========== ROLES
  getAllRoles(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    return this.apiRequest.get(this.roleURL);
  }
  getRoleById(id: number): Observable<Role> {
    const _http = this.roleURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  addRoleToUser(user_id: number, role_id: number): Observable<any>{
      const _http = this.OrgUserURL + "/" + user_id + "/add-roles/" + role_id;
      return this.apiRequest.get(_http);
  }

  removeRoleToUser(user_id: number, role_id: number): Observable<any>{
    const _http = this.OrgUserURL + "/" + user_id + "/remove-roles/" + role_id;
    return this.apiRequest.get(_http);
}


}
