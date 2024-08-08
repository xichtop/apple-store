import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { ToastService } from '@libs/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet, HeaderComponent
  ],
})
export class AppComponent implements OnInit {
  title = 'apple-store';

  constructor(
    private _notification: ToastService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._notification.info('Welcome to Apple Store');
    }, 3000);
  }
}
