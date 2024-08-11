import { C } from "@angular/cdk/keycodes";
import { Component } from "@angular/core";
import { AdvertiseComponent } from "@shared/advertise/advertise.component";
import { BannerComponent } from "@shared/banner/banner.component";

@Component({
  standalone: true,
  selector: "app-store",
  templateUrl: "./store.component.html",
  imports: [
    BannerComponent, AdvertiseComponent
  ]
})
export class StoreComponent {}