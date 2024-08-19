import { C } from "@angular/cdk/keycodes";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AdvertiseComponent } from "@shared/components/advertise/advertise.component";
import { BannerComponent } from "@shared/components/banner/banner.component";
import { CategoriesComponent } from "../../shared/components/categories/categories.component";
import { PromotionComponent } from "@shared/components/promotion/promotion.component";

@Component({
  standalone: true,
  selector: "app-store",
  templateUrl: "./store.component.html",
  imports: [
    BannerComponent, AdvertiseComponent,
    CategoriesComponent, PromotionComponent
  ],
  host: { class: "w-full" },
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class StoreComponent {}