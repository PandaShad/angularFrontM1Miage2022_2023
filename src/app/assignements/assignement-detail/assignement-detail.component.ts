import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignementsService } from 'src/app/shared/assignements.service';
import { Assignement } from '../assignement.model';
import { ActivatedRoute, Router } from '@angular/router'
import { NgSelectOption } from '@angular/forms';

@Component({
  selector: 'app-assignement-detail',
  templateUrl: './assignement-detail.component.html',
  styleUrls: ['./assignement-detail.component.css']
})
export class AssignementDetailComponent implements OnInit {
  
  // @Input()
  assignement: Assignement;

  @Output()
  assignementToDelete = new EventEmitter<Assignement>;

  constructor(
    private assignementsService: AssignementsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAssignement()
  }

  getAssignement() {
    const id = this.route.snapshot.params['id'];
    this.assignementsService.getAssignementById(parseInt(id))
      .subscribe(assignement => {
        this.assignement = assignement;
        console.log('ID', id);
        console.log('KOUKOU : ', this.assignement)
      })

  }

  onAssignementRendered(): void {
    // this.assignement.dateDelivery = new Date();
    this.assignement.rendered = true;
    this.assignementsService.updateAssignement(this.assignement)
      .subscribe(message => console.log(message));
    this.router.navigate(['/home']);
  }

  onDeleteButtonClick(): void {
    this.assignementsService.deleteAssignement(this.assignement)
      .subscribe(message => console.log(message));
    this.router.navigate(['/home']);
  }

}
