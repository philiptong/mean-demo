import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  users = '';

  constructor(private httpclient: HttpClient) {}

  getUsers(): void {
    this.httpclient.get<string>('/api/users').subscribe(
      result => {
        this.users = JSON.stringify(result);
      },
      error => {
        alert(error);
      }
    );
  }
}
