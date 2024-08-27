import { Component, input } from '@angular/core';
import { SvgIcon } from "../../../../../projects/svg-icon/src/lib/icon";

@Component({
  standalone: true,
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  imports: [SvgIcon],
})

export class PromotionComponent {
  promotion = input('');
  title = input('');
  description = input('');
  imgURL = input('');
  isEdu = input(false);
}
