import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';

@Component({
  selector: 'app-appointmentconformation',
  templateUrl: './appointmentconformation.component.html',
  styleUrls: ['./appointmentconformation.component.scss']
})
export class AppointmentconformationComponent implements OnInit {

  dataSource: any;
  today: any;
  displayedColumns: string[] = [
    "slNo",
    "patientNumber",
    "patientName",
    "phoneNumber",
    "doctorName",
    "appointmentDate",
    "appointmentTime",
    "conformation",
    "complete"
  ];

  appointmentDetailsList: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appointmentService: AppointmentService) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAllAppointmentDetailsByCurrentDate(this.today).subscribe((data: any) => {
      if (data.success) {
        this.appointmentDetailsList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
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

  routeToDeleteDoctor(appointmentDetails) {
    if (confirm(`Are you sure to delete this appointment ?`)) {
      let index = this.appointmentDetailsList.findIndex((data: any) => data.appointmentId === appointmentDetails.appointmentId);
      if ((appointmentDetails.appointmentId > 0) && (index > -1)) {
        this.appointmentService.deleteAppointment(appointmentDetails.appointmentId).subscribe((resp: any) => {
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

  routeToConfirmAppointment(appointmentDetails: any) {
    if (confirm(`Has the patient confirmed?`)) {
      this.appointmentService.conformation(appointmentDetails.appointmentId).subscribe((response: any) => {
        if (response.success) {
          this.getAppointments();
          // this.getAllUserDetails();
        }
        this._snackBar.open(appointmentDetails.apointmentId, response.message, { duration: 2500, panelClass: ['mat-primary'] });
      })
    }
  }

  routeToCancleConfirmAppointment(appointmentDetails: any) {
    if (confirm(`Has the patient canceled appointment?`)) {
      this.appointmentService.cancelconformation(appointmentDetails.appointmentId).subscribe((response: any) => {
        if (response.success) {
          this.getAppointments();
          // this.getAllUserDetails();
        }
        this._snackBar.open(appointmentDetails.apointmentId, response.message, { duration: 2500, panelClass: ['mat-primary'] });
      })
    }
  }

  routeToCompleteAppointment(appointmentDetails: any) {
    if (confirm(`Has the patient completed his test?`)) {
      this.appointmentService.completed(appointmentDetails.appointmentId).subscribe((response: any) => {
        if (response.success) {
          this.getAppointments();
          // this.getAllUserDetails();
        }
        this._snackBar.open(appointmentDetails.apointmentId, response.message, { duration: 2500, panelClass: ['mat-primary'] });
      })
    }
  }

  routeToAddAppointment() {
    this.router.navigate(['/home/appointmenthome/addappointment'])
  }

  isTested(testedFlag) {
    if (testedFlag == 1) {
      return true
    }
    return false
  }
}

