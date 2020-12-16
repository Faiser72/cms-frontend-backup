import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addbillconfiguration',
  templateUrl: './addbillconfiguration.component.html',
  styleUrls: ['./addbillconfiguration.component.scss']
})
export class AddbillconfigurationComponent implements OnInit {

  feeType = [
    { value: 'consultation-0', viewValue: 'Consultation' },
    { value: 'vaccination-1', viewValue: 'Vaccination' },
    { value: 'surgery-2', viewValue: 'Surgery' },
    { value: 'rootcanal-3', viewValue: 'Rootcanal' },
    { value: 'visiontest-4', viewValue: 'Vision Test' }


  ];

  constructor() { }

  ngOnInit() {
  }

}
