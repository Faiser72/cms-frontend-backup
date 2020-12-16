import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labreports',
  templateUrl: './labreports.component.html',
  styleUrls: ['./labreports.component.scss']
})
export class LabreportsComponent implements OnInit {

  patientNumber;
  patientName;
  doctorName
  date;

  constructor() { }

  ngOnInit() {
  }

}
