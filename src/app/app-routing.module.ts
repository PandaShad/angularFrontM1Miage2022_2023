import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssignementComponent } from './assignements/add-assignement/add-assignement.component';
import { AssignementDetailComponent } from './assignements/assignement-detail/assignement-detail.component';
import { AssignementsComponent } from './assignements/assignements.component';
import { EditAssignementComponent } from './edit-assignement/edit-assignement.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', 
    component: HomePageComponent,
  },
  {
    path: 'home', 
    component: AssignementsComponent,
  },
  {
    path: 'add', 
    component: AddAssignementComponent,
  },
  {
    path: 'assignement/:id', 
    component: AssignementDetailComponent,
  },
  {
    path: 'assignement/:id/edit', 
    component: EditAssignementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
