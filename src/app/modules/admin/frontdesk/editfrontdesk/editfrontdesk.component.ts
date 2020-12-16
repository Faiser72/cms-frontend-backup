import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { UsersService } from 'src/app/modules/service/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { FrontdeskService } from 'src/app/modules/service/frontdesk/frontdesk.service';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editfrontdesk',
  templateUrl: './editfrontdesk.component.html',
  styleUrls: ['./editfrontdesk.component.scss']
})
export class EditfrontdeskComponent implements OnInit {

  editFrontDeskForm: FormGroup;
  // userDetailsList: any;
  allUsersList: any;
  doctorId: any;
  userTypeList: any;
  age: number;
  frontDeskDetailsList: any;
  frontdeskId: any;
  frontdesk: any;
  userId: any;
  minDate: any;
  maxDate: any;

  constructor(private formBuilder: FormBuilder,
    private doctorService: DoctorserviceService,
    private usersService: UsersService, private route: ActivatedRoute,
    private location: Location,
    private frontdeskService: FrontdeskService,
    private appComponent: AppComponent) {
    this.route.queryParams.subscribe(params => {
      this.doctorId = params.doctorId;
    });

    // for date validation starts
    var minCurrentDate = new Date();
    var maxNewDate = new Date();
    this.minDate = minCurrentDate;
    this.maxDate = maxNewDate.setMonth(maxNewDate.getMonth() + 1);
    // for date validation ends
  }

  ngOnInit() {

    this.route.queryParams.subscribe((data) => {
      this.frontdeskId = data.frontdeskId;
    });



    this.frontdeskService.getFrontDeskDetails(this.frontdeskId).subscribe((data: any) => {
      this.frontdesk = data.object;
      this.userId = this.frontdesk.user.userId;
      this.editFrontDeskForm.patchValue(this.frontdesk);

      this.usersService.getAllUsersExceptOneUser(this.userId).subscribe((data: any) => {
        this.allUsersList = data.listObject;
      });

    });
    this.editFrontDeskFormBuilder();
  }

  editFrontDeskFormBuilder() {
    this.editFrontDeskForm = this.formBuilder.group({
      frontDeskName: [null, [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z \s]+$")]],
      gender: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      emailId: [null,
        [
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$")
          ])
        ]
      ],
      age: "",
      // mobileNo: [null, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      mobileNo: [null, [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{9}$")]],
      frontdeskId: ""
      // doctor:""
    });
    this.editFrontDeskForm.setValidators(this.customValidation());
  }

  ageFromDateOfBirth(dateOfBirth: any): number {
    if (dateOfBirth != null) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (isNaN(age)) {
        age = null
      }
      this.editFrontDeskForm.patchValue({ age: age });
      return (this.age = age);
    }
  }

  updateFrontDeskDetails() {
    if (this.editFrontDeskForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.frontdeskService.updateFrontDeskDetails(this.editFrontDeskForm.value).subscribe(
        (resp: any) => {
          if (resp.success) {
            setTimeout(() => {
              alert(resp.message);
              this.appComponent.stopSpinner();
              this.backToFrontDeskList();
            }, 1000);
          } else {
            setTimeout(() => {
              alert(resp.message);
              this.appComponent.stopSpinner();
            }, 1000);
          }
        },
        (error) => {
          setTimeout(() => {
            alert("Error! - Something Went Wrong! Try again.");
            this.appComponent.stopSpinner();
          }, 1000);
        }
      );
    } else {
      alert("Please, fill the proper details.");
    }
  }

  backToFrontDeskList() {
    this.location.back();
  }

  emailIdInputMsg: string; emailId: string;

  mobileNoInputMsg: string; mobileNo: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      //Email-Id
      const emailIdFormGroup = formGroup.controls["emailId"];
      if (emailIdFormGroup.value !== "" && emailIdFormGroup.value !== null) {
        if (emailIdFormGroup.valid) {
          if (!isNullOrUndefined(this.allUsersList)) {
            this.allUsersList.forEach((data: any) => {
              if (data.emailId == emailIdFormGroup.value.toLowerCase()) {
                this.emailId = data.emailId;
                this.emailIdInputMsg = "This email id is registered already";
                emailIdFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.emailId == emailIdFormGroup.value.toLowerCase()) {
            this.emailIdInputMsg = "This email id is registered already";
          } else {
            this.emailIdInputMsg = 'Please enter valid emailId.';
          }
        }
      } else {
        this.emailIdInputMsg = "Please enter this field.";
      }

      // MobileNo
      const mobileNoFormGroup = formGroup.controls["mobileNo"];
      if (mobileNoFormGroup.value !== "" && mobileNoFormGroup.value !== null) {
        if (mobileNoFormGroup.valid) {
          if (!isNullOrUndefined(this.allUsersList)) {
            this.allUsersList.forEach((data: any) => {
              if (data.mobileNo == mobileNoFormGroup.value) {
                this.mobileNo = data.mobileNo;
                this.mobileNoInputMsg = "This mobile number is registered already";
                mobileNoFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.mobileNo == mobileNoFormGroup.value) {
            this.mobileNoInputMsg = "This mobile number is registered already";
          } else {
            this.mobileNoInputMsg = 'Please enter 10 digit valid mobile no.';
          }
        }
      } else {
        this.mobileNoInputMsg = "Please enter this field.";
      }
      return;
    };
  }
}

