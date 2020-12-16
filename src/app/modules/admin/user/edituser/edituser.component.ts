import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/modules/service/users/users.service';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  editUserForm: FormGroup;
  userDetailsList: any;
  userId: number;
  allUsersList: any;
  userTypeList: any;

  roleDoctor: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private appComponent: AppComponent
  ) {
    //UserTypeRole - Master
    this.usersService.getAllUserType().subscribe(
      (data: any) => {
        this.userTypeList = data.listObject;
      },
      (error) => {
        console.log(error, "Error Caught");
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      this.userId = data.userId;
    });

    this.usersService.getAllUserDetailsExceptOneUser(this.userId).subscribe((data: any) => {
      this.userDetailsList = data.listObject;
    });

    // this.usersService.getAllUsersExceptOneUser(this.userId).subscribe((data: any) => {
    //   this.allUsersList = data.listObject;
    // });

    this.editUserFormBuilder();

    this.usersService.getUserDetails(this.userId).subscribe((data: any) => {
      if (data.success) {
        // this.editUserForm.patchValue(data.object);
        let userType = this.userTypeList.find(
          (jdata: any) => JSON.stringify(jdata) === JSON.stringify(data.object.userType)
        );
        this.editUserForm.patchValue(data.object);
        this.editUserForm.patchValue({ userType: userType })
        if (userType.role == "ROLE_USER") {
          this.roleDoctor = true;
        }
        else {
          this.roleDoctor = false;
        }

      } else {
        alert(data.message);
        setTimeout(() => {
          this.gotoBack();
        }, 750); // 0.75second
      }
    }, (error) => {
      alert("Error! - Something Went Wrong! Try again.");
      setTimeout(() => {
        this.gotoBack();
      }, 750); // 0.75second
    });

  }

  editUserFormBuilder() {
    this.editUserForm = this.formBuilder.group({
      userId: [0],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("^[a-zA-Z \s]+$"),
        ],
      ],
      displayName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("^[0-9a-zA-Z \s]+$"),
        ],
      ],
      emailId: [
        null,
        [
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$"),
          ]),
        ],
      ],
      mobileNo: [
        null,
        [Validators.required, Validators.pattern("^[0-9]{10}$")],
      ],
      userType: [null, [Validators.required]],
    });
    this.editUserForm.setValidators(this.customValidation());
  }

  usernameInputMsg: string;
  username: string;
  displayNameInputMsg: string;
  emailIdInputMsg: string;
  emailId: string;
  mobileNoInputMsg: string;
  mobileNo: string;
  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      //username
      const usernameFormGroup = formGroup.controls["username"];
      if (usernameFormGroup.value !== "" && usernameFormGroup.value !== null) {
        if (usernameFormGroup.valid) {
          if (!isNullOrUndefined(this.allUsersList)) {
            this.allUsersList.forEach((data: any) => {
              if (data.username.toLowerCase() == usernameFormGroup.value.toLowerCase()) {
                this.username = data.username.toLowerCase();
                this.usernameInputMsg = "This username already exist.";
                usernameFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.username == usernameFormGroup.value.toLowerCase()) {
            this.usernameInputMsg = "This username already exist.";
          } else {
            this.usernameInputMsg = "Please enter only alphabets, min:3 characters.";
          }
        }
      } else {
        this.usernameInputMsg = "Please enter this field.";
      }
      //dispalyName
      const displayNameFormGroup = formGroup.controls["displayName"];
      if (displayNameFormGroup.value !== "" && displayNameFormGroup.value !== null) {
        if (displayNameFormGroup.invalid) {
          this.displayNameInputMsg =
            "Please enter only alphanumerics, min:3 characters.";
        }
      } else {
        this.displayNameInputMsg = "Please enter this field.";
      }
      //emailId
      const emailIdFormGroup = formGroup.controls["emailId"];
      if (emailIdFormGroup.value !== "" && emailIdFormGroup.value !== null) {
        if (emailIdFormGroup.valid) {
          if (!isNullOrUndefined(this.userDetailsList)) {
            this.userDetailsList.forEach((data: any) => {
              if (data.emailId == emailIdFormGroup.value.toLowerCase()) {
                this.emailId = data.emailId;
                this.emailIdInputMsg = "This emailId already exist.";
                emailIdFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.emailId == emailIdFormGroup.value.toLowerCase()) {
            this.emailIdInputMsg = "This emailId already exist.";
          } else {
            this.emailIdInputMsg = "Please enter valid emailId.";
          }
        }
      } else {
        this.emailIdInputMsg = "Please enter this field.";
      }
      //mobileNo.
      const mobileNoFormGroup = formGroup.controls["mobileNo"];
      if (mobileNoFormGroup.value !== "" && mobileNoFormGroup.value !== null) {
        if (mobileNoFormGroup.valid) {
          if (!isNullOrUndefined(this.userDetailsList)) {
            this.userDetailsList.forEach((data: any) => {
              if (data.mobileNo == mobileNoFormGroup.value) {
                this.mobileNo = data.mobileNo;
                this.mobileNoInputMsg = "This mobile no. already exist.";
                mobileNoFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.mobileNo == mobileNoFormGroup.value) {
            this.mobileNoInputMsg = "This mobile no. already exist.";
          } else {
            this.mobileNoInputMsg = "Please enter 10 digit valid mobile No.";
          }
        }
      } else {
        this.mobileNoInputMsg = "Please enter this field.";
      }
      return;
    };
  }

  updateUserDetails() {
    if (this.editUserForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.usersService.updateUserDetails(this.editUserForm.value).subscribe((resp: any) => {
        if (resp.success) {
          setTimeout(() => {
            alert(resp.message);
            this.appComponent.stopSpinner();
            this.gotoBack();
          }, 1000);
        } else {
          setTimeout(() => {
            alert(resp.message);
            this.appComponent.stopSpinner();
          }, 1000);
        }
      }, (error) => {
        setTimeout(() => {
          alert("Error! - Something Went Wrong! Try again.");
          this.appComponent.stopSpinner();
        }, 1000);
      });
    } else {
      alert("Please, fill the proper details.");
    }
  }

  gotoBack = () => {
    this.location.back();
  };

}
