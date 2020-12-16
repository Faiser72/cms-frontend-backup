import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { AuthenticationService } from 'src/app/modules/service/authentication/authentication.service';
import { UsersService } from 'src/app/modules/service/users/users.service';
import { isNullOrUndefined } from 'util';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';

@Component({
  selector: 'app-myappointment',
  templateUrl: './myappointment.component.html',
  styleUrls: ['./myappointment.component.scss']
})
export class MyappointmentComponent implements OnInit {


  userDetails: any
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "patientNumber",
    "patientName",
    "phoneNumber",
    "doctorName",
    "appointmentDate",
    "appointmentTime",
    "action"
  ];

  userId: any;
  doctorDetails: any;

  appointmentDetailsList: any;

  today: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  doctorId: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar, private authenticationService: AuthenticationService,
    private appointmentService: AppointmentService,
    private userService: UsersService,
    private doctorService: DoctorserviceService) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit() {
    // this.appointmentService.getAppointmentList().subscribe((data: any) => {
    this.userId = sessionStorage.getItem(this.authenticationService.SESSION_USER_ID_KEY)

    // this.userService.getUserDetails(this.userId).subscribe((data: any) => {
    this.doctorService.getDoctorDetailsByUserId(this.userId).subscribe((data: any) => {
      if (data.success) {
        this.doctorDetails = data.object;
        this.doctorId = this.doctorDetails.doctorId;
      }

      // this.appointmentService.getAppointmentDetailsByDoctorIdAndDate(this.doctorId, this.today).subscribe((data: any) => {
      //   if (data.success) {
      //     console.log(data, "todays");

      //   }
      // })

      // this.appointmentService.getAppointmentDetailsByDoctorId(this.doctorId).subscribe((data: any) => {
      if (!isNullOrUndefined(this.doctorId)) {
        this.appointmentService.getAppointmentDetailsByDoctorIdAndDate(this.doctorId, this.today).subscribe((data: any) => {
          if (data.success) {
            this.appointmentDetailsList = data['listObject'];
            this.dataSource = new MatTableDataSource(data['listObject']);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.customFilter();
          } else {
            alert("No appointments today")
            this.dataSource = new MatTableDataSource();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
          }
        });
      }
    });
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.patientNumber.patientNumber + data.doctorName.doctorName + data.patientName + data.phoneNumber + data.appointmentDate + data.appointmentTime;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToMakeTested(appointmentDetails) {
    if (confirm(`Are You Done With This Patient ?`)) {
      let index = this.appointmentDetailsList.findIndex((data: any) => data.appointmentId === appointmentDetails.appointmentId);
      if ((appointmentDetails.appointmentId > 0) && (index > -1)) {
        this.appointmentService.testedAppointment(appointmentDetails.appointmentId).subscribe((resp: any) => {
          if (resp.success) {
            this.appointmentDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.appointmentDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.customFilter();
          }
          this._snackBar.open(appointmentDetails.patientName, resp.message, { duration: 2500 });
        });
      }
    }
  }


  routeToEditDoctor(appointmentDetails: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { appointmentId: appointmentDetails.appointmentId }
    };
    this.router.navigate(["/home/appointmenthome/editappointment"], navigationExtras);
  }


  routeToAddAppointment() {
    this.router.navigate(['/home/appointmenthome/addappointment'])
  }

  routeToPreliminarycheck(a, b) {
    this.router.navigate(['/home/appointmenthome/preliminarycheck'])
  }

  routeToAppointmentDashboard(patient: any, appointment: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { patient: patient.patientId, appointment: appointment.appointmentId, doctor: this.doctorId },
    };
    this.router.navigate(
      ["/home/appointmentDashboard"],
      navigationExtras
    );
  }
}


