import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabtestService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //  addLabTest
  saveLabTestDetails(labTestDetails: any) {
    return this.http.post(`${this.baseUrl}/labtest/addLabTest`, labTestDetails);
  }

  checkSavedAndGetData(appointmentId: any) {
    return this.http.get(`${this.baseUrl}/labtest/checkSavedAndGetData`, { params: { "appointmentId": appointmentId } })
  }

  // update patientDiagnosis Details
  updateLabtestDetails(labTestDetails: any) {
    return this.http.put(`${this.baseUrl}/labtest/updateLabTest`, labTestDetails);
  }

  // get LabTEst Details By PatientId And Date
  getLabTestDetailsByPatientIdAndDate(patientId: number, date: any) {
    return this.http.get(`${this.baseUrl}/labtest/getLabTestDetailsByPatientIdAndDate/${patientId}/${date}`)
  }
}
