import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import UserListComponent from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    UserListComponent,
    UserFormComponent,
    UserDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userData: any;
  getUserData(event: any) {
    this.userData = '';
    this.userData = event;
    console.log(this.userData);
  }
}
