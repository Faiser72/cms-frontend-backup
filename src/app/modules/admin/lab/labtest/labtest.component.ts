import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { LabtestService } from 'src/app/modules/service/labtest/labtest.service';

@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.scss']
})
export class LabtestComponent implements OnInit {

  patientNumber;
  patientName;
  doctorName
  date;

  addLabTestForm: FormGroup;

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


  patientId: any;
  appointmentId: any;
  doctorId: any;
  patientDetails: any;
  age: any;
  appointmentDetails: any;
  doctorDetails: any;
  checkedLabTestDetails: any;
  labTestIdId: any;

  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService,
    private labtestService: LabtestService) { }

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      this.doctorId = params.doctor;
    });

    this.labtestService.checkSavedAndGetData(this.appointmentId).subscribe((data: any) => {
      if (data.success) {
        this.checkedLabTestDetails = data.object;
        this.labTestIdId = this.checkedLabTestDetails.prescriptionId;
        // this.getRowDetails(data);
        this.addLabTestForm.patchValue(data.object);
      } else {
        console.log("Operation failed");
      }
    });
    this.addLabTestFormBuilder();

    // for patient details
    this.patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
      this.patientDetails = data.object;
      this.addLabTestForm.patchValue({ patient: data.object })
      this.patientName = this.patientDetails.patientName;
      this.patientNumber = this.patientDetails.patientNumber;
      this.age = this.patientDetails.age;
    })

    // for appointment details
    this.appointmentService.getAppointmentDetails(this.appointmentId).subscribe((data: any) => {
      this.appointmentDetails = data.object;
      this.date = this.appointmentDetails.appointmentDate;
      this.addLabTestForm.patchValue({ appointment: data.object, date: this.appointmentDetails.appointmentDate })
    })

    // for doctor details
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
      this.doctorDetails = data.object;
      // this.addLabTestForm.patchValue({ doctor: data.object })
      this.doctorName = this.doctorDetails.doctorName;
    })
  }

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

  addLabTestFormSubmit() {
    this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
    this.addLabTestForm.patchValue({ doctor: this.doctorDetails, appointment: this.appointmentDetails, patient: this.patientDetails, date: this.date })
    this.labtestService.updateLabtestDetails(this.addLabTestForm.value).subscribe((data: any) => {
      if (data.success) {
        alert("data saved successfully");
        this.appComponent.stopSpinner();
        setTimeout(() => {
          this.gotoBack();
        }, 500);
      }
      else {
        setTimeout(() => {
          alert(data.message);
          this.appComponent.stopSpinner();
        }, 1000);
      }
    })
  }

  gotoBack() {
    this.location.back();
  }
}
