import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { LabtestService } from 'src/app/modules/service/labtest/labtest.service';
import { TestreportService } from 'src/app/modules/service/testreport/testreport.service';
import { Location } from '@angular/common';
import { Api } from 'src/app/api.enum';

@Component({
  selector: 'app-listpatienthistory',
  templateUrl: './listpatienthistory.component.html',
  styleUrls: ['./listpatienthistory.component.scss']
})
export class ListpatienthistoryComponent implements OnInit {

  public baseUrl = Api.baseUrl;

  // qp
  appointmentId: any; //from query params
  appointmentDetails: any;
  patientDetails: any;
  patientId: any; //from query params
  checkedDiagnosisDetails: any;
  doctorId: any;
  age: any;
  doctorDetails: any;
  // qp
  patientHistoryDetailsList: any;

  patientNumber;
  patientName;
  doctorName
  date;

  isShown: boolean = false; // hidden by default

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "drugName",
    "strength",
    "remarks",
    "duration",
    "date"
    // "action"
  ];

  dataSourceDiagnosis: any;
  displayedColumnsDiagnosis: string[] = [
    "slNo",
    "date",
    "diagnosis",
    // "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  patientHistoryDiagnosisDetailsList: any;
  diagnosisId: any;
  testReportsList: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService,
    private testreportService: TestreportService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      this.doctorId = params.doctor;

      this.patientDiagnosisService.getPatientDiagnosisDetailsByAppointmentId(this.appointmentId).subscribe((data: any) => {
        this.diagnosisId = data.object.diagnosisId;
        this.getTestReportDetails(data.object.diagnosisId);
      })

      // for prescription
      this.prescriptionService.getPrescriptionListByPatientId(this.patientId).subscribe((data: any) => {
        if (data.success) {
          this.patientHistoryDetailsList = data['listObject'];
          this.dataSource = new MatTableDataSource(data['listObject']);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        } else {
          this.dataSource = new MatTableDataSource();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        }
      });

      // for diagnosis
      this.patientDiagnosisService.getPatientDiagnosisListByPatientId(this.patientId).subscribe((data: any) => {
        if (data.success) {
          this.patientHistoryDiagnosisDetailsList = data['listObject'];
          // var x=this.patientHistoryDiagnosisDetailsList.slice(1,3);
          // console.log(x);
          this.dataSourceDiagnosis = new MatTableDataSource(data['listObject']);
          this.dataSourceDiagnosis.paginator = this.paginator;
          this.dataSourceDiagnosis.sort = this.sort;
          // this.customFilter();
        } else {
          this.dataSourceDiagnosis = new MatTableDataSource();
          this.dataSourceDiagnosis.paginator = this.paginator;
          this.dataSourceDiagnosis.sort = this.sort
        }
      });
    });

    // for patient details
    this.patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
      this.patientDetails = data.object;
      // this.addDiagnosisForm.patchValue({ patient: data.object })

      this.patientName = this.patientDetails.patientName;
      this.patientNumber = this.patientDetails.patientNumber;
      this.age = this.patientDetails.age;
    })

    // for appointment details
    this.appointmentService.getAppointmentDetails(this.appointmentId).subscribe((data: any) => {
      this.appointmentDetails = data.object;
      this.date = data.object.appointmentDate;
      // this.addDiagnosisForm.patchValue({ appointment: data.object })
    })

    // for doctor details
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
      this.doctorDetails = data.object;
      // this.addDiagnosisForm.patchValue({ doctorName: data.object })
      this.doctorName = this.doctorDetails.doctorName;
    })




  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // applyFilterDiagnosis(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSourceDiagnosis.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSourceDiagnosis.paginator) {
  //     this.dataSourceDiagnosis.paginator.firstPage();
  //   }
  // }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  back() {
    this.location.back();
  }

  getTestReportDetails(diagnosisId) {
    this.testreportService.getAllTestReportsDetails(diagnosisId).subscribe((data: any) => {
      if (data.success) {
        this.testReportsList = data['listObject'];
        console.log(this.testReportsList);
      }
    })
  }

  downloadTestReport() {
    this.testreportService.getTestReportsFile(this.diagnosisId).subscribe((response: any) => {
      if (response.success) {
        let base64Data = response.byteArray;
        fetch("data:application/pdf;base64," + base64Data)
          .then(function (resp) { return resp.blob() })
          .then(function (blob) {
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
          });
      } else {
        this._snackBar.open("Alert !", "TestReport File Not Found", { duration: 2500 });
      }
    }, (error: any) => {
      console.log(error);
    });
  }
}
