import { Component, OnInit } from '@angular/core';
import { AssignementsService } from '../shared/assignements.service';
import { Assignement } from './assignement.model';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignements.component.html',
  styleUrls: ['./assignements.component.css']
})
export class AssignementsComponent implements OnInit {

  activeAssignement: Assignement;

  assignements: Assignement[];

  addButtonActive = false;
  formVisible = false;

  constructor(
    private assignementsService: AssignementsService,
  ) { }

  ngOnInit(): void {
    // this.assignements = this.assignementsService.getAssignements();
    this.getAssignements();
  }

  getAssignements(){
    this.assignementsService.getAssignements()
      .subscribe(res => this.assignements = res);
  };

  selectAssignement(assignement: Assignement): void {
    this.activeAssignement = assignement;
    console.log(this.activeAssignement);
  }

  onAddAssignementButtonClick(): void {
    this.formVisible = true;
  }

  onNewAssignement(event: Assignement) {
    // this.assignements.push(event);
    this.assignementsService.addAssignement(event)
      .subscribe(message => console.log(message))
    this.formVisible = false;
  }

  deleteAssignement(event: Assignement) {
    // this.assignements = this.assignements.filter((e) => e != event);
    this.assignementsService.deleteAssignement(event)
      .subscribe(message => console.log(message));
  }

}
