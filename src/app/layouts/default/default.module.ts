import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import {
  MatSidenavModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSort,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatRadioModule,
  MatButtonModule,
  MatSelectModule,
  MatSnackBarModule, MatAutocompleteModule
} from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DashboardComponent } from "src/app/modules/dashboard/dashboard.component";
import { AdminModule } from "src/app/modules/admin/admin.module";
import { DoctorshomeComponent } from "src/app/modules/admin/doctors/doctorshome/doctorshome.component";
import { PatientshomeComponent } from 'src/app/modules/admin/patients/patientshome/patientshome.component';
import { AppointmenthomeComponent } from 'src/app/modules/admin/appointment/appointmenthome/appointmenthome.component';
import { PrescriptionhomeComponent } from 'src/app/modules/admin/prescription/prescriptionhome/prescriptionhome.component';
import { AddprescriptionComponent } from 'src/app/modules/admin/prescription/addprescription/addprescription.component';
import { ListpatienthistoryComponent } from 'src/app/modules/admin/patienthistory/listpatienthistory/listpatienthistory.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { AddbillconfigurationComponent } from 'src/app/modules/master/billconfiguration/addbillconfiguration/addbillconfiguration.component';
import { MasterModule } from 'src/app/modules/master/master.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrinthomeComponent } from 'src/app/modules/admin/print/printhome/printhome.component';
import { ReferalnoteModule } from 'src/app/modules/admin/referalnote/referalnote.module';
import { Ng2OdometerModule } from "ng2-odometer";
import { ReportsComponent } from 'src/app/modules/admin/reports/reports/reports.component';
import { InvoicehomeComponent } from 'src/app/modules/admin/invoice/invoicehome/invoicehome.component';
import { UserhomeComponent } from 'src/app/modules/admin/user/userhome/userhome.component';
import { MyappointmentComponent } from 'src/app/modules/admin/myappointment/myappointment/myappointment.component';
import { DoctorsappointmentdashboardComponent } from 'src/app/modules/admin/myappointment/doctorsappointmentdashboard/doctorsappointmentdashboard.component';
import { DoctorrolemasterComponent } from 'src/app/modules/master/doctormaster/doctorrolemaster/doctorrolemaster.component';
import { MyPatientsComponent } from 'src/app/modules/admin/myappointment/my-patients/my-patients.component';
import { FrontdeskhomeComponent } from 'src/app/modules/admin/frontdesk/frontdeskhome/frontdeskhome.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DoctorshomeComponent,
    PatientshomeComponent,
    AppointmenthomeComponent,
    AddprescriptionComponent,
    ListpatienthistoryComponent,
    PrescriptionhomeComponent,
    AddbillconfigurationComponent,
    PrinthomeComponent,
    ReportsComponent,
    InvoicehomeComponent,
    UserhomeComponent,
    MyappointmentComponent,
    MyPatientsComponent,
    DoctorsappointmentdashboardComponent,
    DoctorrolemasterComponent,
    PostsComponent,
    FrontdeskhomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AdminModule,
    MasterModule,
    MatSidenavModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    ReferalnoteModule,
    FormsModule,
    MatSelectModule,
    Ng2OdometerModule,
    MatSnackBarModule,
    FormsModule,
    MatBadgeModule,
    MatAutocompleteModule

 
  ],
})
export class DefaultModule { }
