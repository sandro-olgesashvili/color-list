import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
import { User } from '../../models/user';
import { UserFromComponent } from '../user-from/user-from.component';
import { ShareService } from '../../service/share.service';
// import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  imports: [UserFromComponent, UserFromComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  selectedUser!: User | null;
  constructor(
    private userService: UserServiceService,
    private share: ShareService
  ) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.share.setLaoder(false);
    });
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((x) => {
      this.userList = this.userList.filter((user) => user.id !== id);
      this.share.setLaoder(false);
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  getUser(user: User) {
    let users = this.userList.map((elemnet) => {
      if (elemnet.id === user.id) {
        return (elemnet = user);
      } else {
        return elemnet;
      }
    });
    this.selectedUser = null;
    this.userList = users;
  }
}
