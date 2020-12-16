import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { AppComponent } from 'src/app/app.component';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { Location } from '@angular/common';
import { ReceiptService } from 'src/app/modules/service/receipt/receipt.service';

@Component({
  selector: 'app-revenuereport',
  templateUrl: './revenuereport.component.html',
  styleUrls: ['./revenuereport.component.scss']
})
export class RevenuereportComponent implements OnInit {

  patientReportForm: FormGroup;

  isShown: boolean = false; // hidden by default

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "appointment",
    // "appointment",
    "patientName",
    "amount",
    "date"
    // "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  appointmentDetailsList: any;
  result: number = 0;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private appointmentService: AppointmentService,
    private location: Location,
    private prescriptionService: PrescriptionService,
    private receiptService: ReceiptService) { }

  ngOnInit() {

    this.patientReportFormBuilder();
  }

  patientReportFormBuilder() {
    this.patientReportForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
    });
  }

  getPatientDetailsByDate() {
    this.receiptService.getReceiptListBtwnDates(this.patientReportForm.value.fromDate, this.patientReportForm.value.toDate).subscribe((data: any) => {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      if (data.success) {
        this.appointmentDetailsList = data['listObject'];
        this.appointmentDetailsList.forEach(a => this.result += a.amount);
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.toggleShow();
          this.appComponent.stopSpinner();
        }, 500);
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        setTimeout(() => {
          alert('sorry No patients tested between this date')
          this.appComponent.stopSpinner();
        }, 1000);
      }
    });
  }



  toggleShow() {
    this.isShown = !this.isShown;
  }

  printRevenue(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  backToReportsHome() {
    this.location.back();
  }

  getTotalCost() {
    return this.dataSource.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }
}
