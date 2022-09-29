import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignementsService } from 'src/app/shared/assignements.service';
import { Assignement } from '../assignement.model';

@Component({
  selector: 'app-assignement-detail',
  templateUrl: './assignement-detail.component.html',
  styleUrls: ['./assignement-detail.component.css']
})
export class AssignementDetailComponent implements OnInit {
  
  @Input()
  assignement: Assignement;

  @Output()
  assignementToDelete = new EventEmitter<Assignement>;

  constructor(
    private assignementsService: AssignementsService,
  ) { }

  ngOnInit(): void {
  }

  onAssignementRendered(): void {
    // this.assignement.dateDelivery = new Date();
    this.assignement.rendered = true;
    this.assignementsService.updateAssignement(this.assignement)
      .subscribe(message => console.log(message))
  }

  onDeleteButtonClick(): void {
    this.assignementToDelete.emit(this.assignement);
  }

}
