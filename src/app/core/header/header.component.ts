import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIcon } from '@libs/svg-icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    TranslocoPipe, SvgIcon
  ],
})
export class HeaderComponent {

}
