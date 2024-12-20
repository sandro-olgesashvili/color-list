import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ShareService } from '../service/share.service';
import { distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userService$ = inject(UserService);
  shareServiec$ = inject(ShareService);
  user: any;
  ngOnInit(): void {
    this.shareServiec$
      .getId()
      .pipe(
        distinctUntilChanged(),
        switchMap((id: number) => this.userService$.getUser(id))
      )
      .subscribe((resUser) => (this.user = resUser));
  }
}
