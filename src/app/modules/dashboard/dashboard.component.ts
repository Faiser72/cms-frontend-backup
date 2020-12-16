import { Component, OnInit } from '@angular/core';
import { TimelineMax } from 'gsap';
import { Router } from '@angular/router';
import { DoctorserviceService } from '../service/doctor/doctorservice.service';
import { PatientService } from '../service/patient/patient.service';
import { AppointmentService } from '../service/appointment/appointment.service';
import { FrontdeskService } from '../service/frontdesk/frontdesk.service';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  doctorsCount: number;
  patientsCount: number;
  appointmentCount: number;
  frontdeskCount: number;
  userId: any;
  doctorDetails: any;
  doctorId: any;
  myAppointmentsCount: any;
  today: string;
  myPatientsCount: any;

  constructor(private route: Router,
    private doctorService: DoctorserviceService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private frontdeskService: FrontdeskService,
    private authenticationService: AuthenticationService) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem(this.authenticationService.SESSION_USER_ID_KEY)
    // this.userService.getUserDetails(this.userId).subscribe((data: any) => {
    if (!isNullOrUndefined(this.userId)) {
      this.doctorService.getDoctorDetailsByUserId(this.userId).subscribe((data: any) => {
        if (data.success) {
          this.doctorDetails = data.object;
          this.doctorId = this.doctorDetails.doctorId;
        }
        else {
        }

        if (!isNullOrUndefined(this.doctorId)) {
          this.appointmentService.getAppointmentDetailsByDoctorIdAndDate(this.doctorId, this.today).subscribe((data: any) => {
            if (data.success) {
              if (!isNullOrUndefined(data)) {
                this.myAppointmentsCount = data['listObject'].length;
              }
            }
          })
        }


        if (!isNullOrUndefined(this.doctorId)) {
          this.appointmentService.getAppointmentDetailsByDoctorId(this.doctorId).subscribe((data: any) => {
            if (data.success) {
              if (!isNullOrUndefined(data)) {
                this.myPatientsCount = data['listObject'].length;
              }
            }
          })
        }

      })
    }

    this.doctorService.getDoctorList().subscribe((data: any) => {
      if (data.success) {
        if (!isNullOrUndefined(data)) {
          this.doctorsCount = data['listObject'].length;
        }
      }
    })

    this.patientService.getPatientList().subscribe((data: any) => {
      if (data.success) {
        if (!isNullOrUndefined(data)) {
          this.patientsCount = data['listObject'].length;
        }
      }
    })

    this.appointmentService.getAppointmentList().subscribe((data: any) => {
      if (data.success) {
        if (!isNullOrUndefined(data)) {
          this.appointmentCount = data['listObject'].length;
        }
      }
    })

    this.frontdeskService.getFrontDeskList().subscribe((data: any) => {
      if (data.success) {
        if (!isNullOrUndefined(data)) {
          this.frontdeskCount = data['listObject'].length;
        }
      }
    })

    if (this.isUserRole()) {
      if (!localStorage.getItem('foo')) {
        localStorage.setItem('foo', 'no reload')
        location.reload()
      } else {
        localStorage.removeItem('foo')
      }
    }
  }



  isAdminRole() {
    if (this.authenticationService.getLoggedUserRole() === "ROLE_ADMIN")
      return true;
    else
      return false;
  }

  isUserRole() {
    if (this.authenticationService.getLoggedUserRole() === "ROLE_USER")
      return true;
    else
      return false;
  }

  routeToDoctors() {
    this.route.navigate(['home/doctorshome/listdoctor'])
  }

  routeToPatients() {
    this.route.navigate(['home/patientshome/listpatient'])
  }

  routeToAppointment() {
    this.route.navigate(['home/appointmenthome/listappointment'])
  }

  routeToFrontDesk() {
    this.route.navigate(['home/frontDeskHome/listFrontDesk'])
  }

  routeToMyAppointment() {
    this.route.navigate(['home/myAppointment'])
  }

  routeToMyPatients() {
    this.route.navigate(['home/myPatients'])
  }

  routeToPrint() {
    this.route.navigate(['home/printhome'])
  }

  routeToReorts() {
    this.route.navigate(['home/reportshome'])
  }

}
