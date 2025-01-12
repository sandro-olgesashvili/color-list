import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../service/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login!: FormGroup;
  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private share: ShareService,
    private router: Router
  ) {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.auth.login(this.login.value).subscribe((data) => {
      if (data.length) {
        localStorage.setItem('user', data[0].username);
        this.share.setLogin(true);
        this.router.navigate(['']);
      } else {
        alert('Wrong user');
      }
      this.login.reset();
    });
  }
}
