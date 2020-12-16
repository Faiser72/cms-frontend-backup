import { Component, OnInit } from '@angular/core';
import { Prescription } from '../prescriptionmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';

@Component({
  selector: 'app-addprescription',
  templateUrl: './addprescription.component.html',
  styleUrls: ['./addprescription.component.scss']
})
export class AddprescriptionComponent implements OnInit {
  patientNumber;
  patientName;
  doctorName
  date;

  // qp
  appointmentId: any; //from query params
  appointmentDetails: any;
  patientDetails: any;
  patientId: any; //from query params
  // checkedDiagnosisDetails: any;
  doctorId: any;
  age: any;
  doctorDetails: any;
  // qp

  dynamicArray: Array<Prescription> = [];
  newDynamic: any = {};
  addPrescriptionForm: FormGroup;
  allPrescriptionDetailsList: any;
  prescriptionId: any;
  checkedPrescriptionDetails: any;
  rowValidate: any;

  constructor(private route: Router,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService) {

    this.prescriptionService.getPrescriptionList().subscribe((data: any) => {
      this.allPrescriptionDetailsList = data.listObject;
    });

    this.addPrescriptionFormBuilder();
  }

  ngOnInit() {

    this.router.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      this.doctorId = params.doctor;
    });

    this.prescriptionService.checkSavedAndGetData(this.appointmentId).subscribe((data: any) => {
      if (data.success) {
        this.checkedPrescriptionDetails = data.object;
        this.prescriptionId = this.checkedPrescriptionDetails.prescriptionId;
        if (!isNullOrUndefined(this.checkedPrescriptionDetails.drugName)) {
          this.getRowDetails(data);
        }
        if (isNullOrUndefined(this.checkedPrescriptionDetails.drugName)) {
          this.addMoreRow(); //to display add row
        }
        this.addPrescriptionForm.patchValue(data.object);
      } else {
        // console.log("Operation failed");
      }
    });


    // for patient details
    this.patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
      this.patientDetails = data.object;
      // this.addDiagnosisForm.patchValue({ patient: data.object })

      this.patientName = this.patientDetails.patientName;
      this.patientNumber = this.patientDetails.patientNumber;
      this.age = this.patientDetails.age;
    })

    // for appointment details
    this.appointmentService.getAppointmentDetails(this.appointmentId).subscribe((data: any) => {
      this.appointmentDetails = data.object;
      this.date = this.appointmentDetails.appointmentDate;

      // this.addDiagnosisForm.patchValue({ appointment: data.object })
    })

    // for doctor details
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
      this.doctorDetails = data.object;
      // this.addDiagnosisForm.patchValue({ doctorName: data.object })
      this.doctorName = this.doctorDetails.doctorName;
    })



  }

  addMoreRow() {
    // for multile contact form starts
    this.newDynamic = {
      drugName: "",
      strength: "",
      morningDosage: "",
      afternoonDosage: "",
      nightDosage: "",
      duration: "",
      remarks: ""
    };
    this.dynamicArray.push(this.newDynamic);
    // for multile contact form ends
  }

  getRowDetails(data: any) {
    let drugName: any = [];
    let strength: any = [];
    let morningDosage: any = [];
    let afternoonDosage: any = [];
    let nightDosage: any = [];
    let duration: any = [];
    let remarks: any = [];
    drugName = data.object.drugName.split(',')
    strength = data.object.strength.split(',')
    morningDosage = data.object.morningDosage.split(',')
    afternoonDosage = data.object.afternoonDosage.split(',')
    nightDosage = data.object.nightDosage.split(',')
    duration = data.object.duration.split(',')
    remarks = data.object.remarks.split(',')

    if (drugName.length == strength.length && duration.length == remarks.length) {
      for (let i = 0; i < drugName.length; i++) {
        this.newDynamic = { drugName: drugName[i], strength: strength[i], morningDosage: morningDosage[i], afternoonDosage: afternoonDosage[i], nightDosage: nightDosage[i], duration: duration[i], remarks: remarks[i] };
        this.dynamicArray.push(this.newDynamic);
      }
    } else {
      alert('something went wrong');
    }
  }

  addPrescriptionFormBuilder() {
    this.addPrescriptionForm = this.fb.group({
      drugName: [null],
      strength: [null],
      morningDosage: [null],
      afternoonDosage: [null],
      nightDosage: [null],
      duration: [null],
      remarks: [null],
      doctorName: [null],
      appointment: [null],
      patient: [null],
      prescriptionId: "",
      date: "",
    });
  }



  addRow() {
    this.newDynamic = {
      drugName: "",
      strength: "",
      morningDosage: "",
      afternoonDosage: "",
      nightDosage: "",
      duration: "",
      remarks: ""
    };
    this.dynamicArray.push(this.newDynamic);
    this.validatePrescriptionDetails(-1);
    // this.toastr.success('New row added successfully', 'New Row');
    return true;
  }

  drugNameRow(drugNameValue: string, i: number) {
    if (drugNameValue != "" && drugNameValue.replace(/\s+/g, '').length) {
      if (drugNameValue.match(/^[ A-Za-z0-9_/-]*$/)) {
        document.getElementById("drugNameMsg" + i).innerHTML = "";
        return true;
      } else {
        document.getElementById("drugNameMsg" + i).innerHTML = "Please enter only alphanumeric and -,_,/,.";
        return false;
      }
    } else {
      if (!isNullOrUndefined(document.getElementById("drugNameMsg" + i))) {
        document.getElementById("drugNameMsg" + i).innerHTML = "Please enter this field.";
        this.dynamicArray[i].drugName = '';
      }
      return false;
    }
  }
  morningDosageRow(morningDosageValue: string, i: number) {
    return true;
  }
  // morningDosageRow(morningDosageValue: string, i: number) {
  //   if (!isNullOrUndefined(document.getElementById("morningDosageMsg" + i))) {
  //     document.getElementById("morningDosageMsg" + i).innerHTML = "Please enter this field.";
  //     this.dynamicArray[i].morningDosage = '';
  //   }
  //   else{
  //     return true;
  //   }
  //   return false;

  // }

  afternoonDosageRow(afternoonDosageValue: string, i: number) {
    return true;
  }
  // afternoonDosageRow(afternoonDosageValue: string, i: number) {
  //   if (!isNullOrUndefined(document.getElementById("afternoonDosageMsg" + i))) {
  //     document.getElementById("afternoonDosageMsg" + i).innerHTML = "Please enter this field.";
  //     this.dynamicArray[i].afternoonDosage = '';
  //   }
  //   else{
  //     return true;
  //   }
  //   return false;
  // }

  nightDosageRow(nightDosageValue: string, i: number) {
    return true;
  }
  // nightDosageRow(nightDosageValue: string, i: number) {
  //   // if (!isNullOrUndefined(document.getElementById("nightDosageMsg" + i))) {
  //   //   document.getElementById("nightDosageMsg" + i).innerHTML = "Please enter this field.";
  //   //   this.dynamicArray[i].nightDosage = '';
  //   // }
  //   // else{
  //   //   return true;
  //   // }
  //   // return false;
  //   let nd:any=document.getElementById("nightDosageMsg" + i)
  //   if(!nd.checked){
  //     document.getElementById("nightDosageMsg" + i).innerHTML = "Please select this field.";
  //     return false;
  //   }
  //   else{
  //     return true
  //   }

  // }

  durationRow(durationValue: string, i: number) {
    if (durationValue != "" && durationValue.replace(/\s+/g, '').length) {
      if (durationValue.match(/^[ A-Za-z0-9_/-]*$/)) {
        document.getElementById("durationMsg" + i).innerHTML = "";
        return true;
      } else {
        document.getElementById("durationMsg" + i).innerHTML = "Please enter only alphanumeric and -,_,/.";
        return false;
      }
    } else {
      if (!isNullOrUndefined(document.getElementById("durationMsg" + i))) {
        document.getElementById("durationMsg" + i).innerHTML = "Please enter this field.";
        this.dynamicArray[i].duration = '';
      }
      return false;
    }
  }

  strengthRow(strengthValue: string, i: number) {
    if (strengthValue != "" && strengthValue.replace(/\s+/g, '').length) {
      if (strengthValue.match(/^[ A-Za-z0-9_/-]*$/)) {
        document.getElementById("strengthMsg" + i).innerHTML = "";
        return true;
      } else {
        document.getElementById("strengthMsg" + i).innerHTML = "Please enter only alphanumeric and -,_,/.";
        return false;
      }
    } else {
      if (!isNullOrUndefined(document.getElementById("strengthMsg" + i))) {
        document.getElementById("strengthMsg" + i).innerHTML = "Please enter this field.";
        this.dynamicArray[i].strength = '';
      }
      return false;
    }
  }

  remarksRow(remarksValue: string, i: number) {
    if (remarksValue != "" && remarksValue.replace(/\s+/g, '').length) {
      if (remarksValue.match(/^[ A-Za-z0-9_/-]*$/)) {
        document.getElementById("remarksMsg" + i).innerHTML = "";
        return true;
      } else {
        document.getElementById("remarksMsg" + i).innerHTML = "Please enter only alphanumeric and -,_,/,.";
        return false;
      }
    } else {
      if (!isNullOrUndefined(document.getElementById("durationMsg" + i))) {
        document.getElementById("remarksMsg" + i).innerHTML = "Please enter this field.";
        this.dynamicArray[i].remarks = '';
      }
      return false;
    }
  }

  prescriptionDetailsFlag: boolean = false;
  validatePrescriptionDetails(i: number): boolean {
    this.prescriptionDetailsFlag = false;

    if (i > -1) {
      this.drugNameRow(this.dynamicArray[i].drugName, i);
      this.strengthRow(this.dynamicArray[i].strength, i);
      this.morningDosageRow(this.dynamicArray[i].morningDosage, i);
      this.afternoonDosageRow(this.dynamicArray[i].afternoonDosage, i);
      this.nightDosageRow(this.dynamicArray[i].nightDosage, i);
      this.durationRow(this.dynamicArray[i].duration, i);
      this.remarksRow(this.dynamicArray[i].remarks, i)
    }

    this.dynamicArray.every((object, index) => {
      let drugNameRowFlag = this.drugNameRow(object.drugName, index);
      let strengthRowFlag = this.strengthRow(object.strength, index);
      let morningDosageRowFlag = this.morningDosageRow(object.morningDosage, index);
      let afternoonDosageRowFlag = this.afternoonDosageRow(object.afternoonDosage, index);
      let nightDosageRowFlag = this.nightDosageRow(object.nightDosage, index);
      let durationRowFlag = this.durationRow(object.duration, index);
      let remarksRowFlag = this.remarksRow(object.remarks, index);

      if (drugNameRowFlag && strengthRowFlag && durationRowFlag && morningDosageRowFlag) {
        this.prescriptionDetailsFlag = true;
        return true;
      } else {
        this.prescriptionDetailsFlag = false;
        return false;
      }
    });
    // console.log(this.contactPersonsDetailsFlag);
    return this.prescriptionDetailsFlag;
  }

  prescriptionDetails(): boolean {
    let drugName: any = [];
    let strength: any = [];
    let morningDosage: any = [];
    let afternoonDosage: any = [];
    let nightDosage: any = [];
    let duration: any = [];
    let remarks: any = [];
    this.dynamicArray.forEach((object, i) => {
      drugName[i] = object.drugName.trim().replace(/\s+/g, ' ');
      strength[i] = object.strength;
      morningDosage[i] = object.morningDosage;
      afternoonDosage[i] = object.afternoonDosage;
      nightDosage[i] = object.nightDosage;
      duration[i] = object.duration;
      remarks[i] = object.remarks;
    });

    this.addPrescriptionForm.patchValue({
      drugName: drugName.join(),
      strength: strength.join(),
      morningDosage: morningDosage.join(),
      afternoonDosage: afternoonDosage.join(),
      nightDosage: nightDosage.join(),
      duration: duration.join(),
      remarks: remarks.join()
    });
    return true;
  }


  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      this.validatePrescriptionDetails(-1);
      // this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  // for multile contact form ends (Dynamic Row)

  savePrescriptionDetails() {
    if (this.prescriptionDetailsFlag && this.prescriptionDetails()) {
      this.addPrescriptionForm.patchValue({ prescriptionId: this.prescriptionId, doctorName: this.doctorDetails, appointment: this.appointmentDetails, patient: this.patientDetails, date: this.date })
      if (this.addPrescriptionForm.valid) {
        this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
        this.prescriptionService.updatePrescriptionDetails(this.addPrescriptionForm.value).subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                this.gotoBack();
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
          });
      } else {
        alert("Please, fill the proper details.");
      }
    } else {
      alert("Please, fill the proper details.");
    }
  }

  gotoBack() {
    this.location.back();
  }

  backToAppointmentDashboarsList() {
    this.route.navigate(["/home/appointmentDashboard"]);
  }

  // lab Test

  routeToLabTest() {
    this.route.navigate(['home/labtest'])
  }

  reset() {
    this.dynamicArray = [];
    this.addRow();
  }

}
