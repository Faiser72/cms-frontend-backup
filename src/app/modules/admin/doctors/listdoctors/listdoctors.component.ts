import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-listdoctors',
  templateUrl: './listdoctors.component.html',
  styleUrls: ['./listdoctors.component.scss']
})
export class ListdoctorsComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";
  doctorList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "doctorName",
    "specialization",
    "morningVisitFrom",
    "phoneNumber",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private doctorService: DoctorserviceService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.startSpinner("Loading...");
    this.doctorService.getDoctorList().subscribe((response: any) => {
      if (response.success) {
        this.doctorList = response.listObject;
        this.dataSource = new MatTableDataSource(this.doctorList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
      (error) => {
        console.log(error, "Error Caught In Fetching Doctor Details");
      }
    );
    this.appComponent.stopSpinner();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  routeToDeleteDoctor(id_to_delete: any, doctor: any) {
    if (confirm(`Delete ${doctor.doctorName} doctor`)) {
      let index = this.doctorList.findIndex((data: any) => data.doctorId === doctor.doctorId);
      this.doctorService.deleteDoctor(id_to_delete).subscribe((response: any) => {
        if (response.success) {
          this.doctorList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.doctorList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        }
        this._snackBar.open(doctor.doctorName, response.message, { duration: 2500, });
      })
    }
  }


  routeToEditDoctor(doctorDetails) {
    let navigationExtras: NavigationExtras = {
      queryParams: { doctorId: doctorDetails.doctorId }
    };
    this.router.navigate(["/home/doctorshome/editdoctor"], navigationExtras);

  }

  routeToAddDoctor() {
    this.router.navigate(['/home/doctorshome/adddoctor'])
  }

}
