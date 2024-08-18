import { C } from "@angular/cdk/keycodes";
import { Component } from "@angular/core";
import { AdvertiseComponent } from "@shared/components/advertise/advertise.component";
import { BannerComponent } from "@shared/components/banner/banner.component";
import { CategoriesComponent } from "../../shared/components/categories/categories.component";

@Component({
  standalone: true,
  selector: "app-store",
  templateUrl: "./store.component.html",
  imports: [
    BannerComponent, AdvertiseComponent,
    CategoriesComponent
  ],
  host: { class: "w-full" }
})
export class StoreComponent {}