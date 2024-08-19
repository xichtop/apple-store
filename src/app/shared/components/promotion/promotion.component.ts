import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
})

export class PromotionComponent {
  promotion = input('');
  title = input('');
  description = input('');
  imgURL = input('');
}
