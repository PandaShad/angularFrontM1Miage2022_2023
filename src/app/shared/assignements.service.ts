import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';
import { catchError, first, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFilterParam } from './types';

@Injectable({
  providedIn: 'root'
})
export class AssignementsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  
  assignements: Assignement[] = []

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

  getAssignmentsPagine(page: number, limit: number, sortBy: string, sortOrder: number, returned: IFilterParam): Observable<any> {
    const queryParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      returned: returned
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
    return this.http.get<Assignement>(`${this.uri}/${id}`)
      .pipe(catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id)),
      tap(_ => console.log(`tap : assignement id = ${id} requête GET envoyée sur mongoDB cloud`)));
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    }
 };

//  peuplerDb() {
//   const appelsVersAddAssigment: any = [];
//   data.forEach(e => {
//     appelsVersAddAssigment.push(this.addAssignement(e));
//   });
//   return forkJoin(appelsVersAddAssigment);
//  }
 
}
