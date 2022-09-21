import { Component, OnInit } from '@angular/core';
import { Assignement } from './assignement.model';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignements.component.html',
  styleUrls: ['./assignements.component.css']
})
export class AssignementsComponent implements OnInit {

  assignements: Assignement[] = [
    {
      nom: "Devoir Angular",
      dateDelivery: new Date('2022-10-10'),
      rendered: false
    },
    {
      nom: "Devoir Java",
      dateDelivery: new Date('2022-10-10'),
      rendered: true
    },
    {
      nom: "Devoir R",
      dateDelivery: new Date('2022-10-10'),
      rendered: false
    },
    {
      nom: "Devoir Ocaml",
      dateDelivery: new Date('2022-10-10'),
      rendered: true
    },
  ]

  addButtonActive = false;
  assignementName = "";
  dateDelivery: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.addButtonActive = true;
    }, 2000);
  }

  onSubmit() {
    const newAssignement = new Assignement();
    newAssignement.nom = this.assignementName;
    newAssignement.dateDelivery = this.dateDelivery;
    newAssignement.rendered = false;

    this.assignements.push(newAssignement);
  }

}
