import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SvgIcon } from '@libs/svg-icon';
import { CATEGORIES } from '@shared/constants/categories';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    TranslocoPipe, SvgIcon, FormsModule, ReactiveFormsModule
  ],
  host: { class: 'flex justify-center w-full' }
})
export class HeaderComponent implements OnInit {

  CATEGORIES = CATEGORIES;

  langControl = new FormControl(true);
  themeControl = new FormControl(true);

  constructor(
    private _translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.langControl.setValue(this._translocoService.getActiveLang() === 'vn', { emitEvent: false });

    this.langControl.valueChanges.subscribe((lang) => {
      this._translocoService.setActiveLang(lang ? 'vn' : 'en');
    });


    this.themeControl.valueChanges.subscribe((theme) => {
      document.firstElementChild?.setAttribute('data-theme', theme ? 'light' : 'dark');
    });

  }

  changeLanguage(lang: string) {
    this._translocoService.setActiveLang(lang);
  }

}
