import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { register } from 'swiper/element/bundle';
import { FooterComponent } from './core/footer/footer.component';
register();

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule, HeaderComponent, FooterComponent
  ],
})
export class AppComponent implements OnInit {
  title = 'apple-store';

  constructor(
  ) {

  }

  ngOnInit() {

  }
}
