import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatSnackBar } from '@angular/material';
import { TestReport } from '../testreportmodel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { isNullOrUndefined } from 'util';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { TestreportService } from 'src/app/modules/service/testreport/testreport.service';

@Component({
  selector: 'app-preliminarycheck',
  templateUrl: './preliminarycheck.component.html',
  styleUrls: ['./preliminarycheck.component.scss']
})
export class PreliminarycheckComponent implements OnInit {


  addDiagnosisForm: FormGroup;
  addTestReportForm: FormGroup;
  appointmentId: any; //from query params
  appointmentDetails: any;
  patientDetails: any;
  patientId: any; //from query params
  patientNumber: any;
  patientName: any;
  age: any;
  date: any;
  thyroidValue: String = "no";
  diagnosisId: any;

  // fileUploads
  uploadFiles = new FormData();
  photoFile: FileList;
  testReportFile: FileList;
  testReportcvFile: string | Blob;
  ppFile: string | Blob;
  placeholder_path: string;
  testReportFileName: string;
  candidatePhotoName: string;
  photoMessage: string;
  testReportMessage: string;

  // thyroid files
  thyroidFile: FileList;
  thyroidFileName: string;
  thyroidcvFile: string | Blob;
  thyroidMessage: string;



  //  for dropdown starts

  heightUnits = [
    { value: 'feet-0', viewValue: 'Feet' },
    { value: 'inches-1', viewValue: 'Inches' },
    { value: 'centimeters-2', viewValue: 'Centimeters' },
    { value: 'meters-3', viewValue: 'Meters' }

  ];

  weightUnits = [
    { value: 'pounds-0', viewValue: 'Pounds' },
    { value: 'kilogram-1', viewValue: 'Kilogram' },
  ];

  temperatureUnits = [
    { value: 'celsius-0', viewValue: 'Celsius' },
    { value: 'fahrenhite-1', viewValue: 'Fahrenhite' },
    { value: 'kelvin-2', viewValue: 'Kelvin' }
  ];

  //  for dropdown ends

