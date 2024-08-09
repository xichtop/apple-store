import { Component, OnInit } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIcon } from '@libs/svg-icon';
import { ToastService } from '@libs/toast';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    TranslocoPipe, SvgIcon
  ],
})
export class HeaderComponent implements OnInit {

  constructor(
    private _notification: ToastService
  ) { }

  ngOnInit(): void {
  }

}
