import { Hospital } from './../models/hospital';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-table',
  templateUrl: './hospital-table.component.html',
  styleUrls: ['./hospital-table.component.scss']
})
export class HospitalTableComponent implements OnInit
{

  hospitals: Hospital[] = [new Hospital('Shelbi Super-speciality', 'Zanjeera wala square', '1234567890'), new Hospital('Gokuldas Hospitals', 'Dhakkanwala Kuwa', '9876543210')];
  constructor() { }

  ngOnInit(): void
  {
  }

  displayedColumns: string[] = ['hospitalName', 'address', 'contactNo'];

}
