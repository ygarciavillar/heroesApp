import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.authService.auth
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
    this.router.navigate(["./auth"])
  }
}
