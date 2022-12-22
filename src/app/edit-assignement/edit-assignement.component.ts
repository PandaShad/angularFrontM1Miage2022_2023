import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignement } from '../assignements/assignement.model';
import { AssignementsService } from '../shared/assignements.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignement.component.html',
 styleUrls: ['./edit-assignement.component.scss'],
})
export class EditAssignementComponent implements OnInit {
 assignment!: Assignement | undefined;
 nomAssignment!: string;
 dateDeRendu!: Date;

 constructor(
   private assignmentsService: AssignementsService,
   private route: ActivatedRoute,
   private router: Router
 ) {}

 ngOnInit(): void {
   this.getAssignment();

   // affichage des querysParams et fragment
   console.log('Query Params : ', this.route.snapshot.queryParams);
   console.log('Snapshot : ', this.route.snapshot.fragment);
 }
 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];
 
  this.assignmentsService.getAssignementById(id).subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignmentsService
    .updateAssignement(this.assignment)
    .subscribe((message) => {
      console.log(message);

      // navigation vers la home page
      this.router.navigate(['/home']);
    });
}
}

