import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { PatientdiagnosisService } from 'src/app/modules/service/patientdiagnosis/patientdiagnosis.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { Location } from '@angular/common';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';

@Component({
  selector: 'app-patienthistoryanddiagnosis',
  templateUrl: './patienthistoryanddiagnosis.component.html',
  styleUrls: ['./patienthistoryanddiagnosis.component.scss']
})
export class PatienthistoryanddiagnosisComponent implements OnInit {

  // qp
  appointmentId: any; //from query params
  appointmentDetails: any;
  patientDetails: any;
  patientId: any; //from query params
  checkedDiagnosisDetails: any;
  doctorId: any;
  age: any;
  doctorDetails: any;
  // qp
  diagnosisId: any;
  patientNumber;
  patientName;
  doctorName
  date;
  thyroidValue: String = "no";

  addDiagnosisForm: FormGroup;

  // fileUploads
  uploadFiles = new FormData();
  photoFile: FileList;
  resumeFile: FileList;
  resumecvFile: string | Blob;
  ppFile: string | Blob;
  placeholder_path: string;
  resumeFileName: string;
  candidatePhotoName: string;
  photoMessage: string;
  resumeMessage: string;

  // thyroid files
  thyroidFile: FileList;
  thyroidFileName: string;
  thyroidcvFile: string | Blob;
  thyroidMessage: string;

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

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "date",
    "diagnosis",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  patientHistoryDiagnosisDetailsList: any;



  //  for dropdown ends

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location,
    private appComponent: AppComponent,
    private patientService: PatientService,
    private patientDiagnosisService: PatientdiagnosisService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService) {
    this.resumeFileName = "No File Chosen";
    this.thyroidFileName = "No File Chosen";

  }

  ngOnInit() {
    this.addDiagnosisFormBuilder();

    this.route.queryParams.subscribe((params) => {
      this.patientId = params.patient;
      this.appointmentId = params.appointment;
      this.doctorId = params.doctor;


      this.patientDiagnosisService.checkSavedAndGetData(this.appointmentId).subscribe((data: any) => {
        if (data.success) {
          this.checkedDiagnosisDetails = data.object;
          this.diagnosisId = this.checkedDiagnosisDetails.diagnosisId;
          this.addDiagnosisForm.patchValue({
            height: this.checkedDiagnosisDetails.height, heightUnits: this.checkedDiagnosisDetails.heightUnits,
            weight: this.checkedDiagnosisDetails.weight, weightUnits: this.checkedDiagnosisDetails.weightUnits,
            bloodPreasure: this.checkedDiagnosisDetails.bloodPreasure, temperature: this.checkedDiagnosisDetails.temperature,
            temperatureUnits: this.checkedDiagnosisDetails.temperatureUnits, thyroid: this.checkedDiagnosisDetails.thyroid,
            diagnosis: this.checkedDiagnosisDetails.diagnosis,
            followUpdate: this.checkedDiagnosisDetails.followUpdate,
            investigation: this.checkedDiagnosisDetails.investigation,
          })
          this.thyroidValue = this.checkedDiagnosisDetails.thyroid;
        } else {
          // console.log("Operation failed");
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
      this.addDiagnosisForm.patchValue({ appointment: data.object })
      this.date = this.appointmentDetails.appointmentDate;
    })

    // for doctor details
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data: any) => {
      this.doctorDetails = data.object;
      this.addDiagnosisForm.patchValue({ doctorName: data.object })
      this.doctorName = this.doctorDetails.doctorName;
    });

    // for diagnosis
    this.patientDiagnosisService.getPatientDiagnosisListByPatientId(this.patientId).subscribe((data: any) => {
      if (data.success) {
        this.patientHistoryDiagnosisDetailsList = data['listObject'];
        var x = this.patientHistoryDiagnosisDetailsList.slice(1, 3);
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





  addDiagnosisFormBuilder() {
    this.addDiagnosisForm = this.fb.group({
      height: [null, [Validators.required]],
      heightUnits: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      weightUnits: [null, [Validators.required]],
      bloodPreasure: [null, [Validators.required]],
      temperature: [null, [Validators.required]],
      temperatureUnits: [null, [Validators.required]],
      thyroid: [null, [Validators.required]],
      thyroidReports: "",
      diagnosis: [null, [Validators.required]],
      diagnosisId: "",
      appointment: "",
      doctorName: "",
      patient: "",
      date: "",
      followUpdate: "",
      investigation: [null, [Validators.required]],
    });
  }

  thyroid(tradio: MatRadioChange) {
    this.thyroidValue = tradio.value;
  }

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
        // console.log("Resume File Not Found");
      }
    }, (error: any) => {
      // console.log(error);
    });
  }

  routeTOViewPatientDiagnosisdetails(diagnosisDetails: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { appointment: diagnosisDetails.appointment.appointmentId, },
    };
    this.router.navigate(
      ['home/viewpatientdiagnosysdetails'],
      navigationExtras
    );
  }

  addDiagnosisFormSubmit() {
    this.addDiagnosisForm.patchValue({ diagnosisId: this.diagnosisId, doctorName: this.doctorDetails, appointment: this.appointmentDetails, patient: this.patientDetails, date: this.date });
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
