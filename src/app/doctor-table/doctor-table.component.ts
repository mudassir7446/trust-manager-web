import { Doctor } from './../models/doctor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrls: ['./doctor-table.component.scss']
})
export class DoctorTableComponent implements OnInit
{

  doctors: Doctor[] = [new Doctor('DOC_001', "Murtaza", "Rassiwala"), new Doctor('DOC_002', "Mehmuda", "Sheikh")];
  displayedColumns: string[] = ['doctorId', 'firstname', 'lastname'];
  constructor() { }

  ngOnInit(): void
  {
  }
}
