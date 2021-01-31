import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'app/app-config';
import { Observable } from 'rxjs';
import { UserInfoService } from '../user-info.service';
import { ApiRequestService } from './api-request.service';
import { TranslateService } from './translate.service';

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  pronouns?: string;
  photos?: string;
  status?: string;
  role?: string;
  roles?: Role[];
  department?: string;
  about?: string;
  createdAt?: Date;
  updatedAt?: Date;
  accountId?: number;
  createdBy?: number;
  updatedBy: number;

}
export interface Role {
    id: number;
    name: string;
    description: string;
}
@Injectable()
export class UserProfileService {

  private userProfileURL = 'api/user-profile';
  private postUserProfilePicURL= 'api/upload';
  private getUserProfilePicURL = 'api/retrieve-image';
  private userAcountURL = 'api/user-account';


    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService,
        private userInfoService: UserInfoService,
        private http: HttpClient,
        private appConfig: AppConfig,
    ) {}

/*     getAll(page?:number, size?:number): Observable<any> {
        //Create Request URL params
        let me = this;
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");
        // get all
        // return this.apiRequest.get('api/instructors');
        // paginated data
        return this.apiRequest.get(this.baseURL, params);
        
    } */

    getUserProfile() :Observable<UserProfile> {
        const _http = this.userProfileURL;
        return this.apiRequest.get(_http);
        
    }
    updateUserProfile(user: UserProfile) :Observable<UserProfile> {
        const _http = this.userProfileURL;
        return this.apiRequest.put(_http, user);
    }

     uploadUserProfilePic(fileToUpload: File) :Observable<any> {
        const formData: FormData = new FormData();
        formData.append('imageFile', fileToUpload, fileToUpload.name);
        return this.http.post(this.appConfig.baseApiPath + this.postUserProfilePicURL, formData, { reportProgress:true, observe: 'events' });
    }

    getProfilePic() :Observable<any> {
        return this.apiRequest.get(this.getUserProfilePicURL);
    }


    getUserAccountDetails() {
        return this.apiRequest.get(this.userAcountURL);
    }





}
