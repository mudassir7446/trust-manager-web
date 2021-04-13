import { Doctor } from './../models/doctor';
import { Hospital } from './../models/hospital';
import { Beneficiary } from './../models/beneficiary';
import { Case } from './../models/case';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  styleUrls: ['./cases-table.component.scss']
})
export class CasesTableComponent implements OnInit
{

  constructor() { }

  cases: Case[] = [
    new Case('CASE_001', new Beneficiary('IPD_9876', 'Salma', 'Bi'), new Hospital('Shelbi Super-speciality', 'Zanjeera wala square', '1234567890'), new Doctor('DOC_002', "Mehmuda", "Sheikh"), 'In Progress'),
    new Case('CASE_002', new Beneficiary('IPD_123', 'Zakir', 'Khan'), new Hospital('Gokuldas Hospitals', 'Dhakkanwala Kuwa', '9876543210'), new Doctor('DOC_001', "Murtaza", "Rassiwala"), 'Completed')
  ];

  ngOnInit(): void
  {
  }

  displayedColumns: string[] = ['caseId', 'beneficiaryIPD', 'hospitalName', 'doctorName', 'status'];

}
