import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { FormGroup, Validators, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-printreferalnote',
  templateUrl: './printreferalnote.component.html',
  styleUrls: ['./printreferalnote.component.scss']
})
export class PrintreferalnoteComponent implements OnInit {

  today: any;
  patientName: String;
  age: any;
  date: any;
  doctorName: any;
  remarks: any;

  referalNote: FormGroup;
  patientNumber;
  // patientName;
  // doctorName
  // date;

  isShown: boolean = false;
  patientDetailsList: any;
  patientDetails: any;
  patientId: any;
  referenceDetails: any;

  filteredPatientOptions: Observable<any>;


  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private referalService: ReferalService) { }

  ngOnInit() {
    this.referalNoteBuilder();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;

    // for patient details
    this.patientService.getPatientList().subscribe((data: any) => {
      this.patientDetailsList = data['listObject'];
      this.filteredPatientOptions = this.referalNote.get('patientNumber').valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.patientNumber),
        map(patientNumber => patientNumber ? this._filter(patientNumber) : this.patientDetailsList.slice()));
    })
  }

  referalNoteBuilder() {
    this.referalNote = this.fb.group({
      patientNumber: [null, [Validators.required]],
      patientName: [null, [Validators.required]],
      appointmentDate: [null, [Validators.required]],
    });
    this.referalNote.setValidators(this.customValidation());
  }

  // patientNumber autocomplete starts here
  displayFn(patientNumber: any): string {
    return patientNumber && patientNumber.patientNumber ? patientNumber.patientNumber : '';
  }

  private _filter(patientNumber: string): any {
    const filterValue = patientNumber.toLowerCase();
    return this.patientDetailsList.filter(patient => patient.patientNumber.toLowerCase().indexOf(filterValue) === 0);
  }
  // patientNumber autocomplete ends here

  patientDetailsById(patient) {
    if (!isNullOrUndefined(patient)) {
      this.patientService.getPatientDetails(patient.value.patientId).subscribe((data: any) => {
        this.patientDetails = data.object;
        this.patientId = this.patientDetails.patientId;
        this.referalNote.patchValue({ patientName: this.patientDetails.patientName })
      })
    }
  }

  getReferalNote() {
    if (this.referalNote.valid) {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      this.referalService
        .getReferenceDetailsByPatientIdAndDate(this.patientId, this.referalNote.value.appointmentDate)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              this.referenceDetails = resp.object;
              this.patientName = this.referenceDetails.patientId.patientName;
              this.age = this.referenceDetails.patientId.age;
              this.doctorName = this.referenceDetails.doctorId.doctorName;
              this.remarks = this.referenceDetails.remarks;
              this.date = this.referenceDetails.date;
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                this.toggleShow();
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

  toggleShow() {

    this.isShown = !this.isShown;

  }

  printReferal(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    location.reload();
  }

  backToPrintHome() {
    this.router.navigate(['home/printhome'])
  }

  // custom validation starts
  patientNumberInputMsg: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      // for patientNumber Autocomplete starts here
      const patientNumberFormGroup = formGroup.controls["patientNumber"];
      if (patientNumberFormGroup.value !== "" && patientNumberFormGroup.value !== null) {
        if (typeof (patientNumberFormGroup.value) !== 'object') {
          console.log(typeof (patientNumberFormGroup.value));

          this.patientNumberInputMsg = "Please select from the List";
          patientNumberFormGroup.setErrors({});
        }
      } else {
        this.patientNumberInputMsg = "Please enter this field.";
        patientNumberFormGroup.setErrors({});
      }
      // for patientNumber Autocomplete ends here

      return;
    };
  }
  // custom validation ends

}
