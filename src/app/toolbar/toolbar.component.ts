import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SideNavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    // if(!this.authService.loggedIn) {
    //   this.authService.logIn();
    // } else {
    //   this.authService.logOut();
    //   this.router.navigate(['/home']);
    // }
    // console.log(this.authService.loggedIn)
  }

}
