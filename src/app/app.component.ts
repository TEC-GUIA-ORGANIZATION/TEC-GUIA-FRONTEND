import { Component } from '@angular/core';
import { HttpExampleService } from './Controller/http-example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TEC-GUIA-FRONTEND';
  data: any;

  constructor(private dataService: HttpExampleService) {}

  ngOnInit() {
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }
}