import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editpatients',
  templateUrl: './editpatients.component.html',
  styleUrls: ['./editpatients.component.scss']
})
export class EditpatientsComponent implements OnInit {

  editPatientDetailsForm: FormGroup;
  // phonePattern = "^[0-9_-]{10}$";
  phonePattern = "^[1-9]{1}[0-9]{9}$";
  patientDetailsList: any;
  patientId: any;
  patientList: any;
  age: number;
  minDate: any;
  maxDate: any;
  // id: any;


  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // this.route.queryParams.subscribe((data) => {
    //   this.patientId = data.patientId;
    // });

    // for date validation starts
    var minCurrentDate = new Date();
    var maxNewDate = new Date();
    this.minDate = minCurrentDate;
    this.maxDate = maxNewDate.setMonth(maxNewDate.getMonth() + 1);
    // for date validation ends
  }

  ngOnInit() {
    this.editPatientDetailsFormBuilder();

    this.patientService.getPatientList().subscribe((data: any) => {
      this.patientDetailsList = data.listObject;
    });


    this.route.queryParams.subscribe((data) => {
      this.patientId = data.patientId;
    });

    this.getPatientList();


    this.patientService
      .getPatientDetails(this.patientId)
      .subscribe((data: any) => {
        this.editPatientDetailsForm.patchValue(data.object);
      });
  }

  getPatientList() {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      this.patientService.getAllExceptThisPatientId(this.patientId).subscribe(
        (response: any) => {
          this.patientList = response.listObject;
        })
      const error = false;
      if (!error) {
        resolve();
      }
      else {
        reject("getPatientList() returns error");
      }
      // }, 2000)
    });
  }

  //Form Validation
  editPatientDetailsFormBuilder() {
    this.editPatientDetailsForm = this.fb.group({
      patientName: [null, [Validators.required, Validators.minLength(3)]],
      patientNumber: [null, [Validators.required, Validators.pattern("^[1-9]+$")]],
      dob: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      whatsAppNumber: [null, [Validators.pattern(this.phonePattern)]],
      emailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      patientId: "",
      age: "",
      gender: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      reasonForVisit: [null, [Validators.required, Validators.minLength(3)]],
      registeredDate: [null, [Validators.required]],
      // doctorAassigned: "",
      emergencyContactName: [null, [Validators.required, Validators.minLength(3)]],
      emergencyContactNumber: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      emergencyContactRelation: [null, [Validators.required, Validators.minLength(3)]],
    });
    this.editPatientDetailsForm.setValidators(this.customValidation());
  }


  ageFromDateOfBirth(dateOfBirth) {
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
      this.editPatientDetailsForm.patchValue({ age: age });
      return (this.age = age);
    }
  }

  // custom validation starts
  patientNumberInputMsg: string;
  patientNumber: string;

  phoneNumberInputMsg: string;
  phoneNumber: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      //patientNumber
      const patientNumberFormGroup = formGroup.controls["patientNumber"];
      if (patientNumberFormGroup.value !== "" && patientNumberFormGroup.value !== null) {
        if (patientNumberFormGroup.valid) {
          if (!isNullOrUndefined(this.patientList)) {
            this.patientList.forEach((data: any) => {
              if (data.patientNumber == patientNumberFormGroup.value) {
                this.patientNumber = data.patientNumber;
                this.patientNumberInputMsg = "This patient Number is registered already";
                patientNumberFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.patientNumber == patientNumberFormGroup.value) {
            this.patientNumberInputMsg = "This patient Number is registered already";
          }
        }
      } else {
        this.patientNumberInputMsg = "Please enter this field and it should not start with 0.";
      }

      const phoneNumberFormGroup = formGroup.controls["phoneNumber"];
      if (phoneNumberFormGroup.value !== "" && phoneNumberFormGroup.value !== null) {
        if (phoneNumberFormGroup.valid) {
          if (!isNullOrUndefined(this.patientList)) {
            this.patientList.forEach((data: any) => {
              if (data.phoneNumber == phoneNumberFormGroup.value) {
                this.phoneNumber = data.phoneNumber;
                this.phoneNumberInputMsg = "This Phone Number is registered already";
                phoneNumberFormGroup.setErrors({});
              }
            });
          }
        } else {
          if (this.phoneNumber == phoneNumberFormGroup.value) {
            this.phoneNumberInputMsg = "This Phone Number is registered already";
          }
        }
      } else {
        this.phoneNumberInputMsg = "Please enter this field.";
      }
      return;
    };
  }
  // custom validation ends

  // updatePatientDetailsFormSubmit() {
  //   if (this.editPatientDetailsForm.valid) {
  //     this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
  //     this.patientService
  //       .updatePatientDetails(this.editPatientDetailsForm.value)
  //       .subscribe(
  //         (resp: any) => {
  //           if (resp.success) {
  //             setTimeout(() => {
  //               alert(resp.message);
  //               // this._snackBar.open(
  //               //   this.editPatientDetailsForm.get("patientName").value,
  //               //   resp.message,
  //               //   { duration: 3500 }
  //               // );

  //               this.appComponent.stopSpinner();
  //               this.gotoBack();
  //             }, 1000);
  //           } else {
  //             setTimeout(() => {
  //               alert(resp.message);
  //               this.appComponent.stopSpinner();
  //             }, 1000);
  //           }
  //         },
  //         (error) => {
  //           setTimeout(() => {
  //             alert("Error! - Something Went Wrong! Try again.");
  //             this.appComponent.stopSpinner();
  //           }, 1000);
  //         }
  //       );
  //   } else {
  //     alert("Please, fill the proper details.");
  //   }
  // }

  updatePatientDetailsFormSubmit() {
    if (this.editPatientDetailsForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.patientService.updatePatientDetails(this.editPatientDetailsForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          this.gotoBack();
          // this._snackBar.open(data.object.candidateName, data.message, { duration: 2500 });
        } else {
          this.appComponent.stopSpinner();
          alert(data.message)
          //this._snackBar.open(data.object.candidateName, data.message, { duration: 2500 });
        }
      });
    } else {
      this.appComponent.stopSpinner();
      alert("Please, fill the proper details.");
      // this._snackBar.open("Error", "Invalid data", { duration: 2500 });
    }
  }

  gotoBack() {
    this.location.back();
  }
}
