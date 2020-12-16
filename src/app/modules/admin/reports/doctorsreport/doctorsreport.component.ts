import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { AppComponent } from 'src/app/app.component';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doctorsreport',
  templateUrl: './doctorsreport.component.html',
  styleUrls: ['./doctorsreport.component.scss']
})
export class DoctorsreportComponent implements OnInit {

  isShown1: boolean = false; // hidden by default

  dataSource1: any;
  displayedColumns1: string[] = [
    "slNo",
    // "patientName",
    "doctorName",
    "appointmentDate",
    "appointmentTime"
    // "total"
    // "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  appointmentReportOfDoctorsForm: FormGroup;
  appointmentDetailsListOfDoctor: any;
  doctorId: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private appComponent: AppComponent,
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit() {
    this.appointmentReportOfDoctorsFormBuilder();
  }

  appointmentReportOfDoctorsFormBuilder() {
    this.appointmentReportOfDoctorsForm = this.fb.group({
      date: [null, [Validators.required]],
    });
  }

  getAppointmentDetailsOfDoctorByDate() {
    this.appointmentService.getAppointmentDetailsByDate(this.appointmentReportOfDoctorsForm.value.date).subscribe((data: any) => {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      if (data.success) {
        this.appointmentDetailsListOfDoctor = data['listObject'];
        this.dataSource1 = new MatTableDataSource(data['listObject']);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        setTimeout(() => {
          this.toggleShow1();
          this.appComponent.stopSpinner();
        }, 500);
      } else {
        this.dataSource1 = new MatTableDataSource();
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort
        setTimeout(() => {
          alert('sorry No Doctors have appointment on this date')
          this.appComponent.stopSpinner();
        }, 1000);
      }
    });
  }

  toggleShow1() {
    this.isShown1 = !this.isShown1;
  }

  printAppointmentDoctors(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  backToReportHome() {
    this.location.back();
  }
}
