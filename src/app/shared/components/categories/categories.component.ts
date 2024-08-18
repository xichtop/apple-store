import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CATEGORIES } from '@shared/constants/categories';

@Component({
  standalone: true,
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  imports: [
    TranslocoPipe
  ]
})
export class CategoriesComponent {

  CATEGORIES = CATEGORIES
}
