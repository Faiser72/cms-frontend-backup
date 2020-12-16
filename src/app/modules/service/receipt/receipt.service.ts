import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // add patientDiagnosis
  saveReceiptDetails(receiptDetails: any) {
    return this.http.post(`${this.baseUrl}/admin/receipt/addReceipt`, receiptDetails);
  }

  // update patientDiagnosis Details
  updateReceiptDetails(receiptDetails: any) {
    return this.http.put(`${this.baseUrl}/admin/receipt/updateReceipt`, receiptDetails);
  }

  // get All patientDiagnosis details
  getReceiptList() {
    return this.http.get(this.baseUrl + '/admin/receipt/getAllReceiptDetails')
  }

  // get All patientDiagnosis details
  getReceiptListByAppointmentId(appointmentId: any) {
    return this.http.get(`${this.baseUrl}/admin/receipt/getReceiptDetailsByAppointmentId/${appointmentId}`)
  }

  getReceiptListBtwnDates(fromDate: any, toDate: any) {
    return this.http.get(`${this.baseUrl}/admin/receipt/getReceiptDetailsBtwnDates/${fromDate}/${toDate}`)
  }
}
