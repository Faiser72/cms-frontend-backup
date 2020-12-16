import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { UsersService } from 'src/app/modules/service/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';
import { FrontdeskService } from 'src/app/modules/service/frontdesk/frontdesk.service';

@Component({
  selector: 'app-addfrontdesk',
  templateUrl: './addfrontdesk.component.html',
  styleUrls: ['./addfrontdesk.component.scss']
})
export class AddfrontdeskComponent implements OnInit {

  addFrontDeskForm: FormGroup;
  // userDetailsList: any;
  allUsersList: any;
  doctorId: any;
  userTypeList: any;
  age: number;
  frontDeskDetailsList: any;
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
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.allUsersList = data.listObject;
    });
    this.addFrontDeskFormBuilder();
  }

  addFrontDeskFormBuilder() {
    this.addFrontDeskForm = this.formBuilder.group({
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

      // doctor:""
    });
    this.addFrontDeskForm.setValidators(this.customValidation());
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
      this.addFrontDeskForm.patchValue({ age: age });
      return (this.age = age);
    }
  }

  saveUserDetails() {
    if (this.addFrontDeskForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.frontdeskService
        .saveFrontDeskDetails(this.addFrontDeskForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more FrontDesk ?")) {
                  this.addFrontDeskForm.reset();
                  this.frontdeskService
                    .getFrontDeskList()
                    .subscribe((data: any) => {
                      this.frontDeskDetailsList = data.listObject;
                    });
                } else {
                  this.backToFrontDeskList();
                }
              }, 500);
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
