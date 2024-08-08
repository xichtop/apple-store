import { NgModule } from '@angular/core'
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ToastContainer } from './toast.container';


@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    ToastContainer,
    ToastComponent,
  ],
  exports: [
    ToastContainer,
    ToastComponent,
  ],
  providers: [ToastService],
})
export class ToastModule { }
