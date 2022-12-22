import { Component, OnInit } from '@angular/core';
import { AssignementsService } from 'src/app/shared/assignements.service';
import { Assignement } from '../assignement.model';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.css']
})
export class AddAssignementComponent implements OnInit {

  // @Output() newAssignementOutput = new EventEmitter<Assignement>();

  assignementName: string = '';
  auteur: string = '';
  dateDelivery: Date;
  assignements: any;
  matiere: string = '';
  matieres = ["math", 'svt'];
  note!: number;
  notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  remarque: string = '';

  constructor(
    private assignementsService: AssignementsService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newAssignement = new Assignement();
    newAssignement.nom = this.assignementName;
    newAssignement.dateDeRendu = this.dateDelivery;
    newAssignement.rendu = true;
    newAssignement.auteur = this.auteur;
    newAssignement.matiere = this.matiere;
    newAssignement.note = this.note;
    newAssignement.remarque = this.remarque;
    newAssignement.id = Math.floor(Math.random()*1000000000);

    this.assignementsService.addAssignement(newAssignement)
      .subscribe(response => console.log(response.message));

    // this.assignements.push(newAssignement);
    // this.newAssignementOutput.emit(newAssignement);
  }
}
