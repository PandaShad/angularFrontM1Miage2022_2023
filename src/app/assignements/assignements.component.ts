import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignements.component.html',
  styleUrls: ['./assignements.component.css']
})
export class AssignementsComponent implements OnInit {

  assignements = [
    {
      nom: "Devoir Angular",
      dateRendu:'2022-10-10',
      rendu: false
    },
    {
      nom: "Devoir Java",
      dateRendu:'2022-10-10',
      rendu: true
    },
    {
      nom: "Devoir R",
      dateRendu:'2022-10-10',
      rendu: false
    },
    {
      nom: "Devoir Ocaml",
      dateRendu:'2022-10-10',
      rendu: true
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
