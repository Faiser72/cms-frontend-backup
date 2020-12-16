import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add Appointment
  saveAppointmentDetails(appointmentDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/appointment/addAppointment`, appointmentDetails);
  }

  // update Appointment Details
  updateAppointmentDetails(appointmentDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/updateAppointment`, appointmentDetails);
  }

  // get All Appointment details
  getAppointmentList() {
    return this.http.get(this.baseUrl + '/admin/appointment/getAllAppointmentDetails')
  }

  // delete Appointment
  deleteAppointment(appointmentId: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/deleteAppointmentDetails`, null, { params: { "appointmentId": appointmentId } });
  }


  // get AppointmentDetails by id
  getAppointmentDetails(appointmentId: number) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetails/${appointmentId}`)
  }

  // get AppointmentDetails by  Doctorid
  getAppointmentDetailsByDoctorId(doctorId: number) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetailsByDoctorId/${doctorId}`)
  }

  // get AppointmentDetails by  Doctorid
  getAppointmentDetailsByDoctorIdAndDate(doctorId: number, today: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetailsByDoctorIdAndDate/${doctorId}/${today}`)
  }

  // to make diagnosed or tested
  testedAppointment(appointmentId: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/testedAppointment`, null, { params: { "appointmentId": appointmentId } });
  }

  getAllTestedPatientDetailsBtwnDates(fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllTestedPatientDetailsBtwnDates/${fromDate}/${toDate}`)
  }

  getAllAppointmentsDetailsBtwnDates(fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllAppointmentsDetailsBtwnDates/${fromDate}/${toDate}`)
  }

  getAllAppointmentsDetailsOfDoctorBtwnDates(doctorId: number, fromDate: string, toDate: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllAppointmentsDetailsOfDoctorBtwnDates/${doctorId}/${fromDate}/${toDate}`)
  }


  // get All Tested Appointment details
  getAllTestedDetailsList() {
    return this.http.get(this.baseUrl + '/admin/appointment/getAllTestedDetails')
  }

  // get AppointmentDetails by  Date
  getAppointmentDetailsByDate(date: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAppointmentDetailsByDate/${date}`)
  }

  // get all appointment details by current date
  getAllAppointmentDetailsByCurrentDate(date: string) {
    return this.http.get(`${this.baseUrl}/admin/appointment/getAllAppointmentDetailsByCurrentDate/${date}`)
  }

  // conformationStatus 
  conformation(appointmentId: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/conformation`, null, { params: { "appointmentId": appointmentId } });
  }

  // completedStatus 
  completed(appointmentId: any) {
    return this.http.put(`${this.baseUrl}/admin/appointment/completed`, null, { params: { "appointmentId": appointmentId } });
  }

    // cancelconformationStatus 
    cancelconformation(appointmentId: any) {
      return this.http.put(`${this.baseUrl}/admin/appointment/cancelconformation`, null, { params: { "appointmentId": appointmentId } });
    }
  
    // unfinishedStatus 
    unfinished(appointmentId: any) {
      return this.http.put(`${this.baseUrl}/admin/appointment/unfinished`, null, { params: { "appointmentId": appointmentId } });
    }

}
