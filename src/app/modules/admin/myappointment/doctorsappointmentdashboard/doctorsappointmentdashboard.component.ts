import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-doctorsappointmentdashboard',
  templateUrl: './doctorsappointmentdashboard.component.html',
  styleUrls: ['./doctorsappointmentdashboard.component.scss']
})
export class DoctorsappointmentdashboardComponent implements OnInit {

  companiesCount: number = 10;
  candidatesCount: number = 20;
  interviewsCount: number = 300;
  jobsCount: number = 40;
  patientId: any;
  appointmentId: any;
  doctorId: any;

  // activeCompaniesCount: number = 9;
  // activeCandidatesCount: number = 17;
  // activeInterviewsCount: number = 250;
  // activeJobsCount: number = 30;
  constructor(private route: Router,
    private router: ActivatedRoute,) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      this.doctorId = params.doctor;
    });
  }

  routeToPatientDiagnosis() {
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: this.patientId, appointment: this.appointmentId, doctor: this.doctorId },
    };
    this.route.navigate(
      ["/home/patientshome/patienthistoryanddiagnosis"],
      navigationExtras
    );
  }

  routeToPrescription() {
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: this.patientId, appointment: this.appointmentId, doctor: this.doctorId },
    };
    this.route.navigate(
      ["/home/addprescription"],
      navigationExtras
    );
  }

  routeToLabTest() {
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: this.patientId, appointment: this.appointmentId, doctor: this.doctorId },
    };
    this.route.navigate(
      ['/home/labtest'],
      navigationExtras
    );
  }

  routeToPatientHistory() {
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: this.patientId, appointment: this.appointmentId, doctor: this.doctorId },
    };
    this.route.navigate(
      ['/home/listpatienthistory'],
      navigationExtras
    );
  }

  routeToMyReference() {
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: this.patientId, appointment: this.appointmentId, doctor: this.doctorId },
    };
    this.route.navigate(
      ['/home/referalnote'],
      navigationExtras
    );
  }


  routeToMyAppointment() {
    this.route.navigate(['home/myAppointment'])
  }

}
