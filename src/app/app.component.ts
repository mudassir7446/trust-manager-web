import { AppFooterComponent } from './app-footer/app-footer.component';
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
    breakpointOberver.observe([Breakpoints.XSmall,Breakpoints.Small,Breakpoints.Medium]).subscribe(result =>{
      this.saviorIconClass = "small-device-icon";
      this.ishaatIconClass = "small-device-icon"
    });
  }
  title = 'Trust Portal';
  orgName = 'Shifa-E-Rehmani';
  orgNameClass:string ="";
  ishaatIconClass:string = "";
  saviorIconClass:string = "";
  //TODO make the organization name configurable
}