  dynamicArray: Array<TestReport> = [];
  newDynamic: any = {};
  checkedDiagnosisDetails: any;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private appointmentService: AppointmentService,
    private testReportService: TestreportService
  ) {
    this.testReportFileName = "No File Chosen";
    this.thyroidFileName = "No File Chosen";


  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;

      this.patientDiagnosisService.checkSavedAndGetData(this.appointmentId).subscribe((data: any) => {
        if (data.success) {
          this.checkedDiagnosisDetails = data.object;

          this.diagnosisId = this.checkedDiagnosisDetails.diagnosisId;
          this.addDiagnosisForm.patchValue({
            height: this.checkedDiagnosisDetails.height, heightUnits: this.checkedDiagnosisDetails.heightUnits,
            weight: this.checkedDiagnosisDetails.weight, weightUnits: this.checkedDiagnosisDetails.weightUnits,
            bloodPreasure: this.checkedDiagnosisDetails.bloodPreasure, temperature: this.checkedDiagnosisDetails.temperature,
            temperatureUnits: this.checkedDiagnosisDetails.temperatureUnits, thyroid: this.checkedDiagnosisDetails.thyroid
          })
          this.thyroidValue = this.checkedDiagnosisDetails.thyroid;
        } else {
          console.log("Operation failed");
        }
      });
    });



    // for patient details
    this.patientService.getPatientDetails(this.patientId).subscribe((data: any) => {
      this.patientDetails = data.object;
      this.addDiagnosisForm.patchValue({ patient: data.object })

      this.patientName = this.patientDetails.patientName;
      this.patientNumber = this.patientDetails.patientNumber;
      this.age = this.patientDetails.age;
    })

    // for appointment details
    this.appointmentService.getAppointmentDetails(this.appointmentId).subscribe((data: any) => {
      this.appointmentDetails = data.object;
      this.date = this.appointmentDetails.appointmentDate;
      this.addDiagnosisForm.patchValue({ appointment: data.object })
    })




    // for multile contact form starts
    this.newDynamic = {
      testName: "",
      uploadReport: ""
    };
    this.dynamicArray.push(this.newDynamic);
    // for multile contact form ends

    this.addDiagnosisFormBuilder();
    this.addTestReportFormBuilder()
  }

  addDiagnosisFormBuilder() {
    this.addDiagnosisForm = this.fb.group({
      // age: [null, [Validators.required]],
      height: [null, [Validators.required]],
      heightUnits: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      weightUnits: [null, [Validators.required]],
      bloodPreasure: [null, [Validators.required]],
      temperature: [null, [Validators.required]],
      temperatureUnits: [null, [Validators.required]],
      thyroid: [null, [Validators.required]],
      thyroidReports: "",
      patient: "",
      appointment: "",
      diagnosisId: ""
    });
  }

  addTestReportFormBuilder() {
    this.addTestReportForm = this.fb.group({
      testName: [null, [Validators.required]],
      testReportFileName: "",
      diagnosisId: ""
    })
  }

  // getTestReportFile(testReportUpload: HTMLInputElement, event: any) {
  //   const testReportName = event.target.files[0].name;
  //   this.testReportFile = testReportUpload.files;
  //   if (this.testReportFile.length === 0) return;

  //   let mimeType = this.testReportFile[0].type;
  //   if (mimeType.match(/application\/pdf/) == null) {
  //     this.testReportMessage = "Only pdf files are supported.";
  //     this.testReportFileName = "No File Chosen";
  //     return;
  //   } else {
  //     this.testReportMessage = null;
  //     this.testReportFileName = testReportName;
  //     var form_data = new FormData();
  //     form_data.append("file", event.target.files[0]);
  //     this.testReportcvFile = event.target.files[0];
  //   }
  // }


  thyroid(tradio: MatRadioChange) {
    this.thyroidValue = tradio.value;
  }

  // for Thyroid file starts
  getThyroidFile(thyroidUpload: HTMLInputElement, event: any) {
    this.thyroidFile = thyroidUpload.files;
    if (this.thyroidFile.length === 0)
      return;
    const thyroidName = event.target.files[0].name;
    let mimeType = this.thyroidFile[0].type;
    if (mimeType.match(/application\/pdf/) == null) {
      this.thyroidMessage = "Only pdf files are supported.";
      this.thyroidFileName = "No File Chosen";
      return;
    } else {
      this.thyroidMessage = null;
      this.thyroidFileName = thyroidName;
      // var form_data = new FormData();
      this.thyroidcvFile = event.target.files[0];
      this.saveThyroidFile();
      // form_data.append("file", event.target.files[0]);
      // this.thyroidcvFile = event.target.files[0];
    }
  }

  saveThyroidFile() {
    this.appComponent.startSpinner("Uploading file..\xa0\xa0Please wait ...");
    const thyroidFormData = new FormData();
    thyroidFormData.append('thyroidFile', this.thyroidcvFile);
    thyroidFormData.append('diagnosisId', this.diagnosisId);
    this.patientDiagnosisService.saveOrUpdateThyroidFiles(thyroidFormData).subscribe((resp: any) => {
      if (resp.success) {
        this.appComponent.stopSpinner();
        if (resp.message == "Already Uploaded") {
          this._snackBar.open("Thyroid File", "Already Uploaded", {
            duration: 2500,
          });
        } else {
          this.appComponent.stopSpinner();
          this._snackBar.open("THyroid File", "Uploaded Successfully", {
            duration: 2500,
          });
        }
      } else {
        this.appComponent.stopSpinner();
        this._snackBar.open("Thyroid File", "Fails to Upload", {
          duration: 2500,
        });
      }
    });
  }


  downloadThyroid() {
    this.patientDiagnosisService.getThyroidFile(this.diagnosisId).subscribe((response: any) => {
      if (response.success) {
        let base64Data = response.byteArray;
        fetch("data:application/pdf;base64," + base64Data)
          .then(function (resp) { return resp.blob() })
          .then(function (blob) {
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
          });
      } else {
        this._snackBar.open("Alert !", "Thyroid File Not Found", { duration: 2500 });
        // console.log("testReport File Not Found");
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  // for thyroid file ends

  // for Thyroid file starts
  // getTestReportFile(testReportUpload: HTMLInputElement, event: any) {
  //   this.testReportFile = testReportUpload.files;
  //   if (this.testReportFile.length === 0)
  //     return;
  //   const testReportName = event.target.files[0].name;
  //   let mimeType = this.thyroidFile[0].type;
  //   if (mimeType.match(/application\/pdf/) == null) {
  //     this.testReportMessage = "Only pdf files are supported.";
  //     this.testReportFileName = "No File Chosen";
  //     return;
  //   } else {
  //     this.testReportMessage = null;
  //     this.testReportFileName = testReportName;
  //     // var form_data = new FormData();
  //     this.testReportcvFile = event.target.files[0];
  //     this.saveTestReportFile();
  //     // form_data.append("file", event.target.files[0]);
  //     // this.thyroidcvFile = event.target.files[0];
  //   }
  // }

  testReportFileValue: any;
  getTestReportFile(testReportUpload: HTMLInputElement, event: any) {
    if (this.addTestReportForm.get('testReportFileName').value != '') {
      this.testReportFileValue = event.target.files[0];
    } else {
      this.addTestReportForm.get('testReportFileName').setValue(this.testReportFileValue, { emitModelToViewChange: false });
    }

    this.testReportFile = testReportUpload.files;
    if (this.testReportFile.length === 0)
      return;

    // 1MB = 1,048,576 Bytes
    //alert(this.resumeFile[0].size)
    const testReportName = event.target.files[0].name;
    let mimeType = this.testReportFile[0].type;
    if (mimeType.match(/application\/pdf/) == null) {
      this.testReportMessage = "Only pdf files are supported.";
      this.testReportFileName = "No File Chosen";
      return;
    } else {
      this.testReportMessage = null;
      this.testReportFileName = testReportName;
      this.testReportcvFile = event.target.files[0];
    }
  }


  saveTestReportFile() {
    this.appComponent.startSpinner("Uploading file..\xa0\xa0Please wait ...");
    const testReportFormData = new FormData();
    testReportFormData.append('testReportFile', this.testReportcvFile);
    testReportFormData.append('diagnosisId', this.diagnosisId);
    this.testReportService.saveOrUpdateTestReportFile(testReportFormData).subscribe((resp: any) => {
      if (resp.success) {
        this.appComponent.stopSpinner();
        if (resp.message == "Already Uploaded") {
          this._snackBar.open("TestReport File", "Already Uploaded", {
            duration: 2500,
          });
        } else {
          this.appComponent.stopSpinner();
          this._snackBar.open("TestReport File", "Uploaded Successfully", {
            duration: 2500,
          });
        }
      } else {
        this.appComponent.stopSpinner();
        this._snackBar.open("TestReport File", "Fails to Upload", {
          duration: 2500,
        });
      }
    });
  }


  downloadTestReport() {
    this.testReportService.getTestReportsFile(this.diagnosisId).subscribe((response: any) => {
      if (response.success) {
        let base64Data = response.byteArray;
        fetch("data:application/pdf;base64," + base64Data)
          .then(function (resp) { return resp.blob() })
          .then(function (blob) {
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
          });
      } else {
        this._snackBar.open("Alert !", "TestReport File Not Found", { duration: 2500 });
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  addTestReportSubmit() {
    this.addTestReportForm.patchValue({ diagnosisId: this.checkedDiagnosisDetails });
    if (this.addTestReportForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.testReportService.saveTestReportsDetails(this.addTestReportForm.value).subscribe((data: any) => {
        if (data.success) {
          if (!isNullOrUndefined(this.testReportcvFile)) {
            // const resumeFormData = new FormData();
            // resumeFormData.append("resumeFile", this.resumecvFile);
            // resumeFormData.append("candidateId", data.object.candidateId);
            const testReportFormData = new FormData();
            testReportFormData.append('testReportsFile', this.testReportcvFile);
            testReportFormData.append("testReportsId", data.object.testReportsId);
            this.testReportService.saveOrUpdateTestReportFile(testReportFormData).subscribe((resp: any) => {
              if (resp.success) {
                // this.placeholder_path = "../../../../assets/Placeholder.jpg";
                this.testReportFileName = "No File Chosen";
                alert("Data saved ! file uploaded.")
                this.addTestReportForm.reset();
                this.appComponent.stopSpinner();
              } else {
                alert("Data saved ! But fails to upload file")
                this.appComponent.stopSpinner();
              }
            });
          } else {
            alert("Data saved , when file is option");
            this.appComponent.stopSpinner();
            this.addTestReportForm.reset();
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
  // for thyroid file ends

  addRow() {
    this.newDynamic = {
      testName: "",
      uploadReport: ""
    };
    this.dynamicArray.push(this.newDynamic);
    // this.toastr.success('New row added successfully', 'New Row');
    return true;
  }

  // contact(): boolean {
  //   let cName: any = [];
  //   let cNo: any = [];
  //   let cEmailId: any = [];
  //   this.dynamicArray.forEach((object, i) => {
  //     cName[i] = object.contactPersonName;
  //     cNo[i] = object.contactPersonNo;
  //     cEmailId[i] = object.contactPersonEmailId;
  //   });

  //   this.addCompanyForm.patchValue({
  //     contactPersonName: cName.join(),
  //     contactPersonNo: cNo.join(),
  //     contactPersonEmailId: cEmailId.join(),
  //   });
  //   return true;
  // }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      // this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  // for multile contact form ends (Dynamic Row)

  // saveThyroidFile() {
  //   this.appComponent.startSpinner("Uploading file..\xa0\xa0Please wait ...");
  //   const thyroidFormData = new FormData();
  //   thyroidFormData.append('thyroidFile', this.thyroidcvFile);
  //   thyroidFormData.append('diagnosisId', this.id);
  //   this.patientDiagnosisService.saveOrUpdateThyroidFiles(thyroidFormData).subscribe((resp: any) => {
  //     if (resp.success) {
  //       this.appComponent.stopSpinner();
  //       if (resp.message == "Already Uploaded") {
  //         this._snackBar.open("Thyroid File", "Already Uploaded", {
  //           duration: 2500,
  //         });
  //       } else {
  //         this.appComponent.stopSpinner();
  //         this._snackBar.open("Thyroid File", "Uploaded Successfully", {
  //           duration: 2500,
  //         });
  //       }
  //     } else {
  //       this.appComponent.stopSpinner();
  //       this._snackBar.open("Thyroid File", "Fails to Upload", {
  //         duration: 2500,
  //       });
  //     }
  //   });
  // }

  addDiagnosisFormSubmit() {
    this.addDiagnosisForm.patchValue({ diagnosisId: this.diagnosisId });
    if (this.addDiagnosisForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.patientDiagnosisService.updatePatientDiagnosisDetails(this.addDiagnosisForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          setTimeout(() => {
            this.gotoBack();
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
}
