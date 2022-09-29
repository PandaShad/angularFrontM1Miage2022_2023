import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignementsService {
  
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

  constructor() { }

  getAssignements(): Observable<Assignement[]> {
    return of(this.assignements);
  }

  addAssignement(assignement: Assignement): Observable<string> {
    this.assignements.push(assignement);
    console.table(this.assignements);
    return of(`Assignement added : ${assignement.nom}`);
  }

  deleteAssignement(assignement: Assignement): Observable<string> {
    this.assignements = this.assignements.filter((e) => e != assignement);
    return of(`Assignement deleted : ${assignement.nom}`);
  }

  updateAssignement(assignement: Assignement): Observable<string> {
    console.table(this.assignements);
    return of(`Assignement updated : ${assignement.nom}`);
  }
}
