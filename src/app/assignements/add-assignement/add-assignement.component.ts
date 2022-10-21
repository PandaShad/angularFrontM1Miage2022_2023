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
  dateDelivery: Date;
  assignements: any;

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
    newAssignement.id = Math.floor(Math.random()*1000000000);

    this.assignementsService.addAssignement(newAssignement)
      .subscribe(response => console.log(response.message));

    // this.assignements.push(newAssignement);
    // this.newAssignementOutput.emit(newAssignement);
  }
}
