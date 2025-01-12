import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin: boolean = false;
  constructor(private share: ShareService, private router: Router) {}
  ngOnInit(): void {
    this.share.getLogin().subscribe((value) => {
      this.isLogin = value;
      localStorage.getItem('user') === 'admin'
        ? (this.isAdmin = true)
        : (this.isAdmin = false);
    });
    if (localStorage.getItem('user')) {
      this.isLogin = true;
    }
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.isLogin = false;
    this.isAdmin = false;
  }
}
