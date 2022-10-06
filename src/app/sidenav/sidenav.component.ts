import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavLinks } from './navLinks.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  navLinks: NavLinks[] = [
    {
      nom: "Liste des devoirs",
      link: '/',
    },
    {
      nom: "Ajout d'un devoir",
      link: '/',
    },
    {
      nom: "Modification d'un devoir",
      link: '/',
    },
    {
      nom: "Suppression d'un devoir",
      link: '/',
    },
    {
      nom: "Génération de données de test",
      link: '/',
    },
  ]

  constructor(
    private router: Router,
  ) {}


  ngOnInit(): void {
  }

  naviguateTo(link: string): void {
    this.router.navigateByUrl(link);
    console.log('Will naviguate to', link);
  }
  
}
