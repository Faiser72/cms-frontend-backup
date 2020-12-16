import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdddoctorsComponent } from "./doctors/adddoctors/adddoctors.component";
import { EditdoctorsComponent } from "./doctors/editdoctors/editdoctors.component";
import { ListdoctorsComponent } from "./doctors/listdoctors/listdoctors.component";
import { MatDividerModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSnackBarModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { AddpatientsComponent } from './patients/addpatients/addpatients.component';
import { EditpatientsComponent } from './patients/editpatients/editpatients.component';
import { ListpatientsComponent } from './patients/listpatients/listpatients.component';
import { AddappointmentComponent } from './appointment/addappointment/addappointment.component';
import { EditappointmentComponent } from './appointment/editappointment/editappointment.component';
import { ListappointmentComponent } from './appointment/listappointment/listappointment.component';
import { PreliminarycheckComponent } from './appointment/preliminarycheck/preliminarycheck.component';
import { PatienthistoryanddiagnosisComponent } from './patients/patienthistoryanddiagnosis/patienthistoryanddiagnosis.component';
import { AddprescriptionComponent } from './prescription/addprescription/addprescription.component';
import { EditprescriptionComponent } from './prescription/editprescription/editprescription.component';
import { ListprescriptionComponent } from './prescription/listprescription/listprescription.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LabtestComponent } from './lab/labtest/labtest.component';
import { LabreportsComponent } from './lab/labreports/labreports.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewpatientdiagnosysdetailsComponent } from './patients/viewpatientdiagnosysdetails/viewpatientdiagnosysdetails.component';
import { PrintreferalnoteComponent } from './print/printreferalnote/printreferalnote.component';
import { PrintprescriptionComponent } from './print/printprescription/printprescription.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { EdituserComponent } from './user/edituser/edituser.component';
import { ListuserComponent } from './user/listuser/listuser.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MyappointmentComponent } from './myappointment/myappointment/myappointment.component';
import { DoctorsappointmentdashboardComponent } from './myappointment/doctorsappointmentdashboard/doctorsappointmentdashboard.component';
import { AddfrontdeskComponent } from './frontdesk/addfrontdesk/addfrontdesk.component';
import { EditfrontdeskComponent } from './frontdesk/editfrontdesk/editfrontdesk.component';
import { ListfrontdeskComponent } from './frontdesk/listfrontdesk/listfrontdesk.component';
import { DeletedfrontdesklistComponent } from './frontdesk/deletedfrontdesklist/deletedfrontdesklist.component';
import { DeletedlistdoctorComponent } from './doctors/deletedlistdoctor/deletedlistdoctor.component';
import { PatientreportsComponent } from './reports/patientreports/patientreports.component';
import { AppointmentreportsComponent } from './reports/appointmentreports/appointmentreports.component';
import { PrintlabtestComponent } from './print/printlabtest/printlabtest.component';
import { PrintreceiptComponent, PrintReceipt } from './print/printreceipt/printreceipt.component';
import { DoctorsreportComponent } from './reports/doctorsreport/doctorsreport.component';
import { RevenuereportComponent } from './reports/revenuereport/revenuereport.component';
import { AppointmentconformationComponent } from './appointment/appointmentconformation/appointmentconformation.component';

@NgModule({
  declarations: [
    AdddoctorsComponent,
    EditdoctorsComponent,
    ListdoctorsComponent,
    AddpatientsComponent,
    EditpatientsComponent,
    ListpatientsComponent,
    AddappointmentComponent,
    EditappointmentComponent,
    ListappointmentComponent,
    PreliminarycheckComponent,
    PatienthistoryanddiagnosisComponent,
    EditprescriptionComponent,
    ListprescriptionComponent,
    LabtestComponent,
    LabreportsComponent,
    ViewpatientdiagnosysdetailsComponent,
    PrintreferalnoteComponent,
    PrintprescriptionComponent,
    AdduserComponent,
    EdituserComponent,
    ListuserComponent,
    AddfrontdeskComponent,
    EditfrontdeskComponent,
    ListfrontdeskComponent,
    DeletedfrontdesklistComponent,
    DeletedlistdoctorComponent,
    PatientreportsComponent,
    AppointmentreportsComponent,
    PrintlabtestComponent,
    PrintreceiptComponent,
    PrintReceipt,
    DoctorsreportComponent,
    RevenuereportComponent,
    AppointmentconformationComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,

  ],
  entryComponents: [PrintReceipt]
})
export class AdminModule { }
