import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add doctors
  saveDoctorDetails(doctorDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/doctor/addDoctor`, doctorDetails);
  }

  saveOrUpdateProfilePhoto(formData: any) {
    return this.http.post(`${this.baseUrl}/admin/doctor/saveOrUpdateDoctorProfilePhoto`, formData);
  }

  // update Doctor Details
  updateDoctorDetails(doctorDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/doctor/updateDoctor`, doctorDetails);
  }

  // get All details
  getDoctorList() {
    return this.http.get(this.baseUrl + '/admin/doctor/getAllDoctorDetails')
  }

  // delete Doctor
  deleteDoctor(doctorId: any) {
    return this.http.put(`${this.baseUrl}/admin/doctor/deleteDoctorDetails`, null, { params: { "doctorId": doctorId } });
  }

  getProfileFile(DoctorId: any): any {
    return this.http.get(`${this.baseUrl}/admin/doctor/getProfileFile`, { params: { "DoctorId": DoctorId } });
  }

  // get DoctorDetails by id
  getDoctorDetails(doctorId: number) {
    return this.http.get(`${this.baseUrl}/admin/doctor/getDoctorDetails/${doctorId}`)
  }

  // get DoctorDetails by id
  getDoctorDetailsByUserId(userId: number) {
    return this.http.get(`${this.baseUrl}/admin/doctor/getDoctorDetailsByUserId/${userId}`)
  }

  // get All details
  getDeletedDoctorList() {
    return this.http.get(this.baseUrl + '/admin/doctor/getAllDeletedDoctorDetails')
  }

  // delete Doctor
  undoDoctor(doctorId: any) {
    return this.http.put(`${this.baseUrl}/admin/doctor/undoDoctorDetails`, null, { params: { "doctorId": doctorId } });
  }

  saveOrUpdateAgreement(formData: any) {
    return this.http.post(`${this.baseUrl}/admin/doctor/saveOrUpdateAgreement`, formData);
  }

  getAgreement(doctorId: any) {
    return this.http.get(`${this.baseUrl}/admin/doctor/getAgreement`, { params: { "doctorId": doctorId } });
  }
}
