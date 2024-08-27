/** Angular */
import { Component } from '@angular/core';

/** Components */
import { BannerComponent } from '@shared/components/banner/banner.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    BannerComponent
  ],
  host: { class: "w-full" },
})
export class HomeComponent {
}