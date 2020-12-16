import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PrescriptionService } from 'src/app/modules/service/prescription/prescription.service';
import { isNullOrUndefined } from 'util';
import { Prescription } from '../../prescription/prescriptionmodel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewpatientdiagnosysdetails',
  templateUrl: './viewpatientdiagnosysdetails.component.html',
  styleUrls: ['./viewpatientdiagnosysdetails.component.scss']
})
export class ViewpatientdiagnosysdetailsComponent implements OnInit {

  appointmentId: any;
  patientHistoryDetailsList: any;
  patientPrescriptionDetailsList: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService,
    private location: Location) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.appointmentId = params.appointment;

      // for prescription
      this.prescriptionService.getPrescriptionDetailsByAppointment(this.appointmentId).subscribe((data: any) => {
        if (data.success) {
          this.patientPrescriptionDetailsList = data.object;
          if (!isNullOrUndefined(this.patientPrescriptionDetailsList)) {
            this.getRowDetails(this.patientPrescriptionDetailsList);
          }
        }
      });
    })
  }

  prescriptionDetails: Array<Prescription> = [];
  prescription: any = {};
  getRowDetails(data: any) {
    this.prescriptionDetails = [];
    let drugName: any = [];
    let strength: any = [];
    let duration: any = [];
    let remarks: any = [];
    if (!isNullOrUndefined(data.drugName)) {
      drugName = data.drugName.split(',');
      strength = data.strength.split(',');
      duration = data.duration.split(',');
      remarks = data.remarks.split(',');
      if (drugName.length == duration.length) {
        for (let i = 0; i < drugName.length; i++) {
          this.prescription = { drugName: drugName[i], strength: strength[i], remarks: remarks[i], duration: duration[i] };
          this.prescriptionDetails.push(this.prescription);
        }
      }
    }
  }

  backTodiagonosis() {
    this.location.back()
  }

}
