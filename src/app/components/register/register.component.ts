import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Auth } from '../../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  regiser!: FormGroup;
  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.regiser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.regiser.get('username')?.valueChanges.subscribe((value) => {
      this.regiser
        .get('username')
        ?.setValue(value.trim(), { emitEvent: false });
    });

    this.regiser.get('password')?.valueChanges.subscribe((value) => {
      this.regiser
        .get('password')
        ?.setValue(value.trim(), { emitEvent: false });
    });
  }

  onRegister() {
    this.auth
      .login({ ...this.regiser.value, password: '' })
      .pipe(
        switchMap((x) => {
          if (x.length) {
            this.regiser.reset();
            alert('User exists');
            return new Observable<Auth[]>();
          } else {
            return this.auth.createUser(this.regiser.value);
          }
        })
      )
      .subscribe(() => {
        this.router.navigate(['login']);
        alert('User Created');
      });
  }
}
