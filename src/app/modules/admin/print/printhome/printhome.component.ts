import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printhome',
  templateUrl: './printhome.component.html',
  styleUrls: ['./printhome.component.scss']
})
export class PrinthomeComponent implements OnInit {

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

  routeToPrintReferal() {
    this.route.navigate(['home/printreferalnote'])
  }

  routeToPrintPrescription() {
    this.route.navigate(['home/printprescription'])
  }

  routeToPrintLabTest() {
    this.route.navigate(['home/patientlabtest'])
  }

  routeToPrintReceipt() {
    this.route.navigate(['home/printreceipt'])
  }

}
