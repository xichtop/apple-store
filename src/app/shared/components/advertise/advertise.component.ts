import { Component } from "@angular/core";
import { TranslocoPipe } from "@jsverse/transloco";
import { SvgIcon } from "@libs/svg-icon";

@Component({
  standalone: true,
  selector: "app-advertise",
  templateUrl: "./advertise.component.html",
  imports: [
    SvgIcon, TranslocoPipe
  ]
})
export class AdvertiseComponent { }