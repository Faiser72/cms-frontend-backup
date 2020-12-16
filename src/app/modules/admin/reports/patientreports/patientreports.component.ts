import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { isNullOrUndefined } from 'util';
import { Prescription } from '../../prescription/prescriptionmodel';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patientreports',
  templateUrl: './patientreports.component.html',
  styleUrls: ['./patientreports.component.scss']
})
export class PatientreportsComponent implements OnInit {


  patientReportForm: FormGroup;

  isShown: boolean = false; // hidden by default

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "patientName",
    "doctorName",
    "appointmentDate",
    // "total"
    // "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  appointmentDetailsList: any;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private appointmentService: AppointmentService,
    private location: Location,
    private prescriptionService: PrescriptionService) { }

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
    this.appointmentService.getAllTestedPatientDetailsBtwnDates(this.patientReportForm.value.fromDate, this.patientReportForm.value.toDate).subscribe((data: any) => {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      if (data.success) {
        this.appointmentDetailsList = data['listObject'];
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

  printPrescription(cmpName) {
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
}
