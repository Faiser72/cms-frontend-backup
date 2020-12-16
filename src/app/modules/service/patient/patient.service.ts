import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add patient
  savePatientDetails(patientDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/patient/addPatient`, patientDetails);
  }

  // update patient Details
  updatePatientDetails(patientDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/patient/updatePatient`, patientDetails);
  }

  // get All patient details
  getPatientList() {
    return this.http.get(this.baseUrl + '/admin/patient/getAllPatientDetails')
  }

  // delete patient
  deletePatient(patientId: any) {
    return this.http.put(`${this.baseUrl}/admin/patient/deletePatientDetails`, null, { params: { "patientId": patientId } });
  }


  // get patientDetails by id
  getPatientDetails(patientId: number) {
    return this.http.get(`${this.baseUrl}/admin/patient/getPatientDetails/${patientId}`)
  }

  getAllExceptThisPatientId(id: any) {
    return this.http.get(`${this.baseUrl}/admin/patient/getAllExceptThisId`, { params: { "id": id } });
  }
}