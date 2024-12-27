import { Component, input, OnChanges, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../service/user-service.service';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-user-from',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-from.component.html',
  styleUrl: './user-from.component.css',
})
export class UserFromComponent implements OnChanges {
  userForm!: FormGroup;
  user = input<User | null>(null);
  outUser = output<User>();
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private share: ShareService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      website: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  ngOnChanges(): void {
    this.userForm.get('name')?.setValue(this.user()?.name);
    this.userForm.get('username')?.setValue(this.user()?.username);
    this.userForm.get('website')?.setValue(this.user()?.website);
    this.userForm.get('email')?.setValue(this.user()?.email);
  }

  onUpdate() {
    let objUser: User = { ...this.user(), ...this.userForm.value };
    this.userService.updateUser(objUser).subscribe((user: User) => {
      this.outUser.emit(user);
      this.userForm.reset();
      this.share.setLaoder(false);
    });
  }
}
