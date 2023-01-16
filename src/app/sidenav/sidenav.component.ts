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
      nom: "Home",
      link: '/',
    },
    {
      nom: "Login",
      link: '/login',
    },
    {
      nom: "Sign Up",
      link: '/signup',
    },
    {
      nom: "Liste des devoirs",
      link: '/assignements',
    },
    {
      nom: "Ajout d'un devoir",
      link: '/add',
    },
  ]

  constructor(
    private router: Router,
  ) {}


  ngOnInit(): void {
  }

  naviguateTo(link: string): void {
    this.router.navigateByUrl(link);
  }

  toggle(): void {
    console.log('KOUKOU');
    this.sidenav.toggle();
  }
  
}
