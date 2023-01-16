import { Component, OnInit } from '@angular/core';
import { AssignementsService } from 'src/app/shared/assignements.service';
import { Assignement } from '../assignement.model';
import { Subject } from "../../shared/subject.model";
import { SubjectService } from 'src/app/shared/subject.service';
import { first } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.scss']
})
export class AddAssignementComponent implements OnInit {

  // @Output() newAssignementOutput = new EventEmitter<Assignement>();

  assignementName: string = '';
  auteur: string = '';
  dateDelivery: Date;
  assignements: any;
  subjectList: Subject[] = []
  note!: number;
  notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  remarque: string = '';
  subjectInfoLoaded: boolean = false;
  subject: Subject;

  constructor(
    private assignementsService: AssignementsService,
    private subjectService: SubjectService
  ) { }

  firstFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required])
  });
  secondFormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.subjectService.getSubjects()
      .pipe(first())
      .subscribe(res => this.subjectList = res);
  }

  onStepChange(event: any){
    const selectedIndex = event.selectedIndex;
    if(selectedIndex === 2) {
      this.getSubjectDetails(this.firstFormGroup.value.subject);
    }
  }

  getSubjectDetails(subject: any): void {
    this.subjectService.getSubjectByName(subject)
      .pipe(first())
      .subscribe(res => {
        console.log(res);
        this.subject = res;
        this.subjectInfoLoaded = true;
      }) 
  }

  test() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

  addAssignement() {
    const newAssignement = new Assignement();
    newAssignement.nom = this.firstFormGroup.value.name as string;
    newAssignement.dateDeRendu = new Date(this.secondFormGroup.value.date as string);
    newAssignement.rendu = false;
    newAssignement.auteur = this.auteur;
    newAssignement.matiere = this.subject.name;
    newAssignement.note = this.note;
    newAssignement.remarque = this.remarque;
    newAssignement.id = Math.floor(Math.random()*1000000000);

    this.assignementsService.addAssignement(newAssignement)
      .subscribe(response => console.log(response.message));
  }
}
