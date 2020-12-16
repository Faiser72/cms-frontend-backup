import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add Prescription
  savePrescriptionDetails(patientDetails: any) {
    return this.http.post(`${this.baseUrl}/prescription/addPrescription`, patientDetails);
  }

  // update Prescription Details
  updatePrescriptionDetails(patientDetails: any) {
    return this.http.put(`${this.baseUrl}/prescription/updatePrescription`, patientDetails);
  }

  // get All Prescription details
  getPrescriptionList() {
    return this.http.get(this.baseUrl + '/prescription/getAllPrescriptionDetails')
  }

  // delete Prescription
  deletePrescription(prescriptionId: any) {
    return this.http.put(`${this.baseUrl}/prescription/deletePrescriptionDetails`, null, { params: { "prescriptionId": prescriptionId } });
  }


  // get PrescriptionDetails by id
  getPrescriptionDetails(prescriptionId: number) {
    return this.http.get(`${this.baseUrl}/prescription/getPrescriptionDetails/${prescriptionId}`)
  }

  // get PrescriptionDetails by id
  getPrescriptionListByPatientId(patientId: number) {
    return this.http.get(`${this.baseUrl}/prescription/getAllPrescriptionDetailsByPatientId/${patientId}`)
  }

  // get PrescriptionDetails by id
  getPrescriptionDetailsByAppointment(appointmentId: number) {
    return this.http.get(`${this.baseUrl}/prescription/getPrescriptionDetailsByAppointment/${appointmentId}`)
  }

  checkSavedAndGetData(appointmentId: any) {
    return this.http.get(`${this.baseUrl}/prescription/checkSavedAndGetData`, { params: { "appointmentId": appointmentId } })
  }

  // get PrescriptionDetails By PatientId And Date
  getPrescriptionDetailsByPatientIdAndDate(patientId: number, date: any) {
    return this.http.get(`${this.baseUrl}/prescription/getPrescriptionDetailsByPatientIdAndDate/${patientId}/${date}`)
  }

}