import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { ReferalService } from 'src/app/modules/service/referal/referal.service';
import { Location } from '@angular/common';
import { ReceiptService } from 'src/app/modules/service/receipt/receipt.service';

@Component({
  selector: 'app-printreceipt',
  templateUrl: './printreceipt.component.html',
  styleUrls: ['./printreceipt.component.scss']
})
export class PrintreceiptComponent implements OnInit {

  receiptForm: FormGroup;
  today: string;
  testedAppointmentList: any;
  receiptDetails: any;

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
    private referalService: ReferalService,
    private receiptService: ReceiptService) { }

  ngOnInit() {
    this.receiptFormBuilder();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;
    this.receiptForm.patchValue({ date: this.today });

    this.appointmentService.getAllTestedDetailsList().subscribe((data: any) => {
      this.testedAppointmentList = data['listObject'];
    })
  }

  receiptFormBuilder() {
    this.receiptForm = this.fb.group({
      appointment: [null, [Validators.required]],
      serviceName: [null, [Validators.required]],
      amountInWords: [null, [Validators.required, Validators.pattern("^[A-Za-z -]+$")]],
      amount: [null, [Validators.required, Validators.pattern("^[0-9 -]+$")]],
      date: "",
    });
  }

  savereceiptFormSubmit() {
    if (this.receiptForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.receiptService
        .saveReceiptDetails(this.receiptForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                this.getReceiptDetails();
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

  getReceiptDetails() {
    this.receiptService.getReceiptListByAppointmentId(this.receiptForm.value.appointment.appointmentId).subscribe((data: any) => {
      this.receiptDetails = data.object;
    })
  }

  //for popup forgotpassword
  openDialog(): void {

    const dialogRef = this.dialog.open(PrintReceipt, {
      width: "800px",
      height: "700px",
      data: { pageValue: this.receiptDetails }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

}

//PopUp of View Rounds
@Component({
  selector: "printreceipt",
  templateUrl: "printreceipt.html",
  styleUrls: ["./printreceipt.component.scss"],
})
export class PrintReceipt {

  patientName: String;
  billId: any;
  amountInWords: any;
  amount: any;
  date: any;
  doctorName: any;
  serviceName: any;

  printObj;
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PrintReceipt>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.printObj = data.pageValue;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.billId = this.printObj.billId;
    this.patientName = this.printObj.appointment.patientName;
    this.doctorName = this.printObj.appointment.doctorName.doctorName;
    this.date = this.printObj.date;
    this.serviceName = this.printObj.serviceName;
    this.amount = this.printObj.amount;
    this.amountInWords = this.printObj.amountInWords;
  }

  printReceipt(cmpName) {
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
