import { C } from "@angular/cdk/keycodes";
import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from "@angular/core";
import { AdvertiseComponent } from "@shared/components/advertise/advertise.component";
import { BannerComponent } from "@shared/components/banner/banner.component";
import { CategoriesComponent } from "../../shared/components/categories/categories.component";
import { PromotionComponent } from "@shared/components/promotion/promotion.component";
import { SvgIcon } from "@libs/svg-icon";
import { CommonModule } from "@angular/common";
import { CustomSwiperComponent } from "@shared/components/custom-swiper/custom-swiper.component";
import { SmallProductComponent } from "@shared/components/small-product/small-product.component";

@Component({
  standalone: true,
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"],
  imports: [
    BannerComponent, AdvertiseComponent,
    CategoriesComponent, PromotionComponent,
    SvgIcon, CommonModule, CustomSwiperComponent,
    SmallProductComponent
  ],
  host: { class: "w-full" },
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class StoreComponent {

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