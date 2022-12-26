import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssignementsService } from '../shared/assignements.service';
import { Assignement } from './assignement.model';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-assignements',
  templateUrl: './assignements.component.html',
  styleUrls: ['./assignements.component.scss']
})
export class AssignementsComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'auteur', 'matiere'];
  dataSource: MatTableDataSource<Assignement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  page: number = 1;
  limit: number = 10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  activeAssignement: Assignement;

  assignements: Assignement[];

  addButtonActive = false;

  constructor(
    private assignementsService: AssignementsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getDataByPage(this.page, this.limit);
    // this.getAssignements();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAssignements(){
    this.assignementsService.getAssignements()
      .subscribe(res => {
        this.assignements = res.docs;
      });
  };

  selectAssignement(assignement: Assignement): void {
    this.activeAssignement = assignement;
    console.log(this.activeAssignement);
  }

  // onNewAssignement(event: Assignement) {
  //   // this.assignements.push(event);
  //   this.assignementsService.addAssignement(event)
  //     .subscribe(message => console.log(message))
  // }

  deleteAssignement(event: Assignement) {
    // this.assignements = this.assignements.filter((e) => e != event);
    this.assignementsService.deleteAssignement(event)
      .subscribe(message => console.log(message));
  }

  getDataByPage(page: number, limit: number) {
    this.assignementsService.getAssignmentsPagine(page, limit)
      .subscribe(data => {
        this.assignements = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.dataSource = new MatTableDataSource(this.assignements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  updatePage(event: any) {
    this.getDataByPage(event.pageIndex + 1, event.pageSize);
  }

  peuplerDB() {
    console.log('already done');
    // this.assignementsService.peuplerDb()
    //   .subscribe(() => {
    //     console.log('LA BD A ETE PEUPLEE');
    //     this.router.navigate(["/home"], {replaceUrl: true});
    //   })
  }

}
