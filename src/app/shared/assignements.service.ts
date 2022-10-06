import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignementsService {
  
  assignements: Assignement[] = [
    {
      id: 1,
      nom: "Devoir Angular",
      dateDelivery: new Date('2022-10-10'),
      rendered: false
    },
    {
      id: 2,
      nom: "Devoir Java",
      dateDelivery: new Date('2022-10-10'),
      rendered: true
    },
    {
      id: 3,
      nom: "Devoir R",
      dateDelivery: new Date('2022-10-10'),
      rendered: false
    },
    {
      id: 4,
      nom: "Devoir Ocaml",
      dateDelivery: new Date('2022-10-10'),
      rendered: true
    },
  ]

  constructor(
    private loggingService: LoggingService,
  ) { }

  getAssignements(): Observable<Assignement[]> {
    return of(this.assignements);
  }

  addAssignement(assignement: Assignement): Observable<string> {
    this.assignements.push(assignement);
    this.loggingService.log(assignement, 'ajouté');
    return of(`Assignement added : ${assignement.nom}`);
  }

  deleteAssignement(assignement: Assignement): Observable<string> {
    const pos = this.assignements.indexOf(assignement);
    this.assignements.splice(pos, 1);
    this.loggingService.log(assignement, 'supprimé');
    return of(`Assignement deleted : ${assignement.nom}`);
  }

  updateAssignement(assignement: Assignement): Observable<string> {
    console.table(this.assignements);
    this.loggingService.log(assignement, 'modifié');
    return of(`Assignement updated : ${assignement.nom}`);
  }

  getAssignementById(id: number): Observable<Assignement> {
    return of(this.assignements.find(assignement => assignement.id === id) as Assignement);
  }
}
