import { C } from "@angular/cdk/keycodes";
import { Component } from "@angular/core";
import { BannerComponent } from "@shared/banner/banner.component";

@Component({
  standalone: true,
  selector: "app-store",
  templateUrl: "./store.component.html",
  imports: [
    BannerComponent
  ]
})
export class StoreComponent {}