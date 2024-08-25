import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SvgIcon } from '@libs/svg-icon';

@Component({
  standalone: true,
  selector: 'app-small-product',
  templateUrl: './small-product.component.html',
  imports: [
    SvgIcon, CommonModule
  ]
})
export class SmallProductComponent {
  promotion = input('');
  title = input('');
  description = input('');
  colors = input<string[]>([]);
  imgURL = input('');
  isEdu = input(false);
}