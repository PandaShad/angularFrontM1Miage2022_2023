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
    newAssignement.dateDelivery = this.dateDelivery;
    newAssignement.rendered = true;
    newAssignement.id = 5;

    this.assignementsService.addAssignement(newAssignement)
      .subscribe(message => console.log(message));

    // this.assignements.push(newAssignement);
    // this.newAssignementOutput.emit(newAssignement);
  }
}
