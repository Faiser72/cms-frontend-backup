import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatRadioModule, MatButtonModule, MatListModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddbillconfigurationComponent } from './billconfiguration/addbillconfiguration/addbillconfiguration.component';
import { ListbillconfigurationComponent } from './billconfiguration/listbillconfiguration/listbillconfiguration.component';
import { EditbillconfigurationComponent } from './billconfiguration/editbillconfiguration/editbillconfiguration.component';
import { BillconfigurationhomeComponent } from './billconfiguration/billconfigurationhome/billconfigurationhome.component';
import { DoctorrolemasterComponent } from './doctormaster/doctorrolemaster/doctorrolemaster.component';



@NgModule({
  declarations: [
    ListbillconfigurationComponent,
    EditbillconfigurationComponent,
    BillconfigurationhomeComponent,

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
    FormsModule,
    MatSelectModule
  ]
})
export class MasterModule { }
