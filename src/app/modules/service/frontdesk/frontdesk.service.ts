import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrontdeskService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add FrontDesk
  saveFrontDeskDetails(frontdeskDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/frontdesk/addFrontdesk`, frontdeskDetails);
  }

  // update FrontDesk Details
  updateFrontDeskDetails(frontdeskDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/frontdesk/updateFrontDesk`, frontdeskDetails);
  }

  // get All details
  getFrontDeskList() {
    return this.http.get(this.baseUrl + '/admin/frontdesk/getAllFrontDeskDetails')
  }

  // delete FrontDesk
  deleteFrontDesk(frontdeskId: any) {
    return this.http.put(`${this.baseUrl}/admin/frontdesk/deleteFrontDeskDetails`, null, { params: { "frontdeskId": frontdeskId } });
  }

  // get FrontDeskDetails by id
  getFrontDeskDetails(frontdeskId: number) {
    return this.http.get(`${this.baseUrl}/admin/frontdesk/getFrontDeskDetails/${frontdeskId}`)
  }

  // get DoctorDetails by id
  // getDoctorDetailsByUserId(userId: number) {
  //   return this.http.get(`${this.baseUrl}/admin/doctor/getDoctorDetailsByUserId/${userId}`)
  // }

  // get All details
  getDeletedFrontDeskList() {
    return this.http.get(this.baseUrl + '/admin/frontdesk/getAllDeletedFrontDeskDetails')
  }

  // Undo FrontDesk
  undoFrontDeskDetails(frontdeskId: any) {
    return this.http.put(`${this.baseUrl}/admin/frontdesk/undoFrontDeskDetails`, null, { params: { "frontdeskId": frontdeskId } });
  }

}
