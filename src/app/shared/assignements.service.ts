import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignementsService {
  
  assignements: Assignement[] = [
    // {
    //   id: 1,
    //   nom: "Devoir Angular",
    //   dateDelivery: new Date('2022-10-10'),
    //   rendered: false
    // },
    // {
    //   id: 2,
    //   nom: "Devoir Java",
    //   dateDelivery: new Date('2022-10-10'),
    //   rendered: true
    // },
    // {
    //   id: 3,
    //   nom: "Devoir R",
    //   dateDelivery: new Date('2022-10-10'),
    //   rendered: false
    // },
    // {
    //   id: 4,
    //   nom: "Devoir Ocaml",
    //   dateDelivery: new Date('2022-10-10'),
    //   rendered: true
    // },
  ]

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient,
  ) { }

  uri = "http://localhost:8010/api/assignments";

  getAssignements(): Observable<Assignement[]> {
    return this.http.get<Assignement[]>(this.uri)
    // return of(this.assignements);
  }

  addAssignement(assignement: Assignement): Observable<any> {
    // this.assignements.push(assignement);
    this.loggingService.log(assignement, 'ajouté');
    // return of(`Assignement added : ${assignement.nom}`);
    return this.http.post<Assignement>(this.uri, assignement);
  }

  deleteAssignement(assignement: Assignement): Observable<any> {
    const pos = this.assignements.indexOf(assignement);
    this.assignements.splice(pos, 1);
    this.loggingService.log(assignement, 'supprimé');
    // return of(`Assignement deleted : ${assignement.nom}`);
    const deleteUri = `${this.uri}/${assignement._id}`;
    return this.http.delete<Assignement>(deleteUri)
  }

  updateAssignement(assignement: Assignement): Observable<any> {
    console.table(this.assignements);
    this.loggingService.log(assignement, 'modifié');
    // return of(`Assignement updated : ${assignement.nom}`);
    return this.http.put<Assignement>(this.uri, assignement);
  }

  getAssignementById(id: number): Observable<Assignement> {
    // return of(this.assignements.find(assignement => assignement.id === id) as Assignement);
    return  this.http.get<Assignement>(this.uri + '/' + id)
  }
}
