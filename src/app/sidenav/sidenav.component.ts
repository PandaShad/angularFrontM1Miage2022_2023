import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavLinks } from './navLinks.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  
  @ViewChild('sidenav') public sidenav: MatSidenav;

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

  toggle(): void {
    console.log('KOUKOU');
    this.sidenav.toggle();
  }
  
}
