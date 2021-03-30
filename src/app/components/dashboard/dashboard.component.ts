import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router
  ) { }

  ngOnInit(): void {
  }

  goToUser() {
    this.router.navigate(['user']);
  }

  goToMovie() {
    this.router.navigate(['movie']);
  }

  goToAssignment() {
    this.router.navigate(['assignment']);
  }
}
