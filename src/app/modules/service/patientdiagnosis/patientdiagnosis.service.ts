import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientdiagnosisService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add patientDiagnosis
  savePatientDiagnosisDetails(patientDiagnosisDetails: any) {
    return this.http.post(`${this.baseUrl}/patientdiagnosis/addDiagnosis`, patientDiagnosisDetails);
  }

  // update patientDiagnosis Details
  updatePatientDiagnosisDetails(patientDiagnosisDetails: any) {
    return this.http.put(`${this.baseUrl}/patientdiagnosis/updatePatientDiagnosis`, patientDiagnosisDetails);
  }

  // get All patientDiagnosis details
  getPatientDiagnosisList() {
    return this.http.get(this.baseUrl + '/patientdiagnosis/getAllPatientDiagnosisDetails')
  }

  // get All patientDiagnosis details
  getPatientDiagnosisListByPatientId(patientId: any) {
    return this.http.get(`${this.baseUrl}/patientdiagnosis/getAllPatientDiagnosisDetailsByPatientId/${patientId}`)
  }

  // delete patient
  deleteDiagnosisPatient(patientDiagnosisId: any) {
    return this.http.put(`${this.baseUrl}/patientdiagnosis/deletePatientDiagnosisDetails`, null, { params: { "patientDiagnosisId": patientDiagnosisId } });
  }


  // get patientDiagnosisDetails by id
  getPatientDiagnosisDetails(patientDiagnosisId: number) {
    return this.http.get(`${this.baseUrl}/patientdiagnosis/getPatientDiagnosisDetails/${patientDiagnosisId}`)
  }

  saveOrUpdateThyroidFiles(formData: any) {
    return this.http.post(`${this.baseUrl}/patientdiagnosis/saveOrUpdateThyroidFile`, formData);
  }

  // getAllExceptThisPatientId(id: any) {
  //   return this.http.get(`${this.baseUrl}/patientdiagnosis/getAllExceptThisId`, { params: { "id": id } });
  // }

  checkSavedAndGetData(appointmentId: any) {
    return this.http.get(`${this.baseUrl}/patientdiagnosis/checkSavedAndGetData`, { params: { "appointmentId": appointmentId } })
  }

  getThyroidFile(diagnosisId: any) {
    return this.http.get(`${this.baseUrl}/patientdiagnosis/getThyroidFile`, { params: { "diagnosisId": diagnosisId } });
  }

  // get patientDiagnosisDetails by AppointmentId
  getPatientDiagnosisDetailsByAppointmentId(appointmentId: number) {
    return this.http.get(`${this.baseUrl}/patientdiagnosis/getPatientDiagnosisDetailsByAppointmentId/${appointmentId}`)
  }

} 