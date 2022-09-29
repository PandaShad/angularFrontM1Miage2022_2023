import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignement } from '../assignement.model';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.css']
})
export class AddAssignementComponent implements OnInit {

  @Output() newAssignementOutput = new EventEmitter<Assignement>();

  assignementName: string = '';
  dateDelivery: Date;
  assignements: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newAssignement = new Assignement();
    newAssignement.nom = this.assignementName;
    newAssignement.dateDelivery = this.dateDelivery;
    newAssignement.rendered = true;

    // this.assignements.push(newAssignement);
    this.newAssignementOutput.emit(newAssignement);
  }
}
