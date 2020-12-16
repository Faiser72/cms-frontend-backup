import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/service/authentication/authentication.service';
import { Router } from '@angular/router';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { isNullOrUndefined } from 'util';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  currentUserAvatar;
  currentUserName;
  placeholder_path: string = "assets/img/doctor/doctor.png";
  doctorPhotoName: any;
  doctorId: any;
  doctorDetails: any;
  userId: any;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private doctorService: DoctorserviceService) {
    this.currentUserName = this.authenticationService.getLoggedUser();
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

        if (!isNullOrUndefined(this.doctorId)) {
          this.doctorService.getProfileFile(this.doctorId).subscribe((response: any) => {
            if (response.success) {
              let base64Data = response.byteArray;
              this.placeholder_path = 'data:image/jpeg;base64,' + base64Data;
              this.doctorPhotoName = response.object.profilePicture;
            } else {
              console.log("There is no Profile Photo for this candidate.");
            }
          }, (error: any) => {
            console.log(error);
          });
        }
      })
    }


  }



  isAdminRole() {
    if (this.authenticationService.getLoggedUserRole() === "ROLE_ADMIN")
      return true;
    else
      return false;
  }

  /* for submenu Start here... */
  showSubmenu: boolean = false;
  showCompaniesSubmenu: boolean = false;
  showCandidatesSubmenu: boolean = false;
  showFrontDeskSubmenu: boolean = false;
  showDoctorSubmenu: boolean = false;
  showappointmentSubmenu: boolean = false;
  


  toggleSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleFrontDeskSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleDoctorSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleappointmentSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }
  /* Ends here. */

}
