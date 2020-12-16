import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferalnoteComponent, PrintReferal } from './referalnote/referalnote.component';
import { MatDividerModule, MatSidenavModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatListModule, MatTableModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, MatCardModule, MatProgressBarModule, MatSlideToggleModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReferalnoteComponent, PrintReferal],
  imports: [
    CommonModule,
    RouterModule,
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
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [PrintReferal]
})
export class ReferalnoteModule { }
