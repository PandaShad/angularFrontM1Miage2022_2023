import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssignementComponent } from './assignements/add-assignement/add-assignement.component';
import { AssignementDetailComponent } from './assignements/assignement-detail/assignement-detail.component';
import { AssignementsComponent } from './assignements/assignements.component';
import { EditAssignementComponent } from './edit-assignement/edit-assignement.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: AssignementsComponent,
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
