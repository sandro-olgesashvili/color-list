import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userGroup!: FormGroup;
  userOutput = output();
  userService = inject(UserService);
  constructor(private fb: FormBuilder) {
    this.userGroup = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userGroup.get('name')?.valueChanges.subscribe((value) => {
      this.userGroup.get('name')?.setValue(value.trim(), { emitEvent: false });
    });

    this.userGroup.get('username')?.valueChanges.subscribe((value) => {
      this.userGroup
        .get('username')
        ?.setValue(value?.trim(), { emitEvent: false });
    });

    this.userGroup.get('email')?.valueChanges.subscribe((value) => {
      this.userGroup.get('email')?.setValue(value.trim(), { emitEvent: false });
    });

    this.userGroup.get('phone')?.valueChanges.subscribe((value) => {
      this.userGroup.get('phone')?.setValue(value.trim(), { emitEvent: false });
    });
  }

  onSubmit() {
    const formData = this.userGroup.value;

    if (this.userGroup.invalid) {
      alert('შეავსეთ ყველა ველი');
    } else {
      this.userService.addUser(formData).subscribe((res: any) => {
        this.userOutput.emit(res);
        this.userGroup.reset();
      });
    }
  }
}
