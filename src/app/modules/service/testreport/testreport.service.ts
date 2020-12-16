import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestreportService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add testreports
  saveTestReportsDetails(testReportsDetails: any) {
    return this.http.post(`${this.baseUrl}/testreports/addTestReports`, testReportsDetails);
  }

  // update testreports Details
  updateTestReportsDetails(testReportsDetails: any) {
    return this.http.put(`${this.baseUrl}/testreports/updateTestReports`, testReportsDetails);
  }

  // get All testreports details
  getTestReportsList() {
    return this.http.get(this.baseUrl + '/testreports/getAllTestReportsDetails')
  }

  // delete testreports
  deleteTestReportsPatient(testReportsId: any) {
    return this.http.put(`${this.baseUrl}/testreports/deleteTestReportsDetails`, null, { params: { "testReportsId": testReportsId } });
  }

  // get testreports by id
  getTestReportsDetails(testReportsId: number) {
    return this.http.get(`${this.baseUrl}/testreports/getTestReportsDetails/${testReportsId}`)
  }

  saveOrUpdateTestReportFile(formData: any) {
    return this.http.post(`${this.baseUrl}/testreports/saveOrUpdateTestReportFile`, formData);
  }

  getTestReportsFile(diagnosisId: any) {
    return this.http.get(`${this.baseUrl}/testreports/getTestReportsFile`, { params: { "diagnosisId": diagnosisId } });
  }

  getAllTestReportsDetails(diagnosisId: any) {
    return this.http.get(`${this.baseUrl}/testreports/getAllTestReportsDetails/${diagnosisId}`)
  }

  // getTestReportsFile(diagnosisId: any) {
  //   return this.http.get(`${this.baseUrl}/labtest/getTestReportsFile`, { params: { "diagnosisId": diagnosisId } });
  // }

  // get All testreports details
  // getPatientDiagnosisListByPatientId(patientId: any) {
  //   return this.http.get(`${this.baseUrl}/patientdiagnosis/getAllPatientDiagnosisDetailsByPatientId/${patientId}`)
  // }

  // getAllExceptThisPatientId(id: any) {
  //   return this.http.get(`${this.baseUrl}/patientdiagnosis/getAllExceptThisId`, { params: { "id": id } });
  // }

  // checkSavedAndGetData(appointmentId: any) {
  //   return this.http.get(`${this.baseUrl}/patientdiagnosis/checkSavedAndGetData`, { params: { "appointmentId": appointmentId } })
  // }



}