import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { PatientService } from 'src/app/modules/service/patient/patient.service';

@Component({
  selector: 'app-listpatients',
  templateUrl: './listpatients.component.html',
  styleUrls: ['./listpatients.component.scss']
})
export class ListpatientsComponent implements OnInit {
  patientDetailsList;
  company_name
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "patientNumber",
    "patientName",
    "registeredDate",
    "reasonForVisit",
    // "doctorAttended",
    // "appointmentDetails",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getPatientList().subscribe((data: any) => {
      if (data.success) {
        this.patientDetailsList = data['listObject'];
        console.log(this.patientDetailsList[0].dob);

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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToDeleteDoctor(patientDetails) {
    if (confirm(`Are you sure to delete this patient ?`)) {
      let index = this.patientDetailsList.findIndex((data: any) => data.patientId === patientDetails.patientId);
      if ((patientDetails.patientId > 0) && (index > -1)) {
        this.patientService.deletePatient(patientDetails.patientId).subscribe((resp: any) => {
          if (resp.success) {
            this.patientDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.patientDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.customFilter();
          }
          this._snackBar.open(patientDetails.patientName, resp.message, { duration: 2500 });
        });
      }
    }
  }


  routeToEditDoctor(patientDetails: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { patientId: patientDetails.patientId }
    };
    this.router.navigate(["/home/patientshome/editpatient"], navigationExtras);
  }



  routeToAddPatients() {
    this.router.navigate(['/home/patientshome/addpatient'])
  }
}
