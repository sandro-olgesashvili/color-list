import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { ShareService } from './service/share.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  laoderBool: boolean = false;
  constructor(private share: ShareService) {}
  ngOnInit(): void {
    this.share.getLoader().subscribe((load) => (this.laoderBool = load));
  }
}
