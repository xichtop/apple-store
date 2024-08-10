import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SvgIcon } from '@libs/svg-icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    TranslocoPipe, SvgIcon, FormsModule, ReactiveFormsModule
  ],
})
export class HeaderComponent implements OnInit {

  langControl = new FormControl(true);
  constructor(
    private _translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    console.log(this._translocoService.getActiveLang());
    this.langControl.setValue(this._translocoService.getActiveLang() === 'vn', { emitEvent: false });

    this.langControl.valueChanges.subscribe((lang) => {
      if (lang) {
        this._translocoService.setActiveLang('vn');
        return;
      }

      this._translocoService.setActiveLang('en');
    });

  }

  changeLanguage(lang: string) {
    this._translocoService.setActiveLang(lang);
  }

}
