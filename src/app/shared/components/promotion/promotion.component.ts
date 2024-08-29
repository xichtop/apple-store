import { Component, input } from '@angular/core';
import { SvgIcon } from "../../../../../projects/svg-icon/src/lib/icon";
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  imports: [
    SvgIcon, TranslocoDirective
  ],
})

export class PromotionComponent {
  promotion = input('');
  title = input('');
  description = input('');
  imgURL = input('');
  isEdu = input(false);
}
