import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-big-promotion',
  templateUrl: './big-promotion.component.html',
})

export class BigPromotionComponent {
  promotion = input('');
  title = input('');
  imgURL = input('');
}
