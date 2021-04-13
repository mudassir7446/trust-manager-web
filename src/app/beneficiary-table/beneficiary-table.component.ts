import { Beneficiary } from './../models/beneficiary';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficiary-table',
  templateUrl: './beneficiary-table.component.html',
  styleUrls: ['./beneficiary-table.component.scss']
})
export class BeneficiaryTableComponent implements OnInit
{

  constructor() { }

  beneficiaries: Beneficiary[] = [new Beneficiary('IPD_123', 'Zakir', 'Khan'), new Beneficiary('IPD_9876', 'Salma', 'Bi')];

  ngOnInit(): void
  {
  }

  displayedColumns: string[] = ['ipdNumber', 'firstname', 'lastname'];
}
