import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PatientService } from 'src/app/modules/service/patient/patient.service';
import { DoctorserviceService } from 'src/app/modules/service/doctor/doctorservice.service';
import { AppointmentService } from 'src/app/modules/service/appointment/appointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-editappointment',
  templateUrl: './editappointment.component.html',
  styleUrls: ['./editappointment.component.scss']
})
export class EditappointmentComponent implements OnInit {

  editAppointmentForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  patientDetailsList: any; // all patients in db
  doctorDetailsList: any; // all doctors in db
  singlePatient: any;// single patient by id
  appointmentDetailsList: any; //all appointment in db
  appointmentId: any;
  today: any;

  filteredPatientOptions: Observable<any>;
  filteredDoctorOptions: Observable<any>;

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorserviceService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent) {

    // for date validation starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for date validation ends
  }


  ngOnInit() {
    this.editAppointmentFormBuilder();

    this.patientService.getPatientList().subscribe((data: any) => {
      if (data.success) {
        this.patientDetailsList = data['listObject'];
        this.filteredPatientOptions = this.editAppointmentForm.get('patientNumber').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.patientNumber),
          map(patientNumber => patientNumber ? this._filter(patientNumber) : this.patientDetailsList.slice()));
      } else {
        alert('please add patient details, then add appoint')
      }
    });

    this.doctorService.getDoctorList().subscribe((data: any) => {
      if (data.success) {
        this.doctorDetailsList = data['listObject'];
        this.filteredDoctorOptions = this.editAppointmentForm.get('doctorName').valueChanges.pipe(
          startWith(''),
          map(docvalue => typeof docvalue === 'string' ? docvalue : docvalue.doctorName),
          map(doctorName => doctorName ? this._filters(doctorName) : this.doctorDetailsList.slice()));
      } else {
        alert('sorry no doctors available')
      }
    });

    // all appointmnet list
    this.appointmentService.getAppointmentList().subscribe((data: any) => {
      this.appointmentDetailsList = data.listObject;
    });


    this.route.queryParams.subscribe((data) => {
      this.appointmentId = data.appointmentId;
    });

    this.appointmentService
      .getAppointmentDetails(this.appointmentId)
      .subscribe((data: any) => {
        let doctorName = this.doctorDetailsList.find(
          (jdata: any) =>
            JSON.stringify(jdata) === JSON.stringify(data.object.doctorName)
        ); // To display doctorNAme in field

        let patientNumber = this.patientDetailsList.find(
          (jdata: any) =>
            JSON.stringify(jdata) === JSON.stringify(data.object.patientNumber)
        ); // To display doctorNAme in field

        this.editAppointmentForm.patchValue(data.object);
        this.editAppointmentForm.patchValue({
          doctorName: doctorName, patientNumber: patientNumber
        });
      });
  }

  patientDetailsById(patient) {
    this.singlePatient = patient.value;
    this.editAppointmentForm.patchValue({ patientName: this.singlePatient.patientName, phoneNumber: this.singlePatient.phoneNumber })
  }

  editAppointmentFormBuilder() {
    this.editAppointmentForm = this.fb.group({
      patientNumber: [null, [Validators.required, Validators.minLength(3)]],
      patientName: [null, [Validators.required, Validators.minLength(3)]],
      doctorName: [null, [Validators.required, Validators.minLength(3)]],
      appointmentDate: [null, [Validators.required]],
      appointmentTime: [null, [Validators.required]],
      appointmentId: "",
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
    });
    this.editAppointmentForm.setValidators(this.customValidation());
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

  // doctorName autocomplete starts here
  displayDoctorFn(doctorName: any): string {
    return doctorName && doctorName.doctorName ? doctorName.doctorName : '';
  }

  private _filters(doctorName: string): any {
    const filterValues = doctorName.toLowerCase();
    return this.doctorDetailsList.filter(doctor => doctor.doctorName.toLowerCase().indexOf(filterValues) === 0);
  }
  // doctorName autocomplete ends here

  updateAppointmentDetailsFormSubmit() {
    if (this.editAppointmentForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.appointmentService.updateAppointmentDetails(this.editAppointmentForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          this.gotoBack();
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

  // custom validation starts
  patientNumberInputMsg: string; patientNumber: string;
  doctorNameInputMsg: string; doctorName: string;


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

      // for doctorName Autocomplete starts here
      const doctorNameFormGroup = formGroup.controls["doctorName"];
      if (doctorNameFormGroup.value !== "" && doctorNameFormGroup.value !== null) {
        if (typeof (doctorNameFormGroup.value) !== 'object') {
          console.log(typeof (doctorNameFormGroup.value));
          this.doctorNameInputMsg = "Please select from the List";
          doctorNameFormGroup.setErrors({});
        }
      } else {
        this.doctorNameInputMsg = "Please enter this field.";
        doctorNameFormGroup.setErrors({});
      }
      // for doctorName Autocomplete ends here
      return;
    };
  }
  // custom validation ends

  gotoBack() {
    this.location.back();
  }
}
