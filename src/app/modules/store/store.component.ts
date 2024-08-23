import { C } from "@angular/cdk/keycodes";
import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from "@angular/core";
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
export class StoreComponent implements OnInit, AfterViewInit {

  translateX = signal(0);
  translateXByPx = computed(() => '[' + this.translateX() + 'rem]');

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    document.getElementById('swiperContainer')?.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollLeft() {
    document.getElementById('swiperContainer')?.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    document.getElementById('swiperContainer')?.scrollTo({
      top: 0,
      left: 1000,
      behavior: 'smooth'
    });
  }
}