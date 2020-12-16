import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { DoctorrolemasterserviceService } from 'src/app/modules/service/doctorrolemaster/doctorrolemasterservice.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService } from 'src/app/modules/service/users/users.service';
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-adddoctors",
  templateUrl: "./adddoctors.component.html",
  styleUrls: ["./adddoctors.component.scss"],
})

export class AdddoctorsComponent implements OnInit {

  addDoctorDetailsForm: FormGroup;
  // phonePattern = "^[0-9_-]{10}$";
  phonePattern = "^[1-9]{1}[0-9]{9}$";
  minDate: any;
  maxDate: any;
  flatOrSharingValue: string;

  age: number;

  // fileUploads
  uploadFiles = new FormData();
  photoFile: FileList;
  resumeFile: FileList;
  resumecvFile: string | Blob;
  ppFile: string | Blob;
  placeholder_path: string;
  resumeFileName: string;
  doctorPhotoName: string;
  photoMessage: string;
  resumeMessage: string;
  doctorRoleList: any;

  doctorId: any;
  // agreement files
  agreementFile: FileList;
  agreementFileName: string;
  agreementcvFile: string | Blob;
  agreementMessage: string;

  roles = [
    { value: 'consultant-0', viewValue: 'Consultant' },
    { value: 'dutyDoctor-1', viewValue: 'Duty Doctor' },
    { value: 'surgen-2', viewValue: 'Surgen' }
  ];

  userDetailsList: any;
  filteredOptions: Observable<any>;

