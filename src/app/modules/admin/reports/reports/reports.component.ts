import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  routeToPrintBill() {
    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  routeToAppointmentReport() {
    this.route.navigate(['home/appointmentreport'])
  }

  routeToPrintPatientReport() {
    this.route.navigate(['home/patientreport'])
  }

  routeToPrintDoctorsReport() {
    this.route.navigate(['home/doctorreport'])
  }

  routeToPrintRevenuReport() {
    this.route.navigate(['home/revenuereport'])
  }

}

