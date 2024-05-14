import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {  RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent,RouterLink]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