  constructor(private fb: FormBuilder,
    private doctorRoleMasterService: DoctorrolemasterserviceService,
    private doctorService: DoctorserviceService,
    private appComponent: AppComponent,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UsersService
  ) {
    this.placeholder_path = "../../../../assets/Placeholder.jpg";
    this.agreementFileName = "No File Chosen";

    //DoctorRole - Master
    this.doctorRoleMasterService.getDoctorRoleMasterList().subscribe(
      (data: any) => {
        this.doctorRoleList = data.listObject;
        this.filteredOptions = this.addDoctorDetailsForm.get('doctorRole').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.doctorRoleName),
          map(doctorRoleName => doctorRoleName ? this._filter(doctorRoleName) : this.doctorRoleList.slice()));
      },
      (error) => {
        console.log(error, "Error Caught");
      }
    );

    // for date validation starts
    var minCurrentDate = new Date();
    var maxNewDate = new Date();
    this.minDate = minCurrentDate;
    this.maxDate = maxNewDate.setMonth(maxNewDate.getMonth() + 1);
    // for date validation ends

  }

  ngOnInit() {
    this.addDoctorDetailsFormBuilder();
    this.userService.getAllUsers().subscribe((data: any) => {
      this.userDetailsList = data.listObject;
    })

  }

  addDoctorDetailsFormBuilder() {
    this.addDoctorDetailsForm = this.fb.group({
      doctorName: [null, [Validators.required, Validators.minLength(3)]],
      qualification: [null, [Validators.required]],
      specialization: [null, [Validators.required]],
      avatar: [null],
      dob: [
        null,
        [
          Validators.required
        ],
      ],
      age: [
        null,
        [
          ,
          Validators.required
          // AgeValidator,
        ],
      ],
      emailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$"),
        ]),
      ],
      gender: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      joiningDate: [null, [Validators.required]],
      leavingDate: "",
      registerNo: [null, [Validators.required]],
      morningVisitFrom: [null, [Validators.required]],
      morningVisitTo: [null, [Validators.required]],
      eveningVisitFrom: [null, [Validators.required]],
      eveningVisitTo: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      doctorRole: [null, [Validators.required]],
      panNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$"),
        ]),
      ],
      aadharNo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{12}$"),
        ]),
      ],
      initialRegCost: [
        null,
        Validators.compose([Validators.pattern("^[0-9.]+$"),
        ]),
      ],
      amtToClinic: [
        null,
        Validators.compose([Validators.pattern("^[0-9.]+$"),
        ]),
      ],
      clinicCost: [
        null,
        Validators.compose([Validators.pattern("^[0-9.]+$"),
        ]),
      ],
      doctorCost: [
        null,
        Validators.compose([Validators.pattern("^[0-9.]+$"),
        ]),
      ],
      flatOrShareLabel: '',
      agreement: '',
    });
    this.addDoctorDetailsForm.setValidators(this.customValidation());
  }



  displayFn(role: any): string {
    return role && role.doctorRoleName ? role.doctorRoleName : '';
  }

  private _filter(roleName: string): any {
    const filterValue = roleName.toLowerCase();
    return this.doctorRoleList.filter(role => role.doctorRoleName.toLowerCase().indexOf(filterValue) === 0);
  }

  getPhotoFile(photoUpload: HTMLInputElement, event: any) {
    const fileName = event.target.files[0].name;
    this.photoFile = photoUpload.files;

    if (this.photoFile.length === 0) return;

    let mimeType = this.photoFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.placeholder_path = "../../../../assets/Placeholder.jpg";
      this.photoMessage = "Only image files are supported.";
      this.doctorPhotoName = "No File Chosen";
      return;
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(this.photoFile[0]);
      reader.onload = (_event) => {
        this.placeholder_path = reader.result as string;
        this.doctorPhotoName = fileName;
      };
      this.photoMessage = null;
      this.ppFile = event.target.files[0];
    }
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
      this.addDoctorDetailsForm.patchValue({ age: age });
      return (this.age = age);
    }
  }


  addDoctorDetailsFormSubmit() {
    if (this.addDoctorDetailsForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.doctorService.saveDoctorDetails(this.addDoctorDetailsForm.value).subscribe((data: any) => {
        if (data.success) {
          this.doctorId = data.object.doctorId;
          this.saveAgreementFile();
          if (!isNullOrUndefined(this.ppFile)) {
            const profileFormData = new FormData();
            profileFormData.append('profilePicture', this.ppFile);
            console.log(this.doctorId);

            profileFormData.append("doctorId", data.object.doctorId);
            this.doctorService.saveOrUpdateProfilePhoto(profileFormData).subscribe((resp: any) => {
              if (resp.success) {
                this.placeholder_path = "../../../../assets/Placeholder.jpg";
                this.doctorPhotoName = "No File Chosen";
                alert("Data saved ! file uploaded.")
                //alert('please add the login credintials to this user')
                // if (confirm("Do you want to add login details for this doctor.?")) {
                this.addDoctorDetailsForm.reset();
                // let navigationExtras: NavigationExtras = {
                //   queryParams: {
                //     doctorId: data.object.doctorId,
                //   }
                // };
                // this.router.navigate(["/home/usershome/addUser"], navigationExtras);
                // } else {
                // setTimeout(() => {
                //   this.gotoBack();
                // }, 500);
                // }
                this.appComponent.stopSpinner();
              } else {
                alert("Data saved ! But fails to upload file")
                this.appComponent.stopSpinner();
                // alert('please add the login credintials to this user')
                // this.addDoctorDetailsForm.reset();
                // let navigationExtras: NavigationExtras = {
                //   queryParams: {
                //     doctorId: data.object.doctorId,
                //   }
                // };
                // this.router.navigate(["/home/usershome/addUser"], navigationExtras);
              }
            });
          } else {
            alert("Data saved. Profile pic pending to be uploaded");
            this.appComponent.stopSpinner();
            // alert('please add the login credintials to this user')
            this.addDoctorDetailsForm.reset();
            // let navigationExtras: NavigationExtras = {
            //   queryParams: {
            //     doctorId: data.object.doctorId,
            //   }
            // };
            // this.router.navigate(["/home/usershome/addUser"], navigationExtras);
          }
        } else {
          alert("Data unsaved");
        }
      });
    } else {
      this.appComponent.stopSpinner();
      alert("Please, fill the proper details.");
    }
  }

  gotoBack() {
  }

  emailIdInputMsg: string; emailId: string;

  phoneNumberInputMsg: string; phoneNumber: string;

  doctorRoleInputMsg: string; doctorRole: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      //Email-Id
      const emailIdFormGroup = formGroup.controls["emailId"];
      if (emailIdFormGroup.value !== "" && emailIdFormGroup.value !== null) {
        if (emailIdFormGroup.valid) {
          if (!isNullOrUndefined(this.userDetailsList)) {
            this.userDetailsList.forEach((data: any) => {
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

      // for Role Autocomplete starts here
      const doctorRoleFormGroup = formGroup.controls["doctorRole"];
      if (doctorRoleFormGroup.value !== "" && doctorRoleFormGroup.value !== null) {
        if (typeof (doctorRoleFormGroup.value) !== 'object') {
          console.log(typeof (doctorRoleFormGroup.value));

          this.doctorRoleInputMsg = "Please select from the List";
          doctorRoleFormGroup.setErrors({});
        }
      } else {
        this.doctorRoleInputMsg = "Please enter this field.";
        doctorRoleFormGroup.setErrors({});
      }
      // for Role Autocomplete ends here



      // MobileNo
      const phoneNumberFormGroup = formGroup.controls["phoneNumber"];
      if (phoneNumberFormGroup.value !== "" && phoneNumberFormGroup.value !== null) {
        if (phoneNumberFormGroup.valid) {
          if (!isNullOrUndefined(this.userDetailsList)) {
            this.userDetailsList.forEach((data: any) => {
              if (data.mobileNo == phoneNumberFormGroup.value) {
                this.phoneNumber = data.mobileNo;
                this.phoneNumberInputMsg = "This mobile number is registered already";
                phoneNumberFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.phoneNumber == phoneNumberFormGroup.value) {
            this.phoneNumberInputMsg = "This mobile number is registered already";
          } else {
            this.phoneNumberInputMsg = 'Please enter 10 digit valid mobile no.';
          }
        }
      } else {
        this.phoneNumberInputMsg = "Please enter this field.";
      }
      return;
    };
  }

  flatOrShare(value) {
    if (value.value == 'flat') {
      this.flatOrSharingValue = 'flat';
    }
    else {
      this.flatOrSharingValue = 'sharing';
    }
  }

  // for Agreement file starts
  getAgreementFile(agreementUpload: HTMLInputElement, event: any) {
    this.agreementFile = agreementUpload.files;
    if (this.agreementFile.length === 0)
      return;
    const agreementName = event.target.files[0].name;
    let mimeType = this.agreementFile[0].type;
    if (mimeType.match(/application\/pdf/) == null) {
      this.agreementMessage = "Only pdf files are supported.";
      this.agreementFileName = "No File Chosen";
      return;
    } else {
      this.agreementMessage = null;
      this.agreementFileName = agreementName;
      // var form_data = new FormData();
      this.agreementcvFile = event.target.files[0];
      // this.saveAgreementFile();
      // form_data.append("file", event.target.files[0]);
      // this.thyroidcvFile = event.target.files[0];
    }
  }

  saveAgreementFile() {
    this.appComponent.startSpinner("Uploading file..\xa0\xa0Please wait ...");
    const agreementFormData = new FormData();
    agreementFormData.append('agreementFile', this.agreementcvFile);
    agreementFormData.append('doctorId', this.doctorId);

    this.doctorService.saveOrUpdateAgreement(agreementFormData).subscribe((resp: any) => {
      if (resp.success) {
        this.appComponent.stopSpinner();
        if (resp.message == "Already Uploaded") {
          this._snackBar.open("agreement File", "Already Uploaded", {
            duration: 2500,
          });
        } else {
          this.appComponent.stopSpinner();
          this._snackBar.open("agreement File", "Uploaded Successfully", {
            duration: 2500,
          });
        }
      } else {
        this.appComponent.stopSpinner();
        this._snackBar.open("agreement File", "Fails to Upload", {
          duration: 2500,
        });
      }
    });
  }

  reset() {
    this.agreementFileName = "No File Chosen";
    this.filteredOptions = this.addDoctorDetailsForm.get('doctorRole').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.doctorRoleName),
      map(doctorRoleName => doctorRoleName ? this._filter(doctorRoleName) : this.doctorRoleList.slice()));
  }

}

