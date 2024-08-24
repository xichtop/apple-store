import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { SvgIcon } from '@libs/svg-icon';

@Component({
  standalone: true,
  selector: 'app-custom-swiper',
  templateUrl: './custom-swiper.component.html',
  imports: [ CommonModule, SvgIcon ]
})
export class CustomSwiperComponent {

  swiperID = input('id');

  scrollX = signal(0);

  scrollLeft() {
    if (this.scrollX() !== 0) {
      this.scrollX.set(this.scrollX() - 400);

      document.getElementById(this.swiperID())?.scrollTo({
        top: 0,
        left: this.scrollX(),
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    const element = document.getElementById(this.swiperID());
    if (element && element.scrollWidth - element.scrollLeft > element.clientWidth) {
      this.scrollX.set(this.scrollX() + 400);

      element.scrollTo({
        top: 0,
        left: this.scrollX(),
        behavior: 'smooth'
      });
    }
  }
}