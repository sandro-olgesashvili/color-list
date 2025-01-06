import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ShareService } from './service/share.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loading!: Boolean;
  constructor(private loadingService: ShareService) {}

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe((load) => {
      this.loading = load;
    });
  }
}
