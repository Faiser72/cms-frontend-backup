import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-referalnote',
  templateUrl: './referalnote.component.html',
  styleUrls: ['./referalnote.component.scss']
})
export class ReferalnoteComponent implements OnInit {

  today: any;
  referalForm: FormGroup;
  // patientName: String = "sanjay";
  // age = 90;
  // date = "09-07-2020";
  // doctorName = "sudhakar";

  // qp
  appointmentId: any; //from query params
  appointmentDetails: any;
  patientDetails: any;
  patientId: any; //from query params
  checkedDiagnosisDetails: any;
  doctorId: any;
  age: any;
  doctorDetails: any;
  date: any;
  checkedReferalDetails: any;
  referenceId: any;
  // qp

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private referalService: ReferalService) { }

  ngOnInit() {
    this.referalFormBuilder();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;

    this.route.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      this.doctorId = params.doctor;
    });

    // for appointment details
    this.appointmentService.getAppointmentDetails(this.appointmentId).subscribe((data: any) => {
      this.appointmentDetails = data.object;
      // this.referalForm.patchValue({ appointment: data.object })
      this.date = this.appointmentDetails.appointmentDate;
    })

    this.referalService.checkSavedAndGetData(this.appointmentId).subscribe((data: any) => {
      if (data.success) {
        this.checkedReferalDetails = data.object;
        this.referenceId = this.checkedReferalDetails.referenceId;
        this.referalForm.patchValue(data.object);
      } else {
        // console.log("Operation failed");
      }
    });

    // for patient details
    this.patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
      this.patientDetails = data.object;
      this.referalForm.patchValue({ patientId: this.patientDetails.patientName, age: this.patientDetails.age })

      // this.patientName = this.patientDetails.patientName;
      // this.patientNumber = this.patientDetails.patientNumber;
      this.age = this.patientDetails.age;
    })


    // for doctor details
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
      this.doctorDetails = data.object;
      this.referalForm.patchValue({ doctorId: data.object, referedBy: this.doctorDetails.doctorName })
      // this.doctorName = this.doctorDetails.doctorName;
    })
  }

  // printReferal() {
  //   console.log('hii bill');
  //   const printContent = document.getElementById("componentID");
  //   const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  //   WindowPrt.document.write(printContent.innerHTML);
  //   WindowPrt.document.close();
  //   WindowPrt.focus();
  //   WindowPrt.print();
  //   WindowPrt.close();

  // }

  referalFormBuilder() {
    this.referalForm = this.fb.group({
      patientId: "",
      referedBy: [null, [Validators.required]],
      age: [null, [Validators.required]],
      remarks: [null, [Validators.required]],
      date: [null, [Validators.required]],
      appointment: "",
      doctorId: "",
      referenceId: ""
    });
  }


  saveReferalFormSubmit() {
    this.referalForm.patchValue({ patientId: this.patientDetails, referenceId: this.referenceId, doctorId: this.doctorDetails, appointment: this.appointmentDetails });
    if (this.referalForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.referalService.updateReferenceDetails(this.referalForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          setTimeout(() => {
            // this.gotoBack();
          }, 500);
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


  //for popup forgotpassword
  openDialog(): void {
    var printObj = {
      patientName: this.patientDetails.patientName,
      age: this.referalForm.get("age").value,
      date: this.referalForm.get("date").value,
      doctorName: this.doctorDetails.doctorName,
      remarks: this.referalForm.get("remarks").value,
      today: this.today
    }
    const dialogRef = this.dialog.open(PrintReferal, {
      width: "800px",
      height: "700px",
      data: { pageValue: printObj }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

}





//PopUp of View Rounds
@Component({
  selector: "printreferal",
  templateUrl: "printreferal.html",
  styleUrls: ["./referalnote.component.scss"],
})
export class PrintReferal {

  today: any;
  patientName: String;
  age: any;
  date: any;
  doctorName: any;
  remarks: any;

  printObj;
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PrintReferal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.printObj = data.pageValue;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.patientName = this.printObj.patientName;
    this.age = this.printObj.age;
    this.date = this.printObj.date;
    this.doctorName = this.printObj.doctorName;
    this.remarks = this.printObj.remarks;
    this.today = this.printObj.today;

  }

  printReferal(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    location.reload();
  }

  close() {
    this.dialogRef.close();
  }
}