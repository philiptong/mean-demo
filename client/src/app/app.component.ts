import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN Demo';
  description = 'mongodb 4.06 + express 4.16 + angular 8.0.3 + nodejs 10.15.1';
  users = '';

  constructor(private httpclient: HttpClient) {}

  getUsers(): void {
    this.httpclient.get<string>('/api/users').subscribe(
      result => {
        this.users = JSON.stringify(result);
      },
      error => {
        alert('error : ' + error.message);
      }
    );
  }
}
