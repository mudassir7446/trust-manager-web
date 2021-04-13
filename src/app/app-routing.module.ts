import { DoctorTableComponent } from './doctor-table/doctor-table.component';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'doctors',
        component: DoctorTableComponent
      }
    ]
  }, {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
