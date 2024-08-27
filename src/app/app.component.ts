/** Angular */
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Utils */
import { register } from 'swiper/element/bundle';

/** Components */
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    register();
  }
}

