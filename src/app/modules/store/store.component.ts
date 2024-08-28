/** Angular */
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

/** Utils & Constants */
import { TranslocoPipe } from '@jsverse/transloco';
import { PROMOTIONS, STUDENT_PROMOTIONS } from '@shared/constants/promotions';

/** Models */
import { PromotionModel } from '@shared/models/promotion.model';

/** Components */
import { AdvertiseComponent } from '@shared/components/advertise/advertise.component';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { BigPromotionComponent } from '@shared/components/big-promotion/big-promotion.component';
import { CategoriesComponent } from '../../shared/components/categories/categories.component';
import { CustomSwiperComponent } from '@shared/components/custom-swiper/custom-swiper.component';
import { PromotionComponent } from '@shared/components/promotion/promotion.component';
import { SmallProductComponent } from '@shared/components/small-product/small-product.component';
import { SvgIcon } from '@libs/svg-icon';

@Component({
  standalone: true,
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  imports: [
    AdvertiseComponent,
    BannerComponent,
    BigPromotionComponent,
    CategoriesComponent,
    CommonModule,
    CustomSwiperComponent,
    PromotionComponent,
    SmallProductComponent,
    SvgIcon,
    TranslocoPipe,
  ],
})
export class StoreComponent {

  promotions: PromotionModel[] = PROMOTIONS;
  studentPromotions: PromotionModel[] = STUDENT_PROMOTIONS;

  scrollX = signal(0);

  scrollLeft() {
    if (this.scrollX() !== 0) {
      this.scrollX.set(this.scrollX() - 200);

      document.getElementById('swiperContainer')?.scrollTo({
        top: 0,
        left: this.scrollX(),
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    const element = document.getElementById('swiperContainer');
    if (element && element.scrollWidth - element.scrollLeft > element.clientWidth) {
      this.scrollX.set(this.scrollX() + 200);

      element.scrollTo({
        top: 0,
        left: this.scrollX(),
        behavior: 'smooth'
      });
    }
  }
}