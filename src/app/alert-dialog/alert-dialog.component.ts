import { AttrAst } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export class AlertMessage
{
  constructor(public message: string, public callback: Function) { }
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit
{

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertMessage) { }

  ngOnInit(): void
  {
  }

  public onOkClick(): boolean
  {
    if (this.data.callback)
    {
      this.data.callback();
    }
    return true;
  }
}
