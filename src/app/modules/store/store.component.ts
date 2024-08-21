import { C } from "@angular/cdk/keycodes";
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";
import { AdvertiseComponent } from "@shared/components/advertise/advertise.component";
import { BannerComponent } from "@shared/components/banner/banner.component";
import { CategoriesComponent } from "../../shared/components/categories/categories.component";
import { PromotionComponent } from "@shared/components/promotion/promotion.component";
import { SvgIcon } from "@libs/svg-icon";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"],
  imports: [
    BannerComponent, AdvertiseComponent,
    CategoriesComponent, PromotionComponent,
    SvgIcon, CommonModule
  ],
  host: { class: "w-full" },
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class StoreComponent {

  translateX = signal(0);
  translateXByPx = computed(() => '[' + this.translateX() + 'rem]');

  scrollLeft() {
    this.translateX.update(x => x - 4);
  }

  scrollRight() {
    this.translateX.update(x => x + 4);
  }
}