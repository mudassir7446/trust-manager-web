import { Component } from '@angular/core';
import { BreakpointObserver,Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(breakpointOberver:BreakpointObserver){
    breakpointOberver.observe([Breakpoints.XSmall]).subscribe(result =>{
      this.orgNameClass =result.matches ? "hide-on-xsmall-device":"";
    });
  }
  title = 'Trust Portal';
  orgName = 'Shifa-E-Rehmani';
  orgNameClass:string ="";
  //TODO make the organization name configurable
}
