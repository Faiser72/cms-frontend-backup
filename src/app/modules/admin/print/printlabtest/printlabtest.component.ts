import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { AppComponent } from 'src/app/app.component';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { isNullOrUndefined } from 'util';
import { LabtestService } from 'src/app/modules/service/labtest/labtest.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-printlabtest',
  templateUrl: './printlabtest.component.html',
  styleUrls: ['./printlabtest.component.scss']
})
export class PrintlabtestComponent implements OnInit {

  patientNumber;
  patientName;
  doctorName
  date;

  addLabTestForm: FormGroup;

  referalNote: FormGroup;

  filteredPatientOptions: Observable<any>;


  // checkbox starts
  completeheamogram = false;
  bloodGrouprhtype = false;
  postPrandialBloodSugar = false;
  bloodUrea = false;
  bloodUreaNitrogen = false;
  serumCreatinine = false;
  uricAcid = false;
  lipidProfile = false;
  liverFunctionTest = false;
  tsh = false;
  serumCalcium = false;
  hivElisa = false;
  hbsagElisa = false;
  urineRoutine = false;
  chestXRay = false;
  Echocardiogram = false;
  treadmillTest = false;
  ultraSoundAbdomenAndPelvis = false;
  urineCompleteAnalysis = false;
  ecg = false;
  esr = false;
  asloQuantitative = false;
  raQuantitative = false;
  crpQuantitative = false;
  anaElisa = false;
  lh = false;
  prolactin = false;
  fshLHRatio = false;
  glycatedHb = false;
  electrolytes = false;

  isShown: boolean = false; // hidden by default
  patientDetailsList: any;
  patientDetails: any;
  patientId: any;
  prescriptionDetailsList: any;
  LabTestDetailsList: any;

  constructor(private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private referalService: ReferalService,
    private prescriptionService: PrescriptionService,
    private labtestService: LabtestService) { }

  ngOnInit() {

    this.referalNoteBuilder();
    this.addLabTestFormBuilder();

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

  addLabTestFormBuilder() {
    this.addLabTestForm = this.fb.group({
      completeheamogram: '',
      bloodGrouprhtype: '',
      postPrandialBloodSugar: '',
      bloodUrea: '',
      bloodUreaNitrogen: '',
      serumCreatinine: '',
      uricAcid: '',
      lipidProfile: '',
      liverFunctionTest: '',
      tsh: '',
      serumCalcium: '',
      hivElisa: '',
      hbsagElisa: '',
      urineRoutine: '',
      chestXRay: '',
      Echocardiogram: '',
      treadmillTest: '',
      ultraSoundAbdomenAndPelvis: '',
      urineCompleteAnalysis: '',
      ecg: '',
      esr: '',
      asloQuantitative: '',
      raQuantitative: '',
      crpQuantitative: '',
      anaElisa: '',
      lh: '',
      prolactin: '',
      fshLHRatio: '',
      glycatedHb: '',
      electrolytes: '',
      problemSuspected: '',
      patient: '',
      appointment: '',
      doctor: '',
      date: '',
      labTestId: ''
    })
  }

  patientDetailsById(patient) {
    if (!isNullOrUndefined(patient)) {
      this.patientService.getPatientDetails(patient.value.patientId).subscribe((data: any) => {
        this.patientDetails = data.object;
        this.patientId = this.patientDetails.patientId;
        this.referalNote.patchValue({ patientName: this.patientDetails.patientName })
      })
    }
  }

  getLabTest() {
    if (this.referalNote.valid) {
      this.appComponent.startSpinner("getting data..\xa0\xa0Please wait ...");
      this.labtestService
        .getLabTestDetailsByPatientIdAndDate(this.patientId, this.referalNote.value.appointmentDate)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              this.LabTestDetailsList = resp.object;
              console.log(resp.object.problemSuspected);

              this.addLabTestForm.patchValue(resp.object);
              this.addLabTestForm.patchValue({ problemSuspected: resp.object.problemSuspected })
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

  printLabTest(cmpName) {
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
