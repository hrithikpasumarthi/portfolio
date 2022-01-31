import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewdashboardComponent } from './newdashboard/newdashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponent } from './resume/resume.component';
import { RouteguardService } from './routeguard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{path:'login',component:SignupComponent},
                        {path:'dashboard',component:PortfolioComponent,canActivate:[RouteguardService]},
                      {path:'',component:SignupComponent},
                      {path:'signup',component:LoginComponent},
                    {path:'portfolio',component:ResumeComponent,canActivate:[RouteguardService]},
                  {path:'dashboardedit',component:NewdashboardComponent,canActivate:[RouteguardService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
