import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferalService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add Reference
  saveReferenceDetails(referenceDetails: any) {
    return this.http.post(`${this.baseUrl}/reference/addReference`, referenceDetails);
  }

  // get All Reference details
  getReferenceList() {
    return this.http.get(this.baseUrl + '/reference/getAllReferenceDetails')
  }

  // get ReferenceDetails by id
  getReferenceDetails(referenceId: number) {
    return this.http.get(`${this.baseUrl}/reference/getReferenceDetails/${referenceId}`)
  }

  // get ReferenceDetailsByPatientIdAndDate 
  getReferenceDetailsByPatientIdAndDate(patientId: number, date: any) {
    return this.http.get(`${this.baseUrl}/reference/getReferenceDetailsByPatientIdAndDate/${patientId}/${date}`)
  }

  checkSavedAndGetData(appointmentId: any) {
    return this.http.get(`${this.baseUrl}/reference/checkSavedAndGetData`, { params: { "appointmentId": appointmentId } })
  }

  // update reference Details
  updateReferenceDetails(referenceDetails: any) {
    return this.http.put(`${this.baseUrl}/reference/updateReference`, referenceDetails);
  }

}
