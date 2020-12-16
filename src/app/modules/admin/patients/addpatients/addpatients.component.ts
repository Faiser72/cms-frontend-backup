import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-addpatients',
  templateUrl: './addpatients.component.html',
  styleUrls: ['./addpatients.component.scss']
})
export class AddpatientsComponent implements OnInit {

  patientDetailsList: any;

  addPatientDetailsForm: FormGroup;
  // phonePattern = "^[0-9_-]{10}$";
  phonePattern = "^[1-9]{1}[0-9]{9}$";
  age: number;
  minDate: any;
  maxDate: any;

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    // for date validation starts
    var minCurrentDate = new Date();
    var maxNewDate = new Date();
    this.minDate = minCurrentDate;
    this.maxDate = maxNewDate.setMonth(maxNewDate.getMonth() + 1);
    // for date validation ends
  }

  ngOnInit() {
    this.addPatientDetailsFormBuilder();

    this.patientService.getPatientList().subscribe((data: any) => {
      this.patientDetailsList = data.listObject;
    });
  }

  //Form Validation
  addPatientDetailsFormBuilder() {
    this.addPatientDetailsForm = this.fb.group({
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
    this.addPatientDetailsForm.setValidators(this.customValidation());
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
      this.addPatientDetailsForm.patchValue({ age: age });
      return (this.age = age);
    }
  }

  addPatientDetailsFormSubmit() {
    if (this.addPatientDetailsForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.patientService
        .savePatientDetails(this.addPatientDetailsForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more patient ?")) {
                  this.addPatientDetailsForm.reset();
                  this.patientService
                    .getPatientList()
                    .subscribe((data: any) => {
                      this.patientDetailsList = data.listObject;
                    });
                } else {
                  this.backToCompanyList();
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

  backToCompanyList() {
    this.router.navigate(["/home/patientshome/listpatient"]);
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
          if (!isNullOrUndefined(this.patientDetailsList)) {
            this.patientDetailsList.forEach((data: any) => {
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
        this.patientNumberInputMsg = "Please enter this field and it should not start with 0";
      }

      const phoneNumberFormGroup = formGroup.controls["phoneNumber"];
      if (phoneNumberFormGroup.value !== "" && phoneNumberFormGroup.value !== null) {
        if (phoneNumberFormGroup.valid) {
          if (!isNullOrUndefined(this.patientDetailsList)) {
            this.patientDetailsList.forEach((data: any) => {
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
}
