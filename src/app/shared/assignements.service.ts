import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { data } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignementsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  
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
  // uri = "https://api-cours-angular-2022.herokuapp.com/api/assignments";

  getAssignements(): Observable<any> {
    return this.http.get<any>(this.uri);
    // return of(this.assignements);
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    const queryParams = {
      page: page,
      limit: limit
    }
    return this.http.get<any>(this.uri,{params: queryParams});
  }

  addAssignement(assignement: Assignement): Observable<any> {
    // this.assignements.push(assignement);
    this.loggingService.log(assignement, 'ajouté');
    // return of(`Assignement added : ${assignement.nom}`);
    return this.http.post<Assignement>(this.uri, assignement, this.httpOptions);
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
      .pipe(map(a => {
        a.nom += ' transformé avec un pipe....';
        return a;
      }),
      tap(_ => {
        console.log(`tap: assignement id = ${id} requête GET envoyée sur mongoDB cloud`);
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id)));
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    }
 };

 peuplerDb() {
  const appelsVersAddAssigment: any = [];
  data.forEach(e => {
    appelsVersAddAssigment.push(this.addAssignement(e));
  });
  return forkJoin(appelsVersAddAssigment);
 }
 
}
