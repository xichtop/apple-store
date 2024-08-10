import { Component } from "@angular/core";
import { TranslocoPipe } from "@jsverse/transloco";
import { SvgIcon } from "@libs/svg-icon";

@Component({
  standalone: true,
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  imports: [
    SvgIcon, TranslocoPipe
  ]
})
export class BannerComponent {
}