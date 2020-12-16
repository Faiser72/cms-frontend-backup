import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { FrontdeskService } from 'src/app/modules/service/frontdesk/frontdesk.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-deletedfrontdesklist',
  templateUrl: './deletedfrontdesklist.component.html',
  styleUrls: ['./deletedfrontdesklist.component.scss']
})
export class DeletedfrontdesklistComponent implements OnInit {

  deleted_successfully_message: string = "Undo Successfully";
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "frontDeskName",
    "gender",
    "mobileNo",
    "emailId",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  frontdeskList: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private frontdeskService: FrontdeskService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.startSpinner("Loading...");
    this.frontdeskService.getDeletedFrontDeskList().subscribe((response: any) => {
      if (response.success) {
        this.frontdeskList = response.listObject;
        this.dataSource = new MatTableDataSource(this.frontdeskList);
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
        console.log(error, "Error Caught In Fetching FrontDesk Details");
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


  routeToUndoFrontDesk(id_to_undo: any, frontdesk: any) {
    if (confirm(`Undo deletion of ${frontdesk.frontDeskName} `)) {
      let index = this.frontdeskList.findIndex((data: any) => data.frontdeskId === frontdesk.frontdeskId);
      this.frontdeskService.undoFrontDeskDetails(id_to_undo).subscribe((response: any) => {
        if (response.success) {
          this.frontdeskList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.frontdeskList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        }
        this._snackBar.open(frontdesk.frontDeskName, response.message, { duration: 2500, });
      })
    }
  }


  routeToEditFrontDesk(frontdeskDetails) {
    let navigationExtras: NavigationExtras = {
      queryParams: { frontdeskId: frontdeskDetails.frontdeskId }
    };
    this.router.navigate(["/home/frontDeskHome/editFrontDesk"], navigationExtras);

  }

  routeToAddFrontDesk() {
    this.router.navigate(['/home/frontDeskHome/addfrontDesk'])
  }

}


