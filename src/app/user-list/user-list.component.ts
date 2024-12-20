import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export default class UserListComponent implements OnInit, OnChanges {
  ngOnChanges(): void {
    this.addList();
  }
  ngOnInit(): void {
    this.userService$.getUsers().subscribe((x) => {
      this.users = x;
    });
  }
  userData = input();
  userService$ = inject(UserService);
  users: any = [];
  shareService$ = inject(ShareService);

  onUserClick(id: number) {
    this.shareService$.setId(id);
  }
  addList() {
    this.users.push(this.userData());
  }
  onDeleteUser(id: number) {
    this.userService$
      .deleteUser(id)
      .subscribe(
        () => (this.users = this.users.filter((user: any) => user.id !== id))
      );
  }
}
