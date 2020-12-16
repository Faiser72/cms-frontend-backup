import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { isNullOrUndefined } from 'util';
import { Prescription } from '../../prescription/prescriptionmodel';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'app-printprescription',
  templateUrl: './printprescription.component.html',
  styleUrls: ['./printprescription.component.scss']
})
export class PrintprescriptionComponent implements OnInit {

  patientNumber;
  patientName;
  doctorName;
  date;
  age;
  investigation;
  diagnosis;
  followUpDate;

  prescriptionForm: FormGroup;

  isShown: boolean = false; // hidden by default
  patientDetailsList: any;
  patientDetails: any;
  patientId: any;
  prescriptionDetailsList: any;

  filteredPatientOptions: Observable<any>;


  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private referalService: ReferalService,
    private prescriptionService: PrescriptionService,
    private patientDiagnosisService: PatientdiagnosisService) { }

  ngOnInit() {

    this.prescriptionFormBuilder();

    // for patient details
    this.patientService.getPatientList().subscribe((data: any) => {
      this.patientDetailsList = data['listObject'];
      this.filteredPatientOptions = this.prescriptionForm.get('patientNumber').valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.patientNumber),
        map(patientNumber => patientNumber ? this._filter(patientNumber) : this.patientDetailsList.slice()));
    })
  }

  prescriptionFormBuilder() {
    this.prescriptionForm = this.fb.group({
      patientNumber: [null, [Validators.required]],
      patientName: [null, [Validators.required]],
      appointmentDate: [null, [Validators.required]],
    });
    this.prescriptionForm.setValidators(this.customValidation());
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
        this.prescriptionForm.patchValue({ patientName: this.patientDetails.patientName })
      })
    }
  }

  getPrescription() {
    if (this.prescriptionForm.valid) {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      this.prescriptionService
        .getPrescriptionDetailsByPatientIdAndDate(this.patientId, this.prescriptionForm.value.appointmentDate)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              this.prescriptionDetailsList = resp.object;
              console.log(this.prescriptionDetailsList.appointment.appointmentId);
              this.patientDiagnosisService.getPatientDiagnosisDetailsByAppointmentId(this.prescriptionDetailsList.appointment.appointmentId).subscribe((data: any) => {
                console.log(data);
                this.investigation = data.object.investigation;
                this.diagnosis = data.object.diagnosis;
                this.followUpDate = data.object.followUpdate
                console.log(data.object.investigation);

              })
              this.patientName = this.prescriptionDetailsList.patient.patientName;
              this.doctorName = this.prescriptionDetailsList.doctorName.doctorName;
              this.age = this.prescriptionDetailsList.patient.age;
              this.date = this.prescriptionDetailsList.appointment.appointmentDate;
              this.getRowDetails(this.prescriptionDetailsList);
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

  prescriptionDetails: Array<Prescription> = [];
  prescription: any = {};
  getRowDetails(data: any) {
    this.prescriptionDetails = [];
    let drugName: any = [];
    let strength: any = [];
    let morningDosage: any = [];
    let afternoonDosage: any = [];
    let nightDosage: any = [];
    let duration: any = [];
    let remarks: any = [];
    if (!isNullOrUndefined(data.drugName)) {
      drugName = data.drugName.split(',');
      strength = data.strength.split(',');
      morningDosage = data.morningDosage.split(',');
      afternoonDosage = data.afternoonDosage.split(',');
      nightDosage = data.nightDosage.split(',');
      duration = data.duration.split(',');
      remarks = data.remarks.split(',');
      if (drugName.length == duration.length) {
        for (let i = 0; i < drugName.length; i++) {
          this.prescription = { drugName: drugName[i], strength: strength[i], morningDosage: morningDosage[i], afternoonDosage: afternoonDosage[i], nightDosage: nightDosage[i], remarks: remarks[i], duration: duration[i] };
          this.prescriptionDetails.push(this.prescription);
        }
      }
    }
  }


  toggleShow() {
    this.isShown = !this.isShown;
  }

  printPrescription(cmpName) {
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
