import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService } from 'src/app/modules/service/users/users.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  userDetailsList: any;
  displayedColumns: string[] = ["slNo", "username", "displayName", "emailId", "mobileNo", "userType",
    //  "action"
  ];

  constructor(
    public router: Router,
    private _snackBar: MatSnackBar,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getAllUserDetails().subscribe((data: any) => {
      if (data.success) {
        this.userDetailsList = data["listObject"];
        this.dataSource = new MatTableDataSource(data["listObject"]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.username + data.displayName + data.emailId + data.mobileNo;
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

  addUser = () => {
    this.router.navigate(["/home/usershome/addUser"]);
  };

  editUser(userDetails: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { userId: userDetails.userId },
    };
    this.router.navigate(["/home/usershome/editUsers"], navigationExtras);
  }

  deleteUser(userDetails: any) {
    if (confirm(`Are you sure to delete this user ?`)) {
      let index = this.userDetailsList.findIndex((data: any) => data.userId === userDetails.userId);
      if (userDetails.userId > 0 && index > -1) {
        this.usersService.deleteUserDetails(userDetails.userId).subscribe((resp: any) => {
          if (resp.success) {
            this.userDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.userDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.customFilter();
          }
          this._snackBar.open(userDetails.username, resp.message, { duration: 2500 });
        }, (error) => {
          this._snackBar.open("Error! - ", "Something Went Wrong! Try again.", { duration: 3500 });
        });
      }
    }
  }

  isAdminRole(rouserDetails: any) {
    if (rouserDetails.userType.role == "ROLE_ADMIN")
      return true;
    else
      return false;
  }

}
